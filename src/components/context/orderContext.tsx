"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useCart } from "./cartContext";

// Define the type for the cart item
interface CartItem {
  _id: string;
  qty: number;
  size: string;
  product_Detail: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}
interface Product {
  product: string;
  qty: number;
  size: string;
}

// Define the type for the context value
interface OrderContextType {
  isLoadingOrder: boolean;
  isFetchingOrder: boolean;

  // order
  order: any[];
  getToOrderBtn: any;
  DeleteHandle: any;

  addToOrder: (products: Product[], totalPrice: any) => Promise<void>; // Corrected signature
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Define the props interface for OrderProvider
interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { cart, getToCartBtn } = useCart(); // Assume useCart provides cartItems as well

  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(false);
  const { data: session } = useSession();
  const userId = session?.user._id;
  const router = useRouter();

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET Order ITEMS ----------------------------------------------
  // --------------------------------------------------------------------------------------------

  const [order, setOrder] = useState<CartItem[]>([]);

  const getToOrderBtn = useCallback(async () => {
    try {
      setIsFetchingOrder(true);

      const response = await axios.get(`/api/order/${userId}`);
      setOrder(response.data.get_user_order);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsFetchingOrder(false);
    }
  }, [userId]);

  // ----------------------- END GET Pending Order ITEMS ----------------------------------------

  const addToOrder = useCallback(
    async (products: Product[], totalPrice: any) => {
      try {
        setIsLoadingOrder(true);
        await Promise.all(
          products.map(async (product) => {
            await axios.post(`/api/order`, {
              productId: product.product, // Send only the product ID
              qty: product.qty, // Send the quantity
              size: product.size, // Send the quantity
              userId,
              totalPrice,
            });
          })
        );

        getToCartBtn();
        await getToOrderBtn();
        router.refresh();
        router.push("/stores");
    
      } catch (error) {
        console.error("Error adding product to cart:", error);
      } finally {
        setIsLoadingOrder(false);
      }
    },
    [getToOrderBtn, router, userId, getToCartBtn]
  );
  // ----------------------- DELETE CART -------------------------------------------

  const DeleteHandle = async (orderId: string) => {
    try {
      const response = await axios.delete(`/api/order?orderId=${orderId}`);
      if (response.data.statusbar === 200) {
        await getToOrderBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (userId) {
      getToOrderBtn();
    }
  }, [getToOrderBtn, userId]);

  return (
    <OrderContext.Provider
      value={{
        getToOrderBtn,
        order,
        isFetchingOrder,
        isLoadingOrder,
        addToOrder,
        DeleteHandle,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Create the useCart hook
export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useCart must be used within a OrderProvider");
  }
  return context;
};
