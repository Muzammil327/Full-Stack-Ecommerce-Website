import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import React from "react";

interface CartItem2 {
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}

const CheckoutBtn = ({ cartBuy }: { cartBuy: CartItem2[] }) => {
  const { addToPendingOrder, isLoading } = useCart();
  const { session } = useAuth();

  const handleSubmit = async () => {
    if (session) {
      const user = session.user._id;
      addToPendingOrder(cartBuy, user);
      // Consider using a toast notification or another form of feedback
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
      {isLoading ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
};

export default CheckoutBtn;
