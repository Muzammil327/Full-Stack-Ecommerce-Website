"use client";
import { toast } from "react-toastify";
import ReviewsForm from "./ReviewsForm";
import axios from "axios";
import Button from "@/src/components/ui/Button";
import { FormEvent, useState } from "react";

export default function ReviewsSubmit({
  userId,
  fetchReview,
  productId,
}: {
  userId: string;
  fetchReview: any;
  productId: any;
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loadings, setLoading] = useState<boolean>(false);

  const handleRating = (rate: any) => {
    setRating(rate);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) {
        toast.warning("Please Login");
      }
      const response = await axios.post(`/api/review`, {
        rating,
        text,
        userId,
        productId,
      });
      if (response.data.statusbar === 200) {
        setRating(0);
        setText("");
        fetchReview();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.warning("Some Field Empty");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <ReviewsForm
        text={text}
        setText={setText}
        rating={rating}
        handleRating={handleRating}
      />

      <Button className="w-full button_bg">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
