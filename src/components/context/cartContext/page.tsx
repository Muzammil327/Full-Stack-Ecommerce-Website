"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the type for the cart item
interface CartItem {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}
interface CartItem2 {
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}
interface CartItem3 {
  cartBuy: {
    quantity: number;
    product: {
      _id: string;
      name: string;
      image: string;
      price: number;
    };
  };
}

// Define the type for the context value
interface CartContextType {
  cartBuy: CartItem[];
  pendingOrder: CartItem3[];
  isLoading: boolean;
  error: string;
  addToCartBtn: (_id: string, name: string, user: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartIncrease: (_id: string, quantity: number) => Promise<void>; // Corrected signature
  updateCartDecrease: (_id: string, quantity: number) => Promise<void>; // Corrected signature
  addToPendingOrder: (cartBuy: CartItem2[], user: string) => Promise<void>; // Corrected signature
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props interface for CartProvider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartBuy, setCartBuy] = useState<CartItem[]>([]);
  const [pendingOrder, setPendingOrder] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();

  const getToCartBtn = useCallback(async () => {
    try {
      setIsLoading(true);

      if (session) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/get/cart/${session.user._id}`
        );

        setCartBuy(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Error fetching cart data. Please try again later.");
      setIsLoading(false);
    }
  }, [session]);

  const addToCartBtn = useCallback(
    async (_id: string, name: string, user: string) => {
      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/post/cart`,
          {
            _id,
            name,
            user,
          }
        );
        await getToCartBtn();
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        setIsLoading(true);
        if (session) {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/delete/cart/${productId}`
          );
          await getToCartBtn();
        }
      } catch (error) {
        console.error("Error removing product from cart:", error);
        setError("Error removing product from cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn, session]
  );

  const updateCartIncrease = useCallback(
    async (_id: string, quantity: number) => {
      try {
        setIsLoading(true);

        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/update/cartIncrease/${_id}`,
          {
            quantity,
          }
        );
        await getToCartBtn();
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn]
  );

  const updateCartDecrease = useCallback(
    async (_id: string, quantity: number) => {
      try {
        setIsLoading(true);
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/update/cartDecrease/${_id}`,
          {
            quantity,
          }
        );
        await getToCartBtn();
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn]
  );

  const addToPendingOrder = useCallback(
    async (cartBuy: CartItem2[], user: string) => {
      // Corrected signature
      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/post/pendingOrder`,
          {
            cartBuy,
            user,
          }
        );
        await getToCartBtn();
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn]
  );
  const getPendingOrder = useCallback(async () => {
    // Corrected signature
    try {
      setIsLoading(true);

      if (session) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/get/pendingOrder/${session.user._id}`
        );

        setPendingOrder(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Error fetching cart data. Please try again later.");
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    getToCartBtn();
    getPendingOrder();
  }, [getToCartBtn, getPendingOrder]);

  return (
    <CartContext.Provider
      value={{
        cartBuy,
        pendingOrder,
        isLoading,
        error,
        addToCartBtn,
        removeFromCart,
        updateCartIncrease,
        updateCartDecrease,
        addToPendingOrder,
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
