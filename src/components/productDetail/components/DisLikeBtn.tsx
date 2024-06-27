import React from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { FaRegThumbsDown } from "react-icons/fa";

interface LikeBtnProps {
  datas: {
    _id: string;
    dislike: [];
  };
}
export default function DisLikeBtn({ datas }: LikeBtnProps) {

  const HandleDisLikeClick = async (productId: string) => {
    // if (!session) {
    //   return toast.error("Please Login");
    // }
  };
  return (
    <Button
      onClick={() => HandleDisLikeClick(datas._id)}
      className="btnIcon_outline"
    >
      <FaRegThumbsDown className="mr-2" /> {datas.dislike.length}{" "}
    </Button>
  );
}
