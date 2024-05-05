"use client";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import axios from "axios";
import React, { useState } from "react";

export default function AddtoCartBtn({ _id, name, price, image }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { session } = useAuth();

  const AddToCart = async (
    _id: string,
    name: string,
    price: number,
    image: string
  ) => {
    if (session) {
      try {
        setIsLoading(true);
        await axios.post("/api/products/cart/addToCartBtn", {
          _id,
          name,
          quantity,
          price,
          image,
        });
        // await getToCartBtn();
      } catch (error) {
        console.error("Error adding product to cart:", error);
        setError("Error adding product to cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
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

