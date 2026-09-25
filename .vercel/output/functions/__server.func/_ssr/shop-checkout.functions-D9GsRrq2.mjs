import { c as createServerRpc, a as createNitroPixTransaction, g as getNitroTransactionStatus } from "./nitro.server-COcsxgaD.mjs";
import { s as supabase } from "./supabase-BjgR9v3X.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./shop-products-DOaOjncj.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const shopOrderItemSchema = objectType({
  productId: stringType().min(1),
  nome: stringType(),
  precoUnitario: numberType().min(0.01),
  quantidade: numberType().min(1)
});
const createShopOrderSchema = objectType({
  clienteNome: stringType().trim().min(3, "Nome completo é obrigatório"),
  clienteEmail: stringType().trim().email("E-mail inválido"),
  clienteWhatsapp: stringType().trim().min(10, "WhatsApp é obrigatório"),
  enderecoRua: stringType().trim().min(2, "Rua/Avenida é obrigatória"),
  enderecoNumero: stringType().trim().min(1, "Número é obrigatório"),
  enderecoBairro: stringType().trim().min(2, "Bairro é obrigatório"),
  enderecoCidade: stringType().trim().min(2, "Cidade é obrigatória"),
  enderecoUf: stringType().trim().min(2, "Estado (UF) é obrigatório"),
  enderecoCep: stringType().trim().min(8, "CEP é obrigatório"),
  subtotal: numberType().min(0.01),
  frete: numberType().min(0),
  total: numberType().min(0.01),
  items: arrayType(shopOrderItemSchema).min(1, "Seu carrinho está vazio")
});
const memoryOrders = /* @__PURE__ */ new Map();
const createShopOrderFn_createServerFn_handler = createServerRpc({
  id: "9ec040322c5ff67b5dc2607a0798a7718f8a7ebb61c8310e1db74d3f7f70b425",
  name: "createShopOrderFn",
  filename: "src/lib/shop-checkout.functions.ts"
}, (opts) => createShopOrderFn.__executeServer(opts));
const createShopOrderFn = createServerFn({
  method: "POST"
}).inputValidator((data) => createShopOrderSchema.parse(data)).handler(createShopOrderFn_createServerFn_handler, async ({
  data
}) => {
  try {
    const orderId = `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cleanPhone = data.clienteWhatsapp.replace(/\D/g, "");
    const pixResult = await createNitroPixTransaction({
      amountNum: data.total,
      planName: `Loja DezPila - Pedido #${orderId.slice(-6).toUpperCase()}`,
      planId: "LOJA_ECOMMERCE",
      customer: {
        name: data.clienteNome,
        email: data.clienteEmail,
        phone: cleanPhone,
        document: "00000000000"
      },
      sourceUrl: "https://oficialdezpila.lovable.app/shop/checkout"
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
      criado_em: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (supabase) {
      try {
        await supabase.from("orders").insert(orderData);
        const orderItemsData = data.items.map((it) => ({
          order_id: orderId,
          product_id: it.productId,
          quantidade: it.quantidade,
          preco_unitario: it.precoUnitario
        }));
        await supabase.from("order_items").insert(orderItemsData);
      } catch (e) {
        console.warn("[ShopOrder] Erro ao gravar no Supabase, salvando em fallback local:", e);
      }
    }
    memoryOrders.set(orderId, {
      ...orderData,
      items: data.items
    });
    return {
      ok: true,
      orderId,
      pixId: pixResult.id,
      qrCode: pixResult.qrCode,
      qrCodeBase64: pixResult.qrCodeBase64,
      expirationDate: pixResult.expirationDate,
      total: data.total
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erro ao processar pedido e gerar Pix.";
    return {
      ok: false,
      error: errorMsg
    };
  }
});
const getShopOrderStatusSchema = objectType({
  orderId: stringType().min(1),
  pixId: stringType().optional()
});
const getShopOrderStatusFn_createServerFn_handler = createServerRpc({
  id: "08b47ac5e7a118ac08719ef9884c78c84f086938b790ed104561971dccace4fa",
  name: "getShopOrderStatusFn",
  filename: "src/lib/shop-checkout.functions.ts"
}, (opts) => getShopOrderStatusFn.__executeServer(opts));
const getShopOrderStatusFn = createServerFn({
  method: "POST"
}).inputValidator((data) => getShopOrderStatusSchema.parse(data)).handler(getShopOrderStatusFn_createServerFn_handler, async ({
  data
}) => {
  try {
    let pixStatus = "pendente";
    let paid = false;
    if (data.pixId) {
      const check = await getNitroTransactionStatus(data.pixId);
      pixStatus = check.status;
      paid = check.paid;
    }
    if (paid) {
      if (supabase) {
        try {
          await supabase.from("orders").update({
            status: "pago"
          }).eq("id", data.orderId);
        } catch {
        }
      }
      const mem = memoryOrders.get(data.orderId);
      if (mem) {
        mem.status = "pago";
      }
    }
    let orderDetails = null;
    if (supabase) {
      try {
        const {
          data: dbOrder
        } = await supabase.from("orders").select("*, order_items(*, products(*))").eq("id", data.orderId).single();
        if (dbOrder) {
          orderDetails = dbOrder;
        }
      } catch {
      }
    }
    if (!orderDetails) {
      orderDetails = memoryOrders.get(data.orderId) || null;
    }
    return {
      ok: true,
      paid,
      status: paid ? "pago" : pixStatus,
      order: orderDetails
    };
  } catch {
    return {
      ok: false,
      paid: false,
      status: "pendente",
      order: null
    };
  }
});
export {
  createShopOrderFn_createServerFn_handler,
  getShopOrderStatusFn_createServerFn_handler
};
