"use client";
import {
  Cart_API_Endpoint,
  Favourite_API_Endpoint,
  ORDER_API_Endpoint,
  PENDINGORDER_API_Endpoint,
} from "@/src/utils/constant";
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
import { useAuth } from "./authContext";

// Define the type for the cart item
interface CartItem {
  _id: string;
  qty: number;
  product_Detail: {
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
  pendingOrder: CartItem3[];
  isLoading: boolean;
  error: string;
  // wishlist
  getToWishlistBtn: any;
  wishList: any[];
  loadingWishList: boolean;
  errorWishList: string;

  // cart
  cart: CartItem[];
  getToCartBtn: any;
  loadingCart: boolean;
  errorCart: string;

  // pending order
  pOrder: any[];
  getToPendingOrderBtn: any;
  loadingpOrder: boolean;
  errorpOrder: string;

  // order
  order: any[];
  getToOrderBtn: any;
  loadingOrder: boolean;
  errorOrder: string;

  addToCartBtn: (productId: string, userId: string) => Promise<void>;
  // addToFavouriteBtn: (productId: string, userId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  addToPendingOrder: (cartBuy: CartItem2[], user: string) => Promise<void>; // Corrected signature
  addToOrder: (
    cartBuy: CartItem2[],
    user: string,
    total: number
  ) => Promise<void>; // Corrected signature
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props interface for CartProvider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [pendingOrder, setPendingOrder] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useAuth();

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET CART ITEMS -----------------------------------------------
  // --------------------------------------------------------------------------------------------

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [errorCart, setErrorCart] = useState<string>("");

  const getToCartBtn = useCallback(async () => {
    try {
      setLoadingCart(true);

      const response = await axios.get(`${Cart_API_Endpoint}/get/${user}`);

      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorCart("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingCart(false);
    }
  }, [user]);

  //   const { errorCart, loadingCart, getToCartBtn, cart } = useCart();

  // --------------------------------------------------------------------------------------------
  // ----------------------- END GET CART ITEMS -----------------------------------------------
  // --------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET WISHLIST ITEMS -------------------------------------------
  // --------------------------------------------------------------------------------------------

  const [wishList, setWishList] = useState<CartItem[]>([]);
  const [loadingWishList, setLoadingWishList] = useState<boolean>(true);
  const [errorWishList, setErrorWishList] = useState<string>("");

  const getToWishlistBtn = useCallback(async () => {
    try {
      setLoadingWishList(true);

      const response = await axios.get(`${Favourite_API_Endpoint}/get/${user}`);

      setWishList(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorWishList("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingWishList(false);
    }
  }, [user]);

  // const {errorWishList,loadingWishList, getToWishlistBtn, wishList} = useCart()

  // --------------------------------------------------------------------------------------------
  // ----------------------- END GET WISHLIST ITEMS ---------------------------------------------
  // --------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET Pending Order ITEMS --------------------------------------
  // --------------------------------------------------------------------------------------------

  const [pOrder, setPOrder] = useState<CartItem[]>([]);
  const [loadingpOrder, setLoadingpOrder] = useState<boolean>(true);
  const [errorpOrder, setErrorpOrder] = useState<string>("");

  const getToPendingOrderBtn = useCallback(async () => {
    try {
      setLoadingpOrder(true);

      const response = await axios.get(
        `${PENDINGORDER_API_Endpoint}/get/${user}`
      );

      setPOrder(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorpOrder("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingpOrder(false);
    }
  }, [user]);

  // const {errorpOrder,loadingpOrder, getToPendingOrderBtn, pOrder} = useCart()

  // --------------------------------------------------------------------------------------------
  // ----------------------- END GET Pending Order ITEMS ----------------------------------------
  // --------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET Order ITEMS ----------------------------------------------
  // --------------------------------------------------------------------------------------------

  const [order, setOrder] = useState<CartItem[]>([]);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(true);
  const [errorOrder, setErrorOrder] = useState<string>("");

  const getToOrderBtn = useCallback(async () => {
    try {
      setLoadingOrder(true);

      const response = await axios.get(`${ORDER_API_Endpoint}/get/${user}`);

      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorOrder("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingOrder(false);
    }
  }, [user]);

  // const {errorOrder,loadingOrder, getToOrderBtn, order} = useCart()

  // --------------------------------------------------------------------------------------------
  // ----------------------- END GET Pending Order ITEMS ----------------------------------------
  // --------------------------------------------------------------------------------------------

  const addToCartBtn = useCallback(
    async (productId: string, userId: string) => {
      try {
        setIsLoading(true);
        await axios.post(`${Cart_API_Endpoint}/post`, {
          productId,
          userId,
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

  const addToOrder = useCallback(
    async (cartBuy: CartItem2[], user: string, total: number) => {
      // Corrected signature

      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/post/order`,
          {
            cartBuy,
            user,
            total,
          }
        );
        await getToCartBtn();
        router.push("/stores");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [getToCartBtn, router]
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
    if (user) {
      getToPendingOrderBtn();
      getToCartBtn();
      getPendingOrder();
      getToWishlistBtn();
      getToOrderBtn();
    }
  }, [
    getToCartBtn,
    getPendingOrder,
    getToWishlistBtn,
    getToPendingOrderBtn,
    getToOrderBtn,
    user,
  ]);

  return (
    <CartContext.Provider
      value={{
        pendingOrder,
        isLoading,
        error,
        addToCartBtn,

        // wishlist
        wishList,
        getToWishlistBtn,
        loadingWishList,
        errorWishList,
        // cart
        cart,
        getToCartBtn,
        loadingCart,
        errorCart,

        getToPendingOrderBtn,
        pOrder,
        loadingpOrder,
        errorpOrder,

        getToOrderBtn,
        order,
        loadingOrder,
        errorOrder,

        // addToFavouriteBtn,

        removeFromCart,

        addToPendingOrder,
        addToOrder,
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
