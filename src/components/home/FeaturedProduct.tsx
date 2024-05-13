"use client";
import React from "react";
import { useFetch } from "@/src/components/hooks/useFetch";

import ProductCard from "@/src/components/elements/ProductCard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "../ui/Container";
import { Heading1 } from "../ui/Typography";
interface Featured_Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountprice: number;
  image: string;
  Featured: boolean;
}

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
  );
}
