'use client'
import React from "react";
import { useFetch } from "@/src/components/hooks/useFetch";

import ProductCard from "@/src/components/elements/ProductCard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "@/src/components/ui/Container";
import { Heading1 } from "@/src/components/ui/Typography";
import { Featured_Product } from "@/src/types/product";

interface ApiResponse {
  success: boolean;
  message: string;
  get_Feature_Products: Featured_Product[];
}

export default function FeaturedProduct() {
  const { data, error, loading } = useFetch<ApiResponse>(
    `/api/products/GetFeatureProducts`
  );

  return (
    <section>
      <Container>
        <Heading1 title="Trending Products" />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-12 mb-10">
          {error && <h1>Error fetching Featured Product...</h1>}
          {loading ? (
            <>
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </>
          ) : (
            <>
              {data?.get_Feature_Products?.map((product: Featured_Product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
