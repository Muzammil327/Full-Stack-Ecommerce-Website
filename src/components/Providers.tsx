"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
