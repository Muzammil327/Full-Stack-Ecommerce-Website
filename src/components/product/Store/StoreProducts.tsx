import React from "react";
import ProductCard from "@/src/components/product/card/page";
import { ProductCardProps } from "@/src/types/product";

interface StoreProductsProps {
  data: any;
}

export default function StoreProducts({ data }: StoreProductsProps) {
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
        {data.products.map((product: ProductCardProps) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
