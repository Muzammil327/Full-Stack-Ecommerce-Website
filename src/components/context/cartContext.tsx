"use client";
import { CartItem } from "@/src/types/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  isFetching: boolean;
  cart: CartItem[];
  getToCartBtn: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props interface for CartProvider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const { data: session } = useSession();
  const userId = session?.user?._id;

  const [cart, setCart] = useState<CartItem[]>([]);

  // ----------------------- GET CART -------------------------------------------

  const getToCartBtn = useCallback(async () => {
    try {
      setIsFetching(true);

      const response = await axios.get(`/api/cart?userId=${userId}`);
      setCart(response.data.get_user_cart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getToCartBtn();
    }
  }, [getToCartBtn, userId]);

  return (
    <CartContext.Provider
      value={{
        isFetching,

        cart,
        getToCartBtn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create the useCart hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
