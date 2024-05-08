"use client";
import {
  Cart_API_Endpoint,
  Favourite_API_Endpoint,
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

  // --------------------------------------------------------------------------------------------
  // ----------------------- START GET CART ITEMS -----------------------------------------------
  // --------------------------------------------------------------------------------------------

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [errorCart, setErrorCart] = useState<string>("");

  const getToCartBtn = useCallback(async () => {
    try {
      setLoadingCart(true);

      if (session) {
        const response = await axios.get(
          `${Cart_API_Endpoint}/get/${session.user._id}`
        );

        setCart(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorCart("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingCart(false);
    }
  }, [session]);

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

      if (session) {
        const response = await axios.get(
          `${Favourite_API_Endpoint}/get/${session.user._id}`
        );

        setWishList(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setErrorWishList("Error fetching cart data. Please try again later.");
    } finally {
      setLoadingWishList(false);
    }
  }, [session]);

  // const {errorWishList,loadingWishList, getToWishlistBtn, wishList} = useCart()

  // --------------------------------------------------------------------------------------------
  // ----------------------- END GET WISHLIST ITEMS ---------------------------------------------
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

  // const addToFavouriteBtn = useCallback(
  //   async (productId: string, userId: string) => {
  //     try {
  //       setLoadingFavourite(true);
  //       const response = await axios.post(`${Favourite_API_Endpoint}/post`, {
  //         productId,
  //         userId,
  //       });
  //       setErrorFavourite(response.data.message);
  //       // await getToCartBtn();
  //     } catch (error) {
  //       console.error("Error adding product to cart:", error);
  //       setErrorFavourite(
  //         "Error adding product to cart. Please try again later."
  //       );
  //     } finally {
  //       setLoadingFavourite(false);
  //     }
  //   },
  //   []
  // );

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
        router.push("/store");
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
    getToCartBtn();
    getPendingOrder();
    getToWishlistBtn();
  }, [getToCartBtn, getPendingOrder, getToWishlistBtn]);

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
