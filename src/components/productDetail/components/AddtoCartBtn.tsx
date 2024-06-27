import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useCart } from "../../context/cartContext";

export default function AddtoCartBtn({ product }: { product: string }) {
  const { isLoading, addToCartBtn } = useCart();

  return (
    <>
      <Button
        className="button_bg"
        onClick={() => addToCartBtn(product)}
        disabled={isLoading}
      >
        <FaCartShopping className="mr-2" /> Add to Cart
      </Button>
    </>
  );
}
