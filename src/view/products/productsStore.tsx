import ProductCard from "@/src/components/product/card/page";
import React from "react";

export default function ProductsStore({
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
}: any) {
  return (
    <>
      <ul className="flex items-center gap-3">
        <li className="bg-red-400 text-white rounded py-1 px-2">page {page}</li>
        {category ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            {category}
            <button
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
              onClick={() => setCategory("")}
            >
              x
            </button>
          </li>
        ) : null}
        {subCategory ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            {subCategory}
            <button
              onClick={() => setSubCategory("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              x
            </button>{" "}
          </li>
        ) : null}
        {tags ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            {tags}
            <button
              onClick={() => setTags("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              x
            </button>{" "}
          </li>
        ) : null}
        {priceLH ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            Price Low to High
            <button
              onClick={() => setPriceLH("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              x
            </button>{" "}
          </li>
        ) : null}
        {priceHL ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            Price High to Low
            <button
              onClick={() => setPriceHL("")}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              x
            </button>{" "}
          </li>
        ) : null}
        {highPrice && lowPrice ? (
          <li className="bg-red-400 text-white rounded py-1 px-2 flex items-center justify-between">
            {lowPrice} - {highPrice}
            <button
              onClick={() => setLowPrice()}
              className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
            >
              x
            </button>{" "}
          </li>
        ) : null}
      </ul>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
        {data.products.map((data: any) => {
          return <ProductCard product={data} key={data._id} />;
        })}
      </div>
    </>
  );
}
