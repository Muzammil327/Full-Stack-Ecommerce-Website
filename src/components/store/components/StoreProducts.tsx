import React from "react";
import ProductCard from "../../elements/ProductCard";
export interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  discountprice: number;
}
interface StoreProductsProps {
  data: any;
}

export default function StoreProducts({ data }: StoreProductsProps) {
  return (
    <>
      {data.map((product: ProductCardProps) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </>
  );
}
