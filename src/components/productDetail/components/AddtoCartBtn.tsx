import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useCart } from "../../context/cartContext";
import axios from "axios";
import { toast } from "react-toastify";
import Processing from "../../ui/Loading/Processing";

interface ProductDetailCatgeoryProps {
  product: string;
  userId: string;
  color: string;
  data: {
    cat: [];
    subCategory: string;
    item: [];
  };
}

export default function AddtoCartBtn({
  product,
  userId,
  color,
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

    if (!color) {
      setIsLoading(false);
      return toast.success("Color is Required.");
    }

    if (!userId) {
      setIsLoading(false);
      return toast.success("Login is Required.");
    }
    try {
      const response = await axios.post(`/api/cart`, {
        productId,
        userId,
        color,
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
      onClick={() => addToCartBtn(product, userId, color)}
      disabled={isLoading}
      variant="solid"
      title="add product to cart"
      className="flex items-center"
    >
      {isLoading ? <Processing /> : <FaCartShopping className="mr-2" />}
      Add to Cart
    </Button>
  );
}
