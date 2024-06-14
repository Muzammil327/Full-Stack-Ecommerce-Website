import React from "react";
import HeroSlider from "@/src/components/home/heroSlider";
import FeaturedProduct from "@/src/components/home/FeaturedProduct";

import dynamic from "next/dynamic";
const Discount = dynamic(
  () => import("@/src/components/home/Discount")
);
const BestPriceProductSlider = dynamic(
  () => import("@/src/components/home/BestPriceProductSlider")
);
const FreeDeliveryProductSlider = dynamic(
  () => import("@/src/components/home/FreeDeliveryProductSlider")
);
const TopProductSlider = dynamic(
  () => import("@/src/components/home/TopProductSlider")
);

export default function HomeView() {
  return (
    <>
      <HeroSlider />
      <FeaturedProduct />
      {/* <Discount />
      <BestPriceProductSlider />
      <FreeDeliveryProductSlider />
      <TopProductSlider /> */}
    </>
  );
}
