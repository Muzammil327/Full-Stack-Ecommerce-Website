"use client";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the type for the cart item
interface CartItem {
  cart: any;
  quantity: number;
  _id: string;
  name: string;
  image: string;
  user: string;
  price: number;
}

// Define the type for the context value
interface CartContextType {
  cartBuy: CartItem[];
  isLoading: boolean;
  error: string;
  addToCartBtn: (
    _id: string,
    name: string,
    price: number,
    image: string,
    user: string
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartIncrease: (productId: string, quantity: number) => Promise<void>;
  updateCartDecrease: (productId: string, quantity: number) => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props interface for CartProvider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartBuy, setCartBuy] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const getToCartBtn = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/products/cart/getToCartBtn");
      setCartBuy(response.data.cart);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Error fetching cart data. Please try again later.");
      setIsLoading(false);
    }
  }, []);

  const addToCartBtn = useCallback(
    async (
      _id: string,
      name: string,
      price: number,
      image: string,
      user: string
    ) => {
      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/post/cart`,
          {
            _id,
            name,
            quantity,
            price,
            image,
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
    [getToCartBtn, quantity]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        setIsLoading(true);
        await axios.delete("/api/products/cart/deleteFromCart", {
          data: { productId },
        });
        await getToCartBtn();
      } catch (error) {
        console.error("Error removing product from cart:", error);
        setError("Error removing product from cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn]
  );

  const updateCartIncrease = useCallback(
    async (productId: string, quantity: number) => {
      try {
        setIsLoading(true);
        await axios.put("/api/products/cart/updateCartIncrease", {
          productId,
          quantity,
        });
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
    async (productId: string, quantity: number) => {
      try {
        setIsLoading(true);
        await axios.put("/api/products/cart/updateCartDecrease", {
          productId,
          quantity,
        });
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

  useEffect(() => {
    getToCartBtn();
  }, [getToCartBtn]);

  return (
    <CartContext.Provider
      value={{
        cartBuy,
        isLoading,
        error,
        addToCartBtn,
        removeFromCart,
        updateCartIncrease,
        updateCartDecrease,
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
