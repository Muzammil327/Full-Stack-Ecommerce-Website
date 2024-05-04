"use client";
import Container from "@/components/element/container/page";
import React, { useState } from "react";
import { useFetch } from "@/src/components/function/useFetch";
import DesktopStore from "./desktop";

export default function ProductPage() {
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState("");

  const [highPrice, setHighPrice] = useState();
  const [lowPrice, setLowPrice] = useState();

  const [priceHL, setPriceHL] = useState("");
  const [priceLH, setPriceLH] = useState("");
  // lowToHigh
  const { data, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/get/product?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
  );
  if (error) {
    return <h1>Error ....</h1>;
  }
  return (
    <Container>
      <DesktopStore
        data={data}
        page={page}
        loading={loading}
        setPage={setPage}
        // catgeory
        category={category}
        setCategory={setCategory}
        // sub catgeory
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        // tags setTags
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
    </Container>
  );
}
