"use client";
import React, { useState } from "react";
import Button from "../../ui/Button";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/wishlistContext";
import { toast } from "react-toastify";
import axios from "axios";
import Processing from "../../ui/Loading/Processing";

export default function FavouriteBtn({
  product,
  userId,
}: {
  product: string;
  userId: string;
}) {
  const [isLoadingWishList, setIsLoadingWishList] = useState<boolean>(false);
  const { getToWishlistBtn } = useWishlist();

  const addToFavouriteBtn = async (productId: string) => {
    setIsLoadingWishList(true);
    if (!userId) {
      return toast.success("Login is Required.");
    }
    try {
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
  };
  return (
    <Button
      disabled={isLoadingWishList}
      onClick={() => addToFavouriteBtn(product)}
      className="flex items-center justify-center"
      variant="outline"
      title="add to favourite button"
    >
      {isLoadingWishList ? <Processing /> : <FaHeart />}
    </Button>
  );
}
