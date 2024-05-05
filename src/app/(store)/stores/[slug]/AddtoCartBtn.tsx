"use client";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import React from "react";

export default function AddtoCartBtn({ _id, name, price, image }: any) {
  const { addToCartBtn } = useCart();

  const { session } = useAuth();

  const AddToCart = async (
    _id: string,
    name: string,
    price: number,
    image: string
  ) => {
    if (session) {
      addToCartBtn(_id, name, price, image);
      alert("Product add to cart");
    } else {
      alert("Please Login");
    }
  };
  return (
    <button
      className="bg-red-400 hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white w-full block border-2 border-solid border-red-400"
      onClick={() => AddToCart(_id, name, price, image)}
    >
      Add to Cart
    </button>
  );
}
