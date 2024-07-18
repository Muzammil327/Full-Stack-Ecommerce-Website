"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import { Button, Container, Heading1 } from "@/src/components/ui/ui";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  PaginationType,
  ProductCardDataType,
  ProductCardType,
} from "@/src/types/page";
import ProductCard from "@/src/components/elements/ProductCard";

const CategoryPageContent = () => {
  const param = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [page, setPage] = useState(1);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      let response: any = [];
      if (param.tag) {
        response = await axios.get<ProductCardDataType>(
          `/api/product/catgeory?page=${page}&tags=${param.tag}`
        );
      }
      if (page === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prevData) => [...prevData, ...response.data.products]);
      }

      setPagination(response.data.pagination as any);
    } catch (error) {
      console.log(error);
      setError("Error Store PRODUCTS");
    } finally {
      setLoading(false);
    }
  }, [page, param.tag]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prevPage: any) => prevPage + 1);
    }
  };
  return (
    <main>
      {error && <h1>Error fetching Catgeory data...</h1>}
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <Heading1 className="capitalize" title={param.tag || ""} />
      </div>
      <div className="py-12">
        <Container>
          {loading ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:mx-4 mt-5">
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:mx-4 mt-5">
                {products.map((product: any) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
              <div className="flex items-center justify-center mt-8">
                {pagination && page < pagination.totalPages && (
                  <Button
                    onClick={handleLoadMore}
                    className="button_solid w-full"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                )}
              </div>{" "}
            </>
          )}
        </Container>
      </div>
    </main>
  );
};

const CategoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  );
};

export default CategoryPage;
