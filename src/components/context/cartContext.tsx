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
import { toast } from "react-toastify";

// Define the type for the cart item
interface CartItem {
  _id: string;
  qty: number;
  product_Detail: {
    _id: string;
    name: string;
    image: string;
    price: number;
    discountprice: number;
    deliveryCharge: number;
  };
}

interface CartContextType {
  isLoading: boolean;
  isFetching: boolean;

  // cart
  cart: CartItem[];
  getToCartBtn: any;
  DeleteHandle: any;
  handleUpdateCartIncrease: any;
  handleUpdateCartDecrease: any;

  addToCartBtn: (productId: string) => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props interface for CartProvider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  // ----------------------- POST CART -------------------------------------------

  const addToCartBtn = useCallback(
    async (productId: string) => {
      try {
        setIsLoading(true);
        const response = await axios.post(`/api/cart`, {
          productId,
          userId,
        });
        if (response.data.statusbar === 200) {
          await getToCartBtn();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn, userId]
  );

  // ----------------------- DELETE CART -------------------------------------------

  const DeleteHandle = async (cartId: string) => {
    try {
      const response = await axios.delete(`/api/cart?cartId=${cartId}`);
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
    }
  };

  // ----------------------- PUT INCREASE CART -------------------------------------------

  const handleUpdateCartIncrease = async (_id: string, qty: number) => {
    try {
      const response = await axios.put(`/api/cart?increase=${_id}`, { qty });
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // ----------------------- PUT DECREASE CART -------------------------------------------

  const handleUpdateCartDecrease = async (_id: string, qty: number) => {
    try {
      const response = await axios.put(`/api/cart?decrease=${_id}`, { qty });
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getToCartBtn();
    }
  }, [getToCartBtn, userId]);

  return (
    <CartContext.Provider
      value={{
        isLoading,
        isFetching,

        cart,
        addToCartBtn,
        getToCartBtn,
        DeleteHandle,
        handleUpdateCartIncrease,
        handleUpdateCartDecrease,
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
