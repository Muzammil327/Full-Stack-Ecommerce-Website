import React from "react";
import HeroSlider from "@/src/components/home/heroSlider";
import Discount from "@/src/components/home/Discount";
import FeaturedProduct from "@/src/components/home/FeaturedProduct";
import BestPriceProductSlider from "@/src/components/home/BestPriceProductSlider";
import FreeDeliveryProductSlider from "@/src/components/home/FreeDeliveryProductSlider";
import TopProductSlider from "@/src/components/home/TopProductSlider";

export default function HomeView() {
  return (
    <>
      <HeroSlider />
      <FeaturedProduct />
      <Discount />
      <BestPriceProductSlider />
      <FreeDeliveryProductSlider />
      <TopProductSlider />
    </>
  );
}
