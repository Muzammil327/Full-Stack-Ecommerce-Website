import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Cart_API_Endpoint } from "@/src/utils/constant";
import { useCart } from "../contexts/cartContext";

export default function AddtoCartBtn({ product }: { product: string }) {
  const { user, session } = useAuth();
  const { getToCartBtn } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  const AddToCart = async (product: string) => {
    if (user) {
      try {
        setLoading(true);
        if (!session) {
          return toast.error("Please Login");
        }
        const response = await axios.post(`${Cart_API_Endpoint}/post`, {
          product,
          user,
        });

        toast.success(response.data.message);
        getToCartBtn();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            toast.warning(error.response?.data.message);
          } else if (error.response?.status === 500) {
            toast.error(error.response?.data.message);
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
        } else {
          console.error("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <button
        className="bg-red-400 hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white w-full block border-2 border-solid border-red-400"
        onClick={() => AddToCart(product)}
        disabled={loading}
      >
        Add to Cart
      </button>
    </>
  );
}
