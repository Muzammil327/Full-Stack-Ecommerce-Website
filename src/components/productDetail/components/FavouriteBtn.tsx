import React from "react";
import Button from "../../ui/Button";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/wishlistContext";

export default function FavouriteBtn({ product }: { product: string }) {
  const { addToFavouriteBtn, isLoadingWishList } = useWishlist();
  return (
    <>
      <Button
        disabled={isLoadingWishList}
        className="btnIcon_outline"
        onClick={() => addToFavouriteBtn(product)}
      >
        <FaHeart />
      </Button>
    </>
  );
}
