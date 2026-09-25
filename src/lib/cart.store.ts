import { useState, useEffect } from "react";
import { Product } from "@/data/shop-products";
import { calculateOrderSummary, OrderSummary } from "@/lib/shipping";

export interface CartItem {
  product: Product;
  quantidade: number;
}

const STORAGE_KEY = "dezpila_shop_cart_v1";
const CART_EVENT = "dezpila_cart_updated";

export function getCartItemsFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCartItemsToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch (e) {
    console.error("[Cart] Erro ao salvar carrinho:", e);
  }
}

export function addToCart(product: Product, quantity = 1): void {
  const current = getCartItemsFromStorage();
  const existingIndex = current.findIndex((item) => item.product.id === product.id);

  if (existingIndex >= 0) {
    current[existingIndex].quantidade += quantity;
  } else {
    current.push({ product, quantidade: quantity });
  }

  saveCartItemsToStorage(current);
}

export function removeFromCart(productId: string): void {
  const current = getCartItemsFromStorage();
  const filtered = current.filter((item) => item.product.id !== productId);
  saveCartItemsToStorage(filtered);
}

export function updateCartQuantity(productId: string, quantity: number): void {
  const current = getCartItemsFromStorage();
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const existing = current.find((item) => item.product.id === productId);
  if (existing) {
    existing.quantidade = quantity;
    saveCartItemsToStorage(current);
  }
}

export function clearCart(): void {
  saveCartItemsToStorage([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(getCartItemsFromStorage);

  useEffect(() => {
    const handler = () => {
      setItems(getCartItemsFromStorage());
    };

    window.addEventListener(CART_EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(CART_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const totalCount = items.reduce((acc, item) => acc + item.quantidade, 0);

  const summary: OrderSummary = calculateOrderSummary(
    items.map((item) => ({
      preco: item.product.preco,
      quantidade: item.quantidade,
    }))
  );

  return {
    items,
    totalCount,
    summary,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };
}
