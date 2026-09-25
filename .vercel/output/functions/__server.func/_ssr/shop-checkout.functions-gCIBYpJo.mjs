import { c as createSsrRpc } from "./createSsrRpc-C2cGivNr.mjs";
import { c as createServerFn } from "./index.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType } from "../_libs/zod.mjs";
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
const createShopOrderFn = createServerFn({
  method: "POST"
}).inputValidator((data) => createShopOrderSchema.parse(data)).handler(createSsrRpc("9ec040322c5ff67b5dc2607a0798a7718f8a7ebb61c8310e1db74d3f7f70b425"));
const getShopOrderStatusSchema = objectType({
  orderId: stringType().min(1),
  pixId: stringType().optional()
});
const getShopOrderStatusFn = createServerFn({
  method: "POST"
}).inputValidator((data) => getShopOrderStatusSchema.parse(data)).handler(createSsrRpc("08b47ac5e7a118ac08719ef9884c78c84f086938b790ed104561971dccace4fa"));
export {
  createShopOrderFn as c,
  getShopOrderStatusFn as g
};
