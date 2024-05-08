import React from "react";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import { redirect, useRouter } from "next/navigation";

interface CartItem2 {
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}

const PlaceOrderBtn = ({
  cartBuy,
  total,
}: {
  cartBuy: CartItem2[];
  total: number;
}) => {
  const { addToOrder, isLoading } = useCart();
  const { session } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (session) {
      const user = session.user._id;
      addToOrder(cartBuy, user, total);
      router.push("/cart/checkout");
    } else {
      alert("Please Login");
    }
  };

  return (
    <button
      className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Place Order"}
    </button>
  );
};

export default PlaceOrderBtn;
