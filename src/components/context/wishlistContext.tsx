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

// Define the type for the context value
interface WishlistContextType {
  isLoadingWishList: boolean;
  isFetchingWishList: boolean;
  // wishlist
  wishList: any[];
  getToWishlistBtn: any;
  addToFavouriteBtn: any;
  DeleteHandle: any;
}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Define the props interface for WishlistProvider
interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [isLoadingWishList, setIsLoadingWishList] = useState<boolean>(true);
  const [isFetchingWishList, setIsFetchingWishList] = useState<boolean>(true);

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const [wishList, setWishList] = useState<CartItem[]>([]);

  // ----------------------- GET WISHLIST -------------------------------------------

  const getToWishlistBtn = useCallback(async () => {
    try {
      setIsFetchingWishList(true);

      const response = await axios.get(`/api/wishlist?userId=${userId}`);
      setWishList(response.data.get_user_wishlist);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    } finally {
      setIsFetchingWishList(false);
    }
  }, [userId]);

  // ----------------------- POST WISHLIST -------------------------------------------

  const addToFavouriteBtn = useCallback(
    async (productId: string) => {
      try {
        setIsLoadingWishList(true);
        const response = await axios.post(`/api/wishlist`, {
          productId,
          userId,
        });
        if (response.data.statusbar === 200) {
          await getToWishlistBtn();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error("Error adding product to wishlist:", error);
      } finally {
        setIsLoadingWishList(false);
      }
    },
    [getToWishlistBtn, userId]
  );

  // ----------------------- DELETE WISHLIST -------------------------------------------

  const DeleteHandle = async (wishlistId: string) => {
    try {
      const response = await axios.delete(
        `/api/wishlist?wishlistId=${wishlistId}`
      );
      if (response.data.statusbar === 200) {
        await getToWishlistBtn();
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
      getToWishlistBtn();
    }
  }, [getToWishlistBtn, userId]);

  return (
    <WishlistContext.Provider
      value={{
        isLoadingWishList,
        isFetchingWishList,
        wishList,
        getToWishlistBtn,
        addToFavouriteBtn,
        DeleteHandle,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Create the useCart hook
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
