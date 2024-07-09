"use client";
import React, { useCallback, useEffect, useState } from "react";

import ProductDetailImageSlider from "@/src/components/productDetail/components/ImageSlider";
import ProductDetailCatgeory from "@/src/components/productDetail/components/catgeory";
import AddtoCartBtn from "@/src/components/productDetail/components/AddtoCartBtn";
import FavouriteBtn from "@/src/components/productDetail/components/FavouriteBtn";
import RelatedProduct from "@/src/components/productDetail/components/RelatedProduct";

import { Container } from "@/src/components/ui/ui";
import axios from "axios";
import ShareButton from "@/src/components/productDetail/components/shareButton";
import ProductDetailTab from "@/src/components/productDetail/components/Tabs";
import LikeBtn from "@/src/components/productDetail/components/LikeBtn";
import DisLikeBtn from "@/src/components/productDetail/components/DisLikeBtn";
import { FcPaid } from "react-icons/fc";

export interface ProductCardData {
  _id: string;
  name: string;
  Sdescription: string;
  Ldescription: string;
  slug: string;
  category: string;
  subCategory: string;
  items: string;
  price: number;
  discountprice?: number;
  quantity: number;
  image: string;
  slider: [];
  keywords: [];
  size: [];
  productId: [];
  like: [];
  dislike: [];
  reviews: [];
}

export default function ProductDetail({
  params,
  userId,
}: {
  params: string;
  userId: string;
}) {
  const [data, setData] = useState<ProductCardData>();
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (e: any) => {
    setSelectedSize(e.target.value);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const price = data?.price ?? 0; // Provide a default value of 0 if data.price is undefined
  const actualPrice = Math.round(price * 1.45); // Calculate 15% of the price and round it

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/${params}`);
      setData(response.data.singleProduct);
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

  return (
    <>
      {error && <h1>Error fetching Product Detail data...</h1>}

      {loading ? (
        <div className="relative border rounded-md">
          <Container>
            <div className="grid lg:grid-cols-9 grid-cols-1 my-8 md:gap-5 gap-4 animate-pulse">
              {/* image  */}
              <div className="lg:col-span-3 w-full md:h-[500px] h-[400px] aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <div className="rounded"></div>
              </div>
              <div className="lg:col-span-4 lg:py-8 md:py-4 py-2">
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
                <div className="h-40 bg-slate-700 rounded w-full mt-4 mb-4"></div>
                <div className="h-12 bg-slate-700 rounded w-full mt-4 mb-4"></div>
                <div className="my-5 flex items-center justify-between gap-4">
                  <div className="bg-slate-700 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 h-12 transition-all py-3 px-6 rounded-md"></div>
                </div>
              </div>
              <div className="lg:col-span-2 bg-gray-200 px-2">
                <div className="h-9 bg-slate-700 rounded w-full my-3"></div>
                <div className="h-9 bg-slate-700 rounded w-full my-3"></div>
                <div className="h-9 bg-slate-700 rounded w-full my-3"></div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <>
          <section>
            {data && (
              <Container>
                <div className="grid lg:grid-cols-9 grid-cols-1 my-8 md:gap-5 gap-4">
                  {/* -------------------------- Product Image Slider -------------------------- */}
                  <div className="slider lg:col-span-3">
                    <ProductDetailImageSlider data={data} />
                  </div>

                  <div className="lg:col-span-4">
                    {/* -------------------------- Catgeory -------------------------- */}
                    <ProductDetailCatgeory data={data} />

                    {/* -------------------------- Product Name -------------------------- */}
                    <h1 className="md:text-2xl text-xl font-bold my-4">
                      {data.name}
                    </h1>

                    {/* -------------------------- Product Price -------------------------- */}
                    <div className="price flex gap-4 items-center">
                      <span className="line-through font-semibold text-xl text-gray-700">
                        Rs{actualPrice}.00
                      </span>
                      <span className="font-semibold text-indigo-500 text-2xl">
                        Rs{data.price}.00
                      </span>
                    </div>

                    {/* -------------------------- Product Short Description -------------------------- */}
                    <p className="my-3 sm:text-base text-sm text-gray-500">
                      {data.Sdescription}
                    </p>

                    {/* ------------- Size ------------- */}
                    {data.items === "shoes" && (
                      <>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                          {data.size.map((data, index) => {
                            return (
                              <label
                                key={index}
                                className={`group relative flex cursor-pointer items-center justify-center rounded-md border ${
                                  selectedSize === data
                                    ? "border-indigo-500"
                                    : "border-2"
                                } bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1`}
                              >
                                <input
                                  type="radio"
                                  name="size-choice"
                                  value={data}
                                  onChange={handleSizeChange}
                                  className="sr-only"
                                />
                                <span>{data}</span>
                                <span
                                  className="pointer-events-none absolute -inset-px rounded-md"
                                  aria-hidden="true"
                                ></span>
                              </label>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* ------------- Product Button ------------- */}
                    <div className="mt-3 max-w-full flex flex-wrap md:gap-3 gap-2 flex-col">
                      <div className="w-full">
                        <AddtoCartBtn
                          product={data._id}
                          userId={userId}
                          size={selectedSize}
                          data={data}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {/* favourite button  */}
                        <FavouriteBtn product={data._id} userId={userId} />

                        {/* like button  */}
                        <LikeBtn
                          fetchProduct={fetchProduct}
                          datas={data}
                          userId={userId}
                        />

                        {/* dislike button  */}
                        <DisLikeBtn
                          fetchProduct={fetchProduct}
                          datas={data}
                          userId={userId}
                        />

                        {/* shared button  */}
                        <ShareButton urlCurrentPage={params} />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 bg-slate-50 py-4">
                    <div className="return flex items-center px-2">
                      <span className="text-gray-500">
                        <FcPaid />
                      </span>
                      <span className="ml-4 text-xs">
                        Cash on Delivery Available
                      </span>
                    </div>
                    <hr className="my-3" />
                  </div>
                </div>

                {/* Tabs  */}
                <ProductDetailTab data={data} />

                {/* Related Products  */}
                <h1 className="text-2xl font-semibold my-12">
                  Similar Products
                </h1>
                <RelatedProduct relatedProducts={data} />
              </Container>
            )}
          </section>
        </>
      )}
    </>
  );
}
