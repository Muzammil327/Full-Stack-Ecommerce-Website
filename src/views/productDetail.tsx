"use client";
import React, { useCallback, useEffect, useState } from "react";

import ProductDetailImageSlider from "@/src/components/productDetail/ImageSlider";
import ProductDetailCatgeory from "@/src/components/productDetail/catgeory";
import AddtoCartBtn from "@/src/components/productDetail/AddtoCartBtn";
import FavouriteBtn from "@/src/components/productDetail/FavouriteBtn";
import RelatedProduct from "@/src/components/productDetail/RelatedProduct";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ProductData } from "@/src/types/product";

import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { Product_GET_BYSLUG, Product_PUT_DISLIKE, Product_PUT_LIKE } from "@/src/utils/constant";
import Container from "../components/ui/Container";
import axios from "axios";
import { useAuth } from "../components/contexts/authContext";
import ShareButton from "../components/productDetail/shareButton";

export default function ProductDetail({ params }: { params: string }) {
  const [data, setData] = useState<ProductData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user, session } = useAuth();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Product_GET_BYSLUG}/${params}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError("Error Store PRODUCTS");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, params]);

  const HandleLike = async (productId: string) => {
    if (!session) {
      return toast.error("Please Login");
    }
    try {
      await axios.put(`${Product_PUT_LIKE}/${productId}`, {
        user,
      });
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };
  const HandleDisLike = async (productId: string) => {
    if (!session) {
      return toast.error("Please Login");
    }
    try {
      await axios.put(`${Product_PUT_DISLIKE}/${productId}`, {
        user,
      });
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <h1>Error fetching Product Detail data...</h1>}

      {loading ? (
        <div className="relative border rounded-md p-2">
          <Container>
            <div className="grid md:grid-cols-2 grid-cols-1 my-8 gap-5 animate-pulse">
              <div className="w-full aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <div className=" rounded "></div>
              </div>
              <div className="py-12">
                <div className="flex items-center gap-3">
                  <div className="h-6 bg-slate-700 rounded w-2/12"></div>
                  <div className="h-6 bg-slate-700 rounded w-2/12"></div>
                  <div className="h-6 bg-slate-700 rounded w-2/12"></div>
                </div>
                <div className="h-12 bg-slate-700 rounded w-full my-4"></div>
                <div className="flex items-center gap-4">
                  <div className="h-6 bg-slate-700 rounded w-3/12"></div>
                  <div className="h-6 bg-slate-700 rounded w-3/12"></div>
                </div>
                <div className="h-52 bg-slate-700 rounded w-full mt-4 mb-12"></div>
                <div className="my-5 flex items-center justify-between gap-4">
                  <div className="bg-slate-700 h-12 transition-all w-full py-3 block px-6 rounded-md"></div>
                  <div className="bg-slate-700 h-12 transition-all py-3 px-8 rounded-md"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <>
          <section>
            {data && (
              <Container>
                <div className="grid md:grid-cols-2 grid-cols-1 my-8 gap-5">
                  <ProductDetailImageSlider response={data} />

                  <div className="lg:py-12 md:py-8 py-4">
                    <ProductDetailCatgeory
                      catgeory={data.category}
                      subCateory={data.subCategory}
                    />
                    <h1 className="text-3xl font-bold my-4">{data.name}</h1>
                    <div className="price flex gap-4 items-center">
                      <span className="line-through font-semibold text-xl text-gray-700">
                        Rs{data.price}.00
                      </span>
                      <span className="font-semibold text-red-500 text-2xl">
                        $49.00
                      </span>
                    </div>
                    <p className="mt-4 mb-6 text-base text-gray-500">
                      {data.description}
                    </p>

                    <div className="mt-10">
                      <div className=" my-5 flex items-center justify-between">
                        <AddtoCartBtn product={data._id} />
                      </div>
                      <div className=" my-5 flex items-center justify-between gap-4">
                        <FavouriteBtn product={data._id} />
                        <button
                          onClick={() => HandleLike(data._id)}
                          className="bg-red-400 hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white block border-2 border-solid border-red-400 w-full"
                        >
                          <span className="flex items-center justify-center gap-3">
                            <FaRegThumbsUp size={24} /> {data.like.length}{" "}
                          </span>
                        </button>
                        <button
                          onClick={() => HandleDisLike(data._id)}
                          className="bg-red-400 block hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white border-2 border-solid border-red-400 w-full"
                        >
                          <span className="flex items-center justify-center gap-3">
                            <FaRegThumbsDown size={24} /> {data.dislike.length}
                          </span>
                        </button>

                        <ShareButton />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Tabs /> */}
                <RelatedProduct relatedProducts={data} />
              </Container>
            )}
          </section>
        </>
      )}
    </>
  );
}
{
  /* <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Size</h4>
                  <Link
                    href="/"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </Link>
                </div> */
}

{
  /* <fieldset className="mt-4">
                  <legend className="sr-only">Choose a size</legend>
                  <div className="grid grid-cols-4 gap-4">
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XXS"
                        className="sr-only"
                        aria-labelledby="size-choice-0-label"
                      />
                      <span id="size-choice-0-label">XXS</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XS"
                        className="sr-only"
                        aria-labelledby="size-choice-1-label"
                      />
                      <span id="size-choice-1-label">XS</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="S"
                        className="sr-only"
                        aria-labelledby="size-choice-2-label"
                      />
                      <span id="size-choice-2-label">S</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="M"
                        className="sr-only"
                        aria-labelledby="size-choice-3-label"
                      />
                      <span id="size-choice-3-label">M</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="L"
                        className="sr-only"
                        aria-labelledby="size-choice-4-label"
                      />
                      <span id="size-choice-4-label">L</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XL"
                        className="sr-only"
                        aria-labelledby="size-choice-5-label"
                      />
                      <span id="size-choice-5-label">XL</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XXL"
                        className="sr-only"
                        aria-labelledby="size-choice-6-label"
                      />
                      <span id="size-choice-6-label">XXL</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-not-allowed bg-gray-50 text-gray-200">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XXXL"
                        disabled
                        className="sr-only"
                        aria-labelledby="size-choice-7-label"
                      />
                      <span id="size-choice-7-label">XXXL</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line
                            x1="0"
                            y1="100"
                            x2="100"
                            y2="0"
                            vector-effect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </fieldset> */
}
{
  /* <div>
                <h4 className="text-sm font-medium text-gray-900">Color</h4>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose a color</legend>
                  <span className="flex items-center space-x-3">
                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                      <input
                        type="radio"
                        name="color-choice"
                        value="White"
                        className="sr-only"
                        aria-labelledby="color-choice-0-label"
                      />
                      <span id="color-choice-0-label" className="sr-only">
                        White
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"
                      ></span>
                    </label>

                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                      <input
                        type="radio"
                        name="color-choice"
                        value="Gray"
                        className="sr-only"
                        aria-labelledby="color-choice-1-label"
                      />
                      <span id="color-choice-1-label" className="sr-only">
                        Gray
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                      ></span>
                    </label>

                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                      <input
                        type="radio"
                        name="color-choice"
                        value="Black"
                        className="sr-only"
                        aria-labelledby="color-choice-2-label"
                      />
                      <span id="color-choice-2-label" className="sr-only">
                        Black
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"
                      ></span>
                    </label>
                  </span>
                </fieldset>
              </div> */
}
