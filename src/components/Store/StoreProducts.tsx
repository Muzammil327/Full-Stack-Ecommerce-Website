import React from "react";
import { ProductCardProps } from "@/src/types/product";
import ProductCard from "../elements/ProductCard";

interface StoreProductsProps {
  data: any;
}

export default function StoreProducts({ data }: StoreProductsProps) {
  return (
    <>
      {data.products.map((product: ProductCardProps) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </>
  );
}
