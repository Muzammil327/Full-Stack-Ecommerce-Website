"use client";
import React, { useCallback, useEffect, useState } from "react";

import ProductCard from "@/src/components/elements/ProductCard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "@/src/components/ui/Container";
import { Heading2 } from "@/src/components/ui/ui";
import axios from "axios";

export default function FeaturedProduct() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [featureProduct, setFeatureProduct] = useState<[]>([]);

  const getToCartBtn = useCallback(async () => {
    try {
      setIsFetching(true);

      const response = await axios.get(`/api/product/home?feature=feature`);
      setFeatureProduct(response.data.get_Feature_Products);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    getToCartBtn();
  }, [getToCartBtn]);

  return (
    <section>
      <Container>
        <Heading2 title="Trending Products" className="" />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-12 mb-10">
          {isFetching ? (
            <>
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </>
          ) : (
            <>
              {featureProduct?.map((product: any) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
