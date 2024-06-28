import React from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { FaRegThumbsUp } from "react-icons/fa";
import axios from "axios";

interface LikeBtnProps {
  fetchProduct: () => void;
  datas: {
    _id: string;
    like: [];
  };
  userId: string;
}

export default function LikeBtn({ fetchProduct, datas, userId }: LikeBtnProps) {
  const HandleLikeClick = async (productId: string) => {
    if (!userId) {
      return toast.success("Login is Required.");
    }
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
    }
  };
  return (
    <Button
      onClick={() => HandleLikeClick(datas._id)}
      className="btnIcon_outline"
    >
      <FaRegThumbsUp className="mr-2" /> {datas.like.length}{" "}
    </Button>
  );
}
