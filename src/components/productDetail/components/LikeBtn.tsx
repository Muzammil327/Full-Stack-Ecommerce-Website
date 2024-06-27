import React from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { FaRegThumbsUp } from "react-icons/fa";

interface LikeBtnProps {
  fetchProduct: () => void;
  datas: {
    _id: string;
    like: [];
  };
}
export default function LikeBtn({ fetchProduct, datas }: LikeBtnProps) {

  const HandleLikeClick = (productId: string) => {
    // if (!session) {
    //   return toast.error("Please Login");
    // }
    // HandleLike(productId, fetchProduct, userId);
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
