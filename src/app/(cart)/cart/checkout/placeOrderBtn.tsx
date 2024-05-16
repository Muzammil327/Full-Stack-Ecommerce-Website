import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/src/components/contexts/authContext";
import { useCart } from "@/src/components/contexts/cartContext";
import axios from "axios";
import { ORDER_API_Endpoint } from "@/src/utils/constant";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface Product {
  product: string;
  qty: number;
}

const PlaceOrderBtn = ({
  products,
  totalPrice,
}: {
  products: Product[];
  totalPrice: number;
}) => {
  const { getToCartBtn } = useCart();
  const { session, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (products: Product[], totalPrice: any) => {
   
    if (user) {
      try {
        setLoading(true);
        if (!session) {
          return toast.error("Please Login");
        }
        await Promise.all(
          products.map(async (product) => {
            await axios.post(`${ORDER_API_Endpoint}/post`, {
              product: product.product, // Send only the product ID
              qty: product.qty, // Send the quantity
              user,
              totalPrice,
            });
          })
        );

        // toast.success(response.data.message);
        getToCartBtn();
        router.push("/stores");
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
    <button
      className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all"
      onClick={() => handleSubmit(products, totalPrice)}
      disabled={loading}
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
};

export default PlaceOrderBtn;
