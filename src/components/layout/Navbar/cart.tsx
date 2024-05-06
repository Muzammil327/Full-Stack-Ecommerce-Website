import React from "react";
import { useCart } from "@/src/components/context/cartContext/page";
import CartSVG from "@/src/svg/cartSVG";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartBuy, isLoading, error } = useCart();

  return (
    <div className="ml-4 flow-root lg:ml-6">
      {isLoading ? (
        <div className="spinner-border text-primary">
          <CartSVG />
          <span className="sr-only">loading cart items</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Link href="/cart" className="group -m-2 flex items-center p-2">
          <CartSVG />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cartBuy && cartBuy.length}
          </span>
          <span className="sr-only">cart items</span>
        </Link>
      )}
    </div>
  );
};

export default Cart;
