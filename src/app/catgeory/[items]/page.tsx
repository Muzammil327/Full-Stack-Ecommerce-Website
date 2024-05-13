// "use client";
// import { useParams } from "next/navigation";
// import React from "react";

// export default function Page() {
//   const { catgeory } = useParams();
//   return (
//     <div>

//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
// import StorePage from "@/src/view/store/page";
// import LoadingProductCard from "@/src/components/element/Loading/LoadingProductCard";
// import { useFetchArray } from "@/src/components/function/useFetchArray";
import { Product_API_Endpoint } from "@/src/utils/constant";
// import StoreProducts from "@/src/components/product/Store/StoreProducts";
// import StorePagination from "@/src/components/product/Store/StorePagination";
import { ProductShopProps } from "@/src/types/product";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "@/src/components/ui/Container";
import StoreProducts from "@/src/components/Store/StoreProducts";
import StorePagination from "@/src/components/Store/StorePagination";
import { useFetch } from "@/src/components/hooks/useFetch";
// import Container from "@/src/components/element/container/page";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { items } = useParams();
  const searchParams = useSearchParams();

  const subcategory = searchParams.get("subcategory");
  const category = searchParams.get("category");

  // This will not be logged on the server when using static rendering
  console.log(subcategory, category);
  // Now you can use 'category' and 'subcategory' in your component
  const [page, setPage] = useState(1);

  const { data, error, loading } = useFetch<ProductShopProps>(
    `${Product_API_Endpoint}/get?page=${page}&tags=${items}&category=${category}&subCatgeory=${subcategory}`
  );
  return (
    <main>
      {error && <h1>Error fetching Catgeory data...</h1>}
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <h1 className="text-4xl font-bold capitalize">
          {category + " " + items + " " + subcategory}
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
}
