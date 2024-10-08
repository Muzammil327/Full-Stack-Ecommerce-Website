"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeroSlider from "@/src/components/home/HeroSlider";

import dynamic from "next/dynamic";
import axios from "axios";
const Product = dynamic(() => import("@/src/components/home/Product"));

export default function HomeView() {
  const [featureProducts, setFeatureProducts] = useState([]);
  const [isFetchingFeature, setIsFetchingFeature] = useState(false);

  const [isFetchingTop, setIsFetchingTop] = useState(false);
  const [topProducts, setTopProducts] = useState([]);

  const [isFetchingDeal, setIsFetchingDeal] = useState(false);
  const [dealProducts, setDealProducts] = useState([]);

  const fetchProducts = useCallback(
    async (feature: any, setProducts: any, setIsFetching: any) => {
      try {
        setIsFetching(true);

        const response = await axios.get(
          `/api/guest/home?${feature}=${feature}`
        );
        setProducts(response.data.get_Products);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts("feature", setFeatureProducts, setIsFetchingFeature);
    fetchProducts("top", setTopProducts, setIsFetchingTop);
    fetchProducts(
      "bestPrice",
      setDealProducts,
      setIsFetchingDeal
    ); /* Flash Deals */
  }, [fetchProducts]);

  return (
    <React.Fragment>
      <HeroSlider />
      {/* <CatgeoryHome /> */}
      <div className="mt-8">
        <Product
          title="Feature Products"
          slug="/stores"
          products={featureProducts}
          loading={isFetchingFeature}
        />{" "}
      </div>
      <Product
        title="Top Products"
        slug="#"
        products={topProducts}
        loading={isFetchingTop}
      />{" "}
      {/* Feature */}
      {/* <TagHome /> */}
      <Product
        title="Flash Deal Product"
        slug="#"
        products={dealProducts}
        loading={isFetchingDeal}
      />
    </React.Fragment>
  );
}
