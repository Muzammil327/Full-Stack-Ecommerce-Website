import React from "react";
import { Button } from "@/src/components/ui/ui";
import { FaHeart } from "react-icons/fa6";
import Link from "next/link";
import { useWishlist } from "../../context/wishlistContext";

export default function FavouriteIcon() {
  const { isFetchingWishList, wishList } = useWishlist();

  return (
    <div className="ml-4 relative">
      <Button className="button_outline md:!p-3 !p-2">
        <Link href="/wishlist" aria-label="add to favourite">
          <FaHeart size={17} />
          <span className="ml-2 absolute -top-2 -right-2 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
            {isFetchingWishList ? (
              <span className="sr-only">items in wishList, view bag</span>
            ) : (
              <>{wishList && wishList.length}</>
            )}
          </span>{" "}
        </Link>
      </Button>
    </div>
  );
}
