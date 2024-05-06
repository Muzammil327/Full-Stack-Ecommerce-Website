"use client";
import React, { useState } from "react";
import Container from "@/components/element/container/page";
import { useFetchArray } from "@/src/components/function/useFetchArray";

import StoreCatgeory from "@/src/components/product/Store/StoreCatgeory";
import StoreSubCatgeory from "@/src/components/product/Store/StoreSubCatgeory";
import StorePrice from "@/src/components/product/Store/StorePrice";
import StoreTags from "@/src/components/product/Store/StoreTags";
import LoadingProductCard from "@/src/components/element/Loading/LoadingProductCard";
import StoreSort from "@/src/components/product/Store/StoreSort";
import StorePagination from "@/src/components/product/Store/StorePagination";
import StoreProducts from "@/src/components/product/Store/StoreProducts";

import { ProductShopProps } from "@/src/types/product";

export default function StorePage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [priceHL, setPriceHL] = useState<string>("");
  const [priceLH, setPriceLH] = useState<string>("");

  const { data, error, loading } = useFetchArray<ProductShopProps>(
    `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/get/product?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
  );
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
      {error && <h1>Error fetching data...</h1>}
      <section className="flex items-baseline justify-between border-b border-gray-200 py-3">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight text-gray-900">
          Product Store
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
            {loading ? (
              <div className="grid md:grid-cols-3 gap-4 mx-4 mt-5">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
              </div>
            ) : (
              <>
                <StoreProducts
                  data={data}
                  page={page}
                  // catgeory
                  category={category}
                  setCategory={setCategory}
                  // sub catgeory
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  // tags
                  tags={tags}
                  setTags={setTags}
                  // high price
                  highPrice={highPrice}
                  setHighPrice={setHighPrice}
                  // low price
                  lowPrice={lowPrice}
                  setLowPrice={setLowPrice}
                  // price low to high
                  priceLH={priceLH}
                  setPriceLH={setPriceLH}
                  // price high to low
                  priceHL={priceHL}
                  setPriceHL={setPriceHL}
                />
                <StorePagination setPage={setPage} data={data} />
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
