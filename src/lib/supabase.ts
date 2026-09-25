import { createClient } from "@supabase/supabase-js";
import { INITIAL_PRODUCTS, Product } from "@/data/shop-products";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Função para buscar catálogo de produtos ativos
 */
export async function getProductsFromDb(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("ativo", true)
        .order("destaque", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (e) {
      console.warn("[Supabase] Erro ao buscar produtos no DB, utilizando fallback local:", e);
    }
  }

  // Fallback seguro de produtos inicializados localmente
  return INITIAL_PRODUCTS;
}

/**
 * Buscar produto único por ID
 */
export async function getProductByIdFromDb(id: string): Promise<Product | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (e) {
      console.warn("[Supabase] Erro ao buscar produto por ID:", e);
    }
  }

  return INITIAL_PRODUCTS.find((p) => p.id === id) || null;
}
