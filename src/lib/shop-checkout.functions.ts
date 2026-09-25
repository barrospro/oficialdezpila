import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createNitroPixTransaction, getNitroTransactionStatus } from "@/server/nitro.server";
import { supabase } from "@/lib/supabase";

const shopOrderItemSchema = z.object({
  productId: z.string().min(1),
  nome: z.string(),
  precoUnitario: z.number().min(0.01),
  quantidade: z.number().min(1),
});

const createShopOrderSchema = z.object({
  clienteNome: z.string().trim().min(3, "Nome completo é obrigatório"),
  clienteEmail: z.string().trim().email("E-mail inválido"),
  clienteWhatsapp: z.string().trim().min(10, "WhatsApp é obrigatório"),
  enderecoRua: z.string().trim().min(2, "Rua/Avenida é obrigatória"),
  enderecoNumero: z.string().trim().min(1, "Número é obrigatório"),
  enderecoBairro: z.string().trim().min(2, "Bairro é obrigatório"),
  enderecoCidade: z.string().trim().min(2, "Cidade é obrigatória"),
  enderecoUf: z.string().trim().min(2, "Estado (UF) é obrigatório"),
  enderecoCep: z.string().trim().min(8, "CEP é obrigatório"),
  subtotal: z.number().min(0.01),
  frete: z.number().min(0),
  total: z.number().min(0.01),
  items: z.array(shopOrderItemSchema).min(1, "Seu carrinho está vazio"),
});

export type ShopOrderInput = z.infer<typeof createShopOrderSchema>;

export interface CreateShopOrderResult {
  ok: boolean;
  orderId?: string;
  pixId?: string;
  qrCode?: string;
  qrCodeBase64?: string | null;
  expirationDate?: string;
  total?: number;
  error?: string;
}

// Armazenamento em memória para fallback caso Supabase não esteja conectado
const memoryOrders = new Map<string, Record<string, unknown>>();

/**
 * Server Function para criar um Pedido na Loja Dez Pila e gerar o Pix via Nitro Pagamentos
 */
export const createShopOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createShopOrderSchema.parse(data))
  .handler(async ({ data }): Promise<CreateShopOrderResult> => {
    try {
      const orderId = `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const cleanPhone = data.clienteWhatsapp.replace(/\D/g, "");

      // 1. Gera a cobrança Pix no Nitro Pagamentos (API existente no site)
      const pixResult = await createNitroPixTransaction({
        amountNum: data.total,
        planName: `Loja DezPila - Pedido #${orderId.slice(-6).toUpperCase()}`,
        planId: "LOJA_ECOMMERCE",
        customer: {
          name: data.clienteNome,
          email: data.clienteEmail,
          phone: cleanPhone,
          document: "00000000000",
        },
        sourceUrl: "https://oficialdezpila.lovable.app/shop/checkout",
      });

      const orderData = {
        id: orderId,
        cliente_nome: data.clienteNome,
        cliente_email: data.clienteEmail,
        cliente_whatsapp: data.clienteWhatsapp,
        endereco_rua: data.enderecoRua,
        endereco_numero: data.enderecoNumero,
        endereco_bairro: data.enderecoBairro,
        endereco_cidade: data.enderecoCidade,
        endereco_uf: data.enderecoUf,
        endereco_cep: data.enderecoCep,
        subtotal: data.subtotal,
        frete: data.frete,
        total: data.total,
        status: "pendente",
        pix_id: pixResult.id,
        pix_qr_code: pixResult.qrCode,
        pix_expiration: pixResult.expirationDate,
        criado_em: new Date().toISOString(),
      };

      // 2. Salva o pedido no Supabase se disponível, senão grava em fallback
      if (supabase) {
        try {
          await supabase.from("orders").insert(orderData);

          const orderItemsData = data.items.map((it) => ({
            order_id: orderId,
            product_id: it.productId,
            quantidade: it.quantidade,
            preco_unitario: it.precoUnitario,
          }));

          await supabase.from("order_items").insert(orderItemsData);
        } catch (e) {
          console.warn("[ShopOrder] Erro ao gravar no Supabase, salvando em fallback local:", e);
        }
      }

      memoryOrders.set(orderId, {
        ...orderData,
        items: data.items,
      });

      return {
        ok: true,
        orderId,
        pixId: pixResult.id,
        qrCode: pixResult.qrCode,
        qrCodeBase64: pixResult.qrCodeBase64,
        expirationDate: pixResult.expirationDate,
        total: data.total,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao processar pedido e gerar Pix.";
      return {
        ok: false,
        error: errorMsg,
      };
    }
  });

const getShopOrderStatusSchema = z.object({
  orderId: z.string().min(1),
  pixId: z.string().optional(),
});

/**
 * Server Function para verificar status do pedido da loja
 */
export const getShopOrderStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => getShopOrderStatusSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      let pixStatus = "pendente";
      let paid = false;

      // Se temos o ID da transação Pix no Nitro, consulta na API Nitro
      if (data.pixId) {
        const check = await getNitroTransactionStatus(data.pixId);
        pixStatus = check.status;
        paid = check.paid;
      }

      // Se pago, atualiza o status no Supabase e em memória
      if (paid) {
        if (supabase) {
          try {
            await supabase
              .from("orders")
              .update({ status: "pago" })
              .eq("id", data.orderId);
          } catch {
            // Ignora erro de gravação
          }
        }

        const mem = memoryOrders.get(data.orderId);
        if (mem) {
          mem.status = "pago";
        }
      }

      // Busca dados completos do pedido
      let orderDetails: Record<string, unknown> | null = null;
      if (supabase) {
        try {
          const { data: dbOrder } = await supabase
            .from("orders")
            .select("*, order_items(*, products(*))")
            .eq("id", data.orderId)
            .single();

          if (dbOrder) {
            orderDetails = dbOrder as Record<string, unknown>;
          }
        } catch {
          // Ignora erro
        }
      }

      if (!orderDetails) {
        orderDetails = memoryOrders.get(data.orderId) || null;
      }

      return {
        ok: true as const,
        paid,
        status: paid ? "pago" : pixStatus,
        order: orderDetails,
      };
    } catch {
      return {
        ok: false as const,
        paid: false,
        status: "pendente",
        order: null,
      };
    }
  });
