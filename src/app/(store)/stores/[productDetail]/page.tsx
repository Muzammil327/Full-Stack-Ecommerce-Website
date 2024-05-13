import React from "react";
import ProductDetail from "@/src/views/productDetail";

interface productDetail {
  productDetail: string;
}

interface Iprops {
  params: productDetail;
}

export default function Page({ params }: Iprops) {
  return (
    <main>
      <ProductDetail params={params.productDetail} />
    </main>
  );
}
