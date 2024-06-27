"use client";
import React, { Suspense } from "react";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "@/src/components/ui/Container";
import { useSearchParams } from "next/navigation";
import { useProductCard } from "@/src/components/context/productCard";
import StoreProducts from "@/src/components/store/components/StoreProducts";
import StorePagination from "@/src/components/store/components/StorePagination";

const CategoryPageContent = () => {
  const searchParams = useSearchParams();
  const categorys = searchParams.get("cat");
  const subCategorys = searchParams.get("subCat");
  const Tags = searchParams.get("tags");

  const { error, loading, data, setPage } = useProductCard();

  return (
    <main>
      {error && <h1>Error fetching Catgeory data...</h1>}
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <h1 className="text-4xl font-bold capitalize">
          {categorys || subCategorys || Tags}
        </h1>
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
