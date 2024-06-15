"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Product_STORE } from "@/src/utils/constant";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "@/src/components/ui/Container";
import StoreProducts from "@/src/components/Store/StoreProducts";
import StorePagination from "@/src/components/Store/StorePagination";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const CategoryPageContent = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("cat");
  const subCategory = searchParams.get("subCat");
  const Tags = searchParams.get("tags");
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCatgeory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${Product_STORE}?page=${page}&category=${category}`
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubCatgeory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${Product_STORE}?page=${page}&subCatgeory=${subCategory}`
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${Product_STORE}?page=${page}&tags=${Tags}`
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCatgeory();
    }
    if (subCategory) {
      fetchSubCatgeory();
    }
    if (Tags) {
      fetchItems();
    }
  }, [Tags, category, page, subCategory]);

  return (
    <main>
      {error && <h1>Error fetching Catgeory data...</h1>}
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <h1 className="text-4xl font-bold capitalize">
          {category || subCategory || Tags}
        </h1>
      </div>
      <div className="py-12">
        <Container>
          {loading ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mx-4 mt-5">
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mx-4 mt-5">
                <StoreProducts data={data} />
              </div>
              <StorePagination setPage={setPage} data={data} />
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
