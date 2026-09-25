import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { I as INITIAL_PRODUCTS } from "./shop-products-DOaOjncj.mjs";
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
async function getProductByIdFromDb(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn("[Supabase] Erro ao buscar produto por ID:", e);
    }
  }
  return INITIAL_PRODUCTS.find((p) => p.id === id) || null;
}
export {
  getProductByIdFromDb as g,
  supabase as s
};
