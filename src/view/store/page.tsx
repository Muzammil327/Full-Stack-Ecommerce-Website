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
import CrossSVG from "@/src/svg/CrossSVG";
import { Product_API_Endpoint } from "@/src/utils/constant";
import styles from "@/view/store/store.module.scss";

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
    `${Product_API_Endpoint}/get?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
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
      {error && <h1>Error fetching Store data...</h1>}
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
            <ul className="flex items-center gap-3">
              <li className="border text-black rounded py-1 px-2">
                page {page}
              </li>
              {category ? (
                <li className={styles.li}>
                  {category}
                  <button
                    className={styles.btn}
                    onClick={() => setCategory("")}
                  >
                    <CrossSVG />
                  </button>
                </li>
              ) : null}
              {subCategory ? (
                <li className={styles.li}>
                  {subCategory}
                  <button
                    onClick={() => setSubCategory("")}
                    className={styles.btn}
                  >
                    <CrossSVG />
                  </button>{" "}
                </li>
              ) : null}
              {highPrice && lowPrice ? (
                <li className={styles.li}>
                  {lowPrice} - {highPrice}
                  <button
                    onClick={() => {
                      setLowPrice(null);
                      setHighPrice(null);
                    }}
                    className={styles.btn}
                  >
                    <CrossSVG />
                  </button>
                </li>
              ) : null}
              {tags ? (
                <li className={styles.li}>
                  {tags}
                  <button onClick={() => setTags("")} className={styles.btn}>
                    <CrossSVG />
                  </button>{" "}
                </li>
              ) : null}
              {priceLH ? (
                <li className={styles.li}>
                  Price Low to High
                  <button onClick={() => setPriceLH("")} className={styles.btn}>
                    <CrossSVG />
                  </button>{" "}
                </li>
              ) : null}
              {priceHL ? (
                <li className={styles.li}>
                  Price High to Low
                  <button onClick={() => setPriceHL("")} className={styles.btn}>
                    <CrossSVG />
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
                <StoreProducts data={data} />
                <StorePagination setPage={setPage} data={data} />
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
