import React from "react";
import type { CartItem } from "../types/CardItem";
import type { Product } from "../types/Product";

interface CartContextData {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextData | undefined>(undefined);

const CART_STORAGE_KEY = "ecommerce_cart";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erro ao ler carrinho do localStorage", e);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Erro ao salvar carrinho no localStorage", e);
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.product.id === product.id);
      if (index === -1) {
        if (quantity > product.stock) {
          console.warn("Estoque insuficiente");
          return prev; // não adiciona
        }

        return [...prev, { product, quantity }];
      }

      const existing = prev[index];
      const newQuantity = existing.quantity + quantity;

      if (newQuantity > product.stock) {
        console.warn("Estoque insuficiente");
        return prev; // não atualiza
      }

      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        quantity: copy[index].quantity + quantity,
      };
      return copy;
    });
  };

  const decreaseItem = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;

      if (item.quantity === 1) {
        return prev.filter((i) => i.product.id !== productId);
      }

      return prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, total, addItem, decreaseItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextData => {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return ctx;
};

