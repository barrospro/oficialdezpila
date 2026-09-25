import { c as createServerRpc, a as createNitroPixTransaction, b as createNitroCardTransaction, g as getNitroTransactionStatus } from "./nitro.server-COcsxgaD.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const createNitroPixSchema = objectType({
  amountNum: numberType().min(1),
  planName: stringType().default("Starter Mensal"),
  planId: stringType().default("MENSAL"),
  name: stringType().trim().min(3),
  email: stringType().trim().email(),
  phone: stringType().min(10),
  document: stringType().min(11),
  sourceUrl: stringType().optional()
});
const createNitroPix_createServerFn_handler = createServerRpc({
  id: "75b142e5c9770a891e2d5c29406f36a4ad9d1ca46a65138def4dd6794805fb82",
  name: "createNitroPix",
  filename: "src/lib/nitro.functions.ts"
}, (opts) => createNitroPix.__executeServer(opts));
const createNitroPix = createServerFn({
  method: "POST"
}).inputValidator((data) => createNitroPixSchema.parse(data)).handler(createNitroPix_createServerFn_handler, async ({
  data
}) => {
  try {
    const result = await createNitroPixTransaction({
      amountNum: data.amountNum,
      planName: data.planName,
      planId: data.planId,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document
      },
      sourceUrl: data.sourceUrl
    });
    return {
      ok: true,
      ...result
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erro ao gerar PIX na Nitro Pagamentos.";
    return {
      ok: false,
      error: errorMsg
    };
  }
});
const createNitroCardSchema = objectType({
  amountNum: numberType().min(1),
  planName: stringType().default("Starter Mensal"),
  planId: stringType().default("MENSAL"),
  name: stringType().trim().min(3),
  email: stringType().trim().email(),
  phone: stringType().min(10),
  document: stringType().min(11),
  cardNumber: stringType().min(13),
  holderName: stringType().min(3),
  expirationMonth: stringType().min(1),
  expirationYear: stringType().min(2),
  cvv: stringType().min(3),
  installments: numberType().default(1),
  sourceUrl: stringType().optional()
});
const createNitroCard_createServerFn_handler = createServerRpc({
  id: "857122ff8a242f3c735b6bef8370745444908d765d5d1ca993aae1430dfeb3c9",
  name: "createNitroCard",
  filename: "src/lib/nitro.functions.ts"
}, (opts) => createNitroCard.__executeServer(opts));
const createNitroCard = createServerFn({
  method: "POST"
}).inputValidator((data) => createNitroCardSchema.parse(data)).handler(createNitroCard_createServerFn_handler, async ({
  data
}) => {
  try {
    const result = await createNitroCardTransaction({
      amountNum: data.amountNum,
      planName: data.planName,
      planId: data.planId,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document
      },
      card: {
        number: data.cardNumber,
        holderName: data.holderName,
        expirationMonth: data.expirationMonth,
        expirationYear: data.expirationYear,
        cvv: data.cvv,
        installments: data.installments
      },
      sourceUrl: data.sourceUrl
    });
    return {
      ok: true,
      ...result
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erro ao processar cartão na Nitro Pagamentos.";
    return {
      ok: false,
      error: errorMsg,
      paid: false
    };
  }
});
const checkNitroPixStatusSchema = objectType({
  transactionId: stringType().min(1)
});
const checkNitroPixStatus_createServerFn_handler = createServerRpc({
  id: "8f81452859eb2a6341d8982a5376e5a50cd04b5d15cf38adeb25617f3dee9709",
  name: "checkNitroPixStatus",
  filename: "src/lib/nitro.functions.ts"
}, (opts) => checkNitroPixStatus.__executeServer(opts));
const checkNitroPixStatus = createServerFn({
  method: "POST"
}).inputValidator((data) => checkNitroPixStatusSchema.parse(data)).handler(checkNitroPixStatus_createServerFn_handler, async ({
  data
}) => {
  try {
    const result = await getNitroTransactionStatus(data.transactionId);
    return {
      ok: true,
      ...result
    };
  } catch {
    return {
      ok: false,
      status: "pendente",
      paid: false
    };
  }
});
export {
  checkNitroPixStatus_createServerFn_handler,
  createNitroCard_createServerFn_handler,
  createNitroPix_createServerFn_handler
};
