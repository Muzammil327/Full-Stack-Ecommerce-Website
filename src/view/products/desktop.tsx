"use client";
import { useState } from "react";
import StoreCatgeory from "./catgeory";
import StoreSubCatgeory from "./subCatgeory";
import StorePrice from "./price";
import StoreSort from "./sort";
import ProductsStore from "./productsStore";
import Pagination from "./pagination";
import LoadingProduct from "./loading";
import StoreTags from "./tags";

export default function DesktopStore({
  data,
  loading,
  setPage,
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
  const Catgeory = (value: string) => {
    setCategory(value.toLowerCase());
    setPage(1);
  };
  const Tags = (value: string) => {
    setTags(value.toLowerCase());
    setPage(1);
  };
  const SubCatgeory = (value: string) => {
    setSubCategory(value.toLowerCase());
    setPage(1);
  };
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
    <div>
      <div className="flex items-baseline justify-between border-b border-gray-200 py-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Product Store
        </h1>

        <StoreSort filteritemsLH={SortPriceLH} filteritemsHL={SortPriceHL} />
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-4">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            <StoreCatgeory filterItem={Catgeory} />
            <StoreSubCatgeory filterItem={SubCatgeory} />
            <StorePrice
              filterItem={(lowPrice: number, highPrice: number) => {
                LowPrice(lowPrice);
                HighPrice(highPrice);
              }}
            />
            <StoreTags filterItem={Tags} />
          </form>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-4 mx-4 mt-5">
                <LoadingProduct />
                <LoadingProduct />
                <LoadingProduct />
              </div>
            ) : (
              <>
                <ProductsStore
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
                  // low price
                  lowPrice={lowPrice}
                  setSelectedLowPrice={setLowPrice}
                  // price low to high
                  priceLH={priceLH}
                  setPriceLH={setPriceLH}
                  // price high to low
                  priceHL={priceHL}
                  setPriceHL={setPriceHL}
                />
                <Pagination setPage={setPage} data={data} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
