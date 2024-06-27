import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useCart } from "../../context/cartContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddtoCartBtn({
  product,
  userId,
}: {
  product: string;
  userId: string;
}) {
  const { getToCartBtn } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToCartBtn = async (productId: string, userId: string) => {
    setIsLoading(true);
    if (!userId) {
      return toast.success("Login is Required.");
    }
    try {
      const response = await axios.post(`/api/cart`, {
        productId,
        userId,
      });
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="button_bg"
        onClick={() => addToCartBtn(product, userId)}
        disabled={isLoading}
      >
        <FaCartShopping className="mr-2" /> Add to Cart
      </Button>
    </>
  );
}
