"use client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { FaTimes } from "react-icons/fa";
import Button from "../../../ui/Button";
import Dialogs from "../../../ui/Dialogs";
import ReviewsSubmit from "./ReviewsSubmit";
import Image from "next/image";

interface ReviewData {
  _id: string;
  rating: number;
  text: string;
  user_detail: { _id: string; username: string; image: string };
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}

export default function ReviewView(data: {
  productId: any;
  setReviewsFetched: any;
}) {
  const { data: session } = useSession();
  const userId = session?.user?._id as string;
  const productId = data?.productId?._id as string;

  // ---------------------- Handle Product DELETE DATA ----------------------
  const HandleDeleteComment = async (productId: string) => {
    const response = await axios.delete(`/api/review?productId=${productId}`);
    if (response.data.statusbar === 200) {
      fetchReview();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  // ---------------------- Handle Product GET DATA ----------------------
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [fetchReviewData, setFetchReviewData] = useState<ReviewData[]>([]);
  const [page, setPage] = useState(1);
  let limit = 3;
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchReview = useCallback(async () => {
    setLoadingData(true);

    try {
      const response = await axios.get<{
        get_user_review: ReviewData[];
        pagination: PaginationData;
      }>(`/api/review?productId=${productId}&page=${page}&limit=${limit}`);
      if (page === 1) {
        setFetchReviewData(response.data.get_user_review);
      } else {
        setFetchReviewData((prevData) => [
          ...prevData,
          ...response.data.get_user_review,
        ]);
      }
      setPagination(response.data.pagination);
    } catch (error) {
      console.log("Error During Fetch Review :", error);
    } finally {
      setLoadingData(false);
    }
  }, [productId, limit, page]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return (
    <section className="grid md:grid-cols-2 md:gap-4 mt-5">
      <div className="post mt-5">
        <ReviewsSubmit
          fetchReview={fetchReview}
          userId={userId}
          productId={productId}
        />
      </div>

      <div className="get">
        {loadingData && page === 1 ? (
          <>
            <div className="relative border shadow rounded-md px-2  w-full my-2 flex items-center gap-4">
              <div className="h-12 bg-slate-700 rounded w-16 my-2"></div>
              <div className="animate-pulse flex w-full py-4 flex-col">
                <div className="h-5 bg-slate-700 rounded w-9/12 mt-1"></div>
                <div className="h-5 bg-slate-700 rounded w-6/12 mt-1"></div>
              </div>
            </div>{" "}
            <div className="relative border shadow rounded-md px-2  w-full my-2 flex items-center gap-4">
              <div className="h-12 bg-slate-700 rounded w-16 my-2"></div>
              <div className="animate-pulse flex w-full py-4 flex-col">
                <div className="h-5 bg-slate-700 rounded w-9/12 mt-1"></div>
                <div className="h-5 bg-slate-700 rounded w-6/12 mt-1"></div>
              </div>
            </div>{" "}
            <div className="relative border shadow rounded-md px-2  w-full my-2 flex items-center gap-4">
              <div className="h-12 bg-slate-700 rounded w-16 my-2"></div>
              <div className="animate-pulse flex w-full py-4 flex-col">
                <div className="h-5 bg-slate-700 rounded w-9/12 mt-1"></div>
                <div className="h-5 bg-slate-700 rounded w-6/12 mt-1"></div>
              </div>
            </div>
          </>
        ) : fetchReviewData.length === 0 ? (
          <span>No Review</span>
        ) : (
          fetchReviewData.map((data) => (
            <>
              <div
                key={data._id}
                className="flex items-center gap-x-10 md:mt-0 mt-8 mb-4 relative"
              >
                <div className="image md:h-16 h-12 md:w-16 w-12">
                  {data.user_detail && (
                    <Image
                      src={
                        data.user_detail.image
                          ? `${process.env.NEXT_PUBLIC_BACKENDAPI}/public/user_image/${data.user_detail.image}`
                          : "/hero_img.jpg"
                      }
                      alt="User Image"
                      className="text-center md:h-16 h-12 md:w-16 w-12 rounded-md"
                      height={100}
                      width={100}
                    />
                  )}
                </div>
                <div className="body">
                  <div className="top flex items-center justify-between">
                    <div className="name">
                      <span>{data.user_detail.username}</span>
                    </div>
                    <div className="rating ml-8">
                      <Rate value={data.rating} disabled />
                    </div>
                  </div>
                  <div className="rating">
                    <p>{data.text}</p>
                  </div>
                  {userId === data.user_detail._id && (
                    <div className="flex items-center gap-3 absolute top-0 right-0">
                      <Dialogs
                        className="btnIcon_outline_2 p-1"
                        title="Delete Comment."
                        description="This will permanently delete your Comment from this product."
                        para="Are you sure you want to delete your Comment?"
                        onClick={() => HandleDeleteComment(data._id)}
                        delete
                      >
                        <FaTimes />
                      </Dialogs>
                    </div>
                  )}
                </div>
              </div>
            </>
          ))
        )}

        {pagination && page < pagination.totalPages && (
          <Button onClick={handleLoadMore} className="w-full button_solid" title="review load more">
            {loadingData ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </section>
  );
}
