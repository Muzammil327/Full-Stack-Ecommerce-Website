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
import ProductCard from "../elements/ProductCard";

export default function StorePage() {
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
          SMI Store
        </h1>

        <StoreSort
          filterItemsLH={SortPriceLH}
          filterItemsHL={SortPriceHL}
          setPage={setPage}
          setCategory={setCategory}
          category={category}
          setSubCategory={setSubCategory}
          subCategory={subCategory}
          setTags={setTags}
          setHighPrice={setHighPrice}
          setLowPrice={setLowPrice}
        />
      </section>

      <section className="pb-24 pt-4">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <aside className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
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
              catgeorySet={category}
            />

            <StoreTags
              filterItem={(value: string) => {
                setTags(value.toLowerCase());
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
              ) : null}{" "}
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
                    <ProductCard product={product} key={product._id} />
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
