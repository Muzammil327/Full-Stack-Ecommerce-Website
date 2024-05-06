import React from "react";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";

export default function AddtoCartBtn({ _id, name }: any) {
  const { addToCartBtn } = useCart();

  const { session } = useAuth();

  const AddToCart = async (_id: string, name: string) => {
    if (session) {
      const user = session.user._id;
      addToCartBtn(_id, name, user);
      alert("Product add to cart");
    } else {
      alert("Please Login");
    }
  };
  return (
    <button
      className="bg-red-400 hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white w-full block border-2 border-solid border-red-400"
      onClick={() => AddToCart(_id, name)}
    >
      Add to Cart
    </button>
  );
}
