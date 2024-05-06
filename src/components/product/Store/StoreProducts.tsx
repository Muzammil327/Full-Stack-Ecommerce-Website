import React from "react";
import ProductCard from "@/src/components/product/card/page";
import { ProductCardProps } from "@/src/types/product";
import CrossSVG from "@/src/svg/CrossSVG";

interface StoreProductsProps {
  data: any;
  page: number;
  category: string;
  setCategory: (category: string) => void;
  subCategory: string;
  setSubCategory: (subCategory: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  highPrice: number | null;
  setHighPrice: (price: number | null) => void;
  lowPrice: number | null;
  setLowPrice: (price: number | null) => void;
  priceLH: string;
  setPriceLH: (priceLH: string) => void;
  priceHL: string;
  setPriceHL: (priceHL: string) => void;
}

export default function StoreProducts({
  data,
  page,
  // catgeory
  category,
  setCategory,
  // sub catgeory
  subCategory,
  setSubCategory,
  // tags
  tags,
  setTags,
  // high price
  highPrice,
  setHighPrice,
  // low price
  lowPrice,
  setLowPrice,
  // price low to high
  priceLH,
  setPriceLH,
  // price high to low
  priceHL,
  setPriceHL,
}: StoreProductsProps) {
  console.log(data);
  return (
    <>
      <ul className="flex items-center gap-3">
        <li className="border text-black rounded py-1 px-2">page {page}</li>
        {category ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            {category}
            <button
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
              onClick={() => setCategory("")}
            >
              <CrossSVG />
            </button>
          </li>
        ) : null}
        {subCategory ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            {subCategory}
            <button
              onClick={() => setSubCategory("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              <CrossSVG />
            </button>{" "}
          </li>
        ) : null}
        {highPrice && lowPrice ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            {lowPrice} - {highPrice}
            <button
              onClick={() => {
                setLowPrice(null);
                setHighPrice(null);
              }}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              <CrossSVG />
            </button>
          </li>
        ) : null}
        {tags ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            {tags}
            <button
              onClick={() => setTags("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              <CrossSVG />
            </button>{" "}
          </li>
        ) : null}
        {priceLH ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            Price Low to High
            <button
              onClick={() => setPriceLH("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              <CrossSVG />
            </button>{" "}
          </li>
        ) : null}
        {priceHL ? (
          <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
            Price High to Low
            <button
              onClick={() => setPriceHL("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              <CrossSVG />
            </button>{" "}
          </li>
        ) : null}
      </ul>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
        {data.products.map((product: ProductCardProps) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
