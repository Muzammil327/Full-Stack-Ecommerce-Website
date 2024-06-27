"use client";
import { WishlistItem } from "@/src/types/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface WishlistContextType {
  isFetchingWishList: boolean;
  // wishlist
  wishList: WishlistItem[];
  getToWishlistBtn: () => void;
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
  const [isFetchingWishList, setIsFetchingWishList] = useState<boolean>(true);

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const [wishList, setWishList] = useState<WishlistItem[]>([]);

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

  useEffect(() => {
    if (userId) {
      getToWishlistBtn();
    }
  }, [getToWishlistBtn, userId]);

  return (
    <WishlistContext.Provider
      value={{
        isFetchingWishList,
        wishList,
        getToWishlistBtn,
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
