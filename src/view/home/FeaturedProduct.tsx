import React from "react";
import ProductCard from "@/src/components/product/card/page";
import { useFetchArray } from "@/src/components/function/useFetchArray";
import LoadingProductCard from "@/src/components/element/Loading/LoadingProductCard";
import { useFetch } from "@/src/components/function/useFetch";

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
    <>
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
    </>
  );
}
