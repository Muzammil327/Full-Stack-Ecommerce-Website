import React from "react";
import { Button, Links } from "@/src/components/ui/ui";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "../../context/cartContext";

export default function CartIcon() {
  const { isFetching, cart } = useCart();

  return (
    <div className="md:ml-6 relative">
      <Link href="/cart" title="add to cart icon">
        <Button
          className="flex items-center justify-center !px-3 !h-10"
          variant="outline"
        >
          <FaShoppingBasket size={17} />
          <span className="ml-2 absolute -top-2 -right-2 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
            {isFetching ? (
              <span className="sr-only">items in cart, view bag</span>
            ) : (
              <>{cart && cart.length}</>
            )}
          </span>
        </Button>
      </Link>
    </div>
  );
}
