import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { FaRegThumbsUp } from "react-icons/fa";
import axios from "axios";
import Processing from "../../ui/Loading/Processing";

interface LikeBtnProps {
  fetchProduct: () => void;
  datas: {
    _id: string;
    like: [];
  };
  userId: string;
}

export default function LikeBtn({ fetchProduct, datas, userId }: LikeBtnProps) {
  const [loading, setLoading] = useState<Boolean>(false);

  const HandleLikeClick = async (productId: string) => {
    if (!userId) {
      return toast.success("Login is Required.");
    }
    setLoading(true);
    try {
      const response = await axios.put(`/api/product?like=like`, {
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
      console.error("Error liking product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={() => HandleLikeClick(datas._id)}
      className="flex items-center justify-center w-full"
      variant="outline"
      title="like button for vote product"
    >
      {loading ? <Processing /> : <FaRegThumbsUp className="mr-2" />}
      {datas.like.length}
    </Button>
  );
}
