import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "../../ui/Button";
import { useCart } from "../../context/cartContext";
import axios from "axios";
import { toast } from "react-toastify";
import Processing from "../../ui/Loading/Processing";

interface ProductDetailCatgeoryProps {
  product: string;
  userId: string;
  size: string;
  data: {
    category: string;
    subCategory: string;
    items: string;
  };
}

export default function AddtoCartBtn({
  product,
  userId,
  size,
  data,
}: ProductDetailCatgeoryProps) {
  const { getToCartBtn } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToCartBtn = async (
    productId: string,
    userId: string,
    size: string
  ) => {
    setIsLoading(true);
    if (data.items === "shoes") {
      if (!size) {
        setIsLoading(false);
        return toast.success("Size is Required.");
      }
    }
    if (!userId) {
      setIsLoading(false);
      return toast.success("Login is Required.");
    }
    try {
      const response = await axios.post(`/api/cart`, {
        productId,
        userId,
        size,
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
    <Button
      onClick={() => addToCartBtn(product, userId, size)}
      disabled={isLoading}
      variant="fullWidth"
      round="md"
    >
      {isLoading ? <Processing /> : <FaCartShopping className="mr-2" />}
      Add to Cart
    </Button>
  );
}
