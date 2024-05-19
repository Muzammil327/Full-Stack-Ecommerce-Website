"use client";
import React, { useEffect, useState } from "react";

import StoreCatgeory from "@/src/components/Store/StoreCatgeory";
import StoreSubCatgeory from "@/src/components/Store/StoreSubCatgeory";
import StorePrice from "@/src/components/Store/StorePrice";
import StoreTags from "@/src/components/Store/StoreTags";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import StoreSort from "@/src/components/Store/StoreSort";
import StorePagination from "@/src/components/Store/StorePagination";
import StoreProducts from "@/src/components/Store/StoreProducts";
import { FaXmark } from "react-icons/fa6";

import { Product_API_Endpoint } from "@/src/utils/constant";
import Container from "@/src/components/ui/Container";
import axios from "axios";

export default function StorePage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [priceHL, setPriceHL] = useState<string>("");
  const [priceLH, setPriceLH] = useState<string>("");

  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${Product_API_Endpoint}/get?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError("Error Store PRODUCTS");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [
    category,
    highPrice,
    lowPrice,
    page,
    priceHL,
    priceLH,
    subCategory,
    tags,
  ]);

  const HighPrice = (value: number) => {
    setHighPrice(value);
    setPage(1);
  };
  const LowPrice = (value: number) => {
    setLowPrice(value);
    setPage(1);
  };
  const SortPriceLH = (value: string) => {
    setPriceLH(value);
    setPage(1);
  };
  const SortPriceHL = (value: string) => {
    setPriceHL(value);
    setPage(1);
  };

  return (
    <Container>
      {error && <h1>Error fetching Store data...</h1>}
      <section className="flex items-baseline justify-between border-b border-gray-200 py-3">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight text-gray-900">
          SMI Store
        </h1>

        <StoreSort
          filterItemsLH={SortPriceLH}
          filterItemsHL={SortPriceHL}
          setPage={setPage}
          setCategory={setCategory}
          setSubCategory={setSubCategory}
          setTags={setTags}
          setHighPrice={setHighPrice}
          setLowPrice={setLowPrice}
        />
      </section>

      <section className="pb-24 pt-4">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            <StoreCatgeory
              filterItem={(value: string) => {
                setCategory(value.toLowerCase());
                setPage(1);
              }}
            />
            <StoreSubCatgeory
              filterItem={(value: string) => {
                setSubCategory(value.toLowerCase());
                setPage(1);
              }}
            />
            <StorePrice
              filterItem={(lowPrice: number, highPrice: number) => {
                LowPrice(lowPrice);
                HighPrice(highPrice);
              }}
            />
            <StoreTags
              filterItem={(value: string) => {
                setTags(value.toLowerCase());
                setPage(1);
              }}
            />
          </div>

          <div className="lg:col-span-3">
            <ul className="flex items-center gap-3">
              <li className="border text-black rounded py-1 px-2">
                page {page}
              </li>
              {category ? (
                <li className="border text-black rounded py-1 px-2 flex items-center justify-between">
                  {category}
                  <button
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black ml-4"
                    onClick={() => setCategory("")}
                  >
                    <FaXmark />
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
                    <FaXmark />
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
                    <FaXmark />
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
                    <FaXmark />
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
                    <FaXmark />
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
                    <FaXmark />
                  </button>{" "}
                </li>
              ) : null}
            </ul>
            {loading ? (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
                  <StoreProducts data={data} />
                </div>
                <StorePagination setPage={setPage} data={data} />
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
