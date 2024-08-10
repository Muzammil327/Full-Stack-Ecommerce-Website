"use client";
import StoreCatgeory from "@/src/components/store/components/StoreCatgeory";
import StoreSubCatgeory from "@/src/components/store/components/StoreSubCatgeory";
import StorePrice from "@/src/components/store/components/StorePrice";
import StoreTags from "@/src/components/store/components/StoreTags";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import StoreSort from "@/src/components/store/components/StoreSort";
import { FaXmark } from "react-icons/fa6";

import Container from "@/src/components/ui/Container";
import { useProductCard } from "../context/productCard";
import { Button } from "../ui/ui";
import ProductCard from "../elements/ProductCard/page";
import { useState } from "react";

export default function StorePage({ userId }: any) {
  const [catShow, setCatShow] = useState<string>("");
  const [subCatShow, setSubCatShow] = useState<string>("");
  const [tagShow, setTagShow] = useState<string>("");
  const {
    error,
    loading,
    products,
    page,
    setPage,
    setHighPrice,
    setLowPrice,
    setPriceHL,
    setPriceLH,
    category,
    subCategory,
    setCategory,
    pagination,
    setSubCategory,
    setTags,
    highPrice,
    lowPrice,
    tags,
    priceLH,
    priceHL,
  } = useProductCard();

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
  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prevPage: any) => prevPage + 1);
    }
  };
  return (
    <Container>
      {error && <h1>Error fetching Store data...</h1>}
      <section className="flex items-baseline justify-between border-b border-gray-200 py-3">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight text-gray-900">
          SMI Shop Mart
        </h1>

        <StoreSort
          filterItemsLH={SortPriceLH}
          filterItemsHL={SortPriceHL}
          setPage={setPage}
          setCategory={setCategory}
          category={category}
          setSubCategory={setSubCategory}
          subCategory={subCategory}
          tags={tags}
          setTags={setTags}
          setHighPrice={setHighPrice}
          setLowPrice={setLowPrice}
          setCatShow={setCatShow}
          setSubCatShow={setSubCatShow}
        />
      </section>

      <section className="pb-24 pt-4">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <aside className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            <StoreCatgeory
              filterItem={(value: string, _id: string) => {
                setCategory(_id);
                setCatShow(value.toLowerCase());
                setPage(1);
              }}
            />
            <StoreSubCatgeory
              filterItem={(value: string, _id: string) => {
                setSubCategory(_id);
                setSubCatShow(value.toLowerCase());
                setPage(1);
              }}
              catgeorySet={category}
            />

            <StoreTags
              filterItem={(value: string, _id: string) => {
                setTags(_id);
                setTagShow(value.toLowerCase());
                setPage(1);
              }}
              catgeorySet={category}
              subCatgeorySet={subCategory}
            />
            <StorePrice
              filterItem={(lowPrice: number, highPrice: number) => {
                LowPrice(lowPrice);
                HighPrice(highPrice);
              }}
            />
          </div>

          <div className="lg:col-span-3">
            <ul className="flex items-center gap-3">
              <li className="border text-black rounded py-1 px-2 md:text-base text-sm capitalize">
                page {page}
              </li>
              {catShow ? (
                <li className="border text-black rounded py-1 px-2 flex items-center justify-between capitalize">
                  {catShow}
                  <button
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                    onClick={() => {
                      setCategory("");
                      setCatShow("");
                    }}
                  >
                    <FaXmark />
                  </button>
                </li>
              ) : null}
              {subCatShow ? (
                <li className="border text-black rounded py-1 px-2 md:text-base text-sm flex items-center justify-between">
                  {subCatShow}
                  <button
                    onClick={() => {
                      setSubCategory("");
                      setSubCatShow("");
                    }}
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                  >
                    <FaXmark />
                  </button>{" "}
                </li>
              ) : null}{" "}
              {tagShow ? (
                <li className="border text-black rounded py-1 px-2 md:text-base text-sm flex items-center justify-between">
                  {tagShow}
                  <button
                    onClick={() => {
                      setTags("");
                      setTagShow("");
                    }}
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                  >
                    <FaXmark />
                  </button>{" "}
                </li>
              ) : null}
              {highPrice && lowPrice ? (
                <li className="border text-black rounded py-1 px-2 md:text-base text-sm flex items-center justify-between">
                  {lowPrice} - {highPrice}
                  <button
                    onClick={() => {
                      setLowPrice(null);
                      setHighPrice(null);
                    }}
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                  >
                    <FaXmark />
                  </button>
                </li>
              ) : null}
              {priceLH ? (
                <li className="border text-black rounded py-1 px-2 md:text-base text-sm flex items-center justify-between">
                  Price Low to High
                  <button
                    onClick={() => setPriceLH("")}
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                  >
                    <FaXmark />
                  </button>{" "}
                </li>
              ) : null}
              {priceHL ? (
                <li className="border text-black rounded py-1 px-2 md:text-base text-sm flex items-center justify-between">
                  Price High to Low
                  <button
                    onClick={() => setPriceHL("")}
                    className="bg-white h-4 w-4 flex items-center justify-center rounded text-black md:ml-4 ml-2"
                  >
                    <FaXmark />
                  </button>{" "}
                </li>
              ) : null}
            </ul>
            {loading ? (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:mx-4 mt-5">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:mx-4 mt-5">
                  {products.map((product: any) => (
                    <ProductCard
                      product={product}
                      key={product._id}
                      userId={userId}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center mt-8">
                  {pagination && page < pagination.totalPages && (
                    <Button
                      onClick={handleLoadMore}
                      className="button_bg !px-12"
                      title="load more button"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      </section>
    </Container>
  );
}
