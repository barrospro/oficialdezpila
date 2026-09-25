import { r as reactExports } from "../_libs/react.mjs";
import { c as calculateOrderSummary } from "./shipping-NxYrh6DR.mjs";
const STORAGE_KEY = "dezpila_shop_cart_v1";
const CART_EVENT = "dezpila_cart_updated";
function getCartItemsFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveCartItemsToStorage(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch (e) {
    console.error("[Cart] Erro ao salvar carrinho:", e);
  }
}
function addToCart(product, quantity = 1) {
  const current = getCartItemsFromStorage();
  const existingIndex = current.findIndex((item) => item.product.id === product.id);
  if (existingIndex >= 0) {
    current[existingIndex].quantidade += quantity;
  } else {
    current.push({ product, quantidade: quantity });
  }
  saveCartItemsToStorage(current);
}
function removeFromCart(productId) {
  const current = getCartItemsFromStorage();
  const filtered = current.filter((item) => item.product.id !== productId);
  saveCartItemsToStorage(filtered);
}
function updateCartQuantity(productId, quantity) {
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
function clearCart() {
  saveCartItemsToStorage([]);
}
function useCart() {
  const [items, setItems] = reactExports.useState(getCartItemsFromStorage);
  reactExports.useEffect(() => {
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
  const summary = calculateOrderSummary(
    items.map((item) => ({
      preco: item.product.preco,
      quantidade: item.quantidade
    }))
  );
  return {
    items,
    totalCount,
    summary,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  };
}
export {
  useCart as u
};
