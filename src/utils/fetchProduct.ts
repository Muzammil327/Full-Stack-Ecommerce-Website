"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PaginationProps, UserProductCardProps } from "../types/product";

export const ProductCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationProps | undefined>();
  const [products, setProducts] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [priceHL, setPriceHL] = useState<string>("");
  const [priceLH, setPriceLH] = useState<string>("");

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get<{
        products: UserProductCardProps[];
        pagination: PaginationProps;
      }>(
        `/api/product?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
      );
      if (page === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prevData) => [...prevData, ...response.data.products]);
      }
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
      setError("Error getting products card.");
    } finally {
      setLoading(false);
    }
  }, [
    category,
    subCategory,
    highPrice,
    lowPrice,
    page,
    priceHL,
    priceLH,
    tags,
  ]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    error,
    loading,
    fetchProduct,
    pagination,
    products,
    page,
    setPage,
    setHighPrice,
    setLowPrice,
    setPriceHL,
    setPriceLH,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    setTags,
    highPrice,
    lowPrice,
    tags,
    priceLH,
    priceHL,
  };
};
