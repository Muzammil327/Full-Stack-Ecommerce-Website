import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { FaRegThumbsDown } from "react-icons/fa";
import axios from "axios";
import Processing from "../../ui/Loading/Processing";

interface LikeBtnProps {
  fetchProduct: () => void;
  datas: {
    _id: string;
    dislike: [];
  };
  userId: string;
}
export default function DisLikeBtn({
  datas,
  userId,
  fetchProduct,
}: LikeBtnProps) {
  const [loading, setLoading] = useState<Boolean>(false);

  const HandleDisLikeClick = async (productId: string) => {
    if (!userId) {
      return toast.success("Login is Required.");
    }
    setLoading(true);
    try {
      const response = await axios.put(`/api/product?dislike=dislike`, {
        productId,
        userId,
      });
      if (response.data.statusbar === 200) {
        toast.success(response.data.message);
        fetchProduct(); // Assuming fetchProduct is a function passed as a prop
      } else {
        toast.error(response.data.message);
        fetchProduct(); // Assuming fetchProduct is a function passed as a prop
      }
    } catch (error) {
      console.error("Error dis liking product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={() => HandleDisLikeClick(datas._id)}
      className="button_outline px-4"
      title="dislike button for vote product"

    >
      {loading ? <Processing /> : <FaRegThumbsDown className="mr-2" />}
      {datas.dislike.length}{" "}
    </Button>
  );
}
