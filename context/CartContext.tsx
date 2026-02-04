// CartContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { IMedicine } from "@/types/medicine";

type CartItem = IMedicine & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (medicine: IMedicine) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (medicine: IMedicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === medicine._id);
      if (existing) {
        return prev.map((item) =>
          item._id === medicine._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
    alert("Added to cart!");
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i._id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};