"use client";
import Container from "@/src/components/element/container/page";
import React from "react";

import ProductImage from "./Image";
import Cat from "./cat";
import ShareButton from "./ShareButton";
import FavouriteBtn from "./FavouriteBtn";
import AddtoCartBtn from "./AddtoCartBtn";
import SimilarProduct from "./SimilarProduct";
import Tabs from "./Tabs";
import UserAction from "./UserAction";
import Button from "@/src/components/element/button";

function ProductDetails() {
  return (
    <>
      <Container>
        <div className="grid md:grid-cols-2 grid-cols-1 my-8 gap-5">
          <div className="">
            <ProductImage />
          </div>

          <div className="py-12">
            <Cat />
            <h1 className="text-3xl font-bold my-4">
              One Shoulder Glitter Midi Dress
            </h1>
            <div className="price flex gap-4">
              <span className="line-through font-semibold text-xl text-gray-700">
                {" "}
                $65.00
              </span>
              <span className="font-semibold text-red-500 text-2xl">
                {" "}
                $49.00
              </span>
            </div>
            <p className="mt-4 mb-12 text-base text-gray-500">
              Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla
              ante. Aenean finibus velit id urna vehicula, nec maximus est
              sollicitudin.
            </p>
            <div>
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
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>

              <fieldset className="mt-4">
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
              </fieldset>
              <div className=" my-5 flex items-center justify-between gap-4">
                <AddtoCartBtn />
                <FavouriteBtn />
              </div>
              <ShareButton />
            </div>
          </div>
        </div>
        <Tabs />
        <SimilarProduct />
      </Container>
    </>
  );
}
export default ProductDetails;
