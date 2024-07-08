import React from "react";
import HeroSlider from "@/src/components/home/HeroSlider";
import FeaturedProduct from "./FeaturedProduct";
import Policy from "./policy";

export default function HomeView() {
  return (
    <>
      <HeroSlider />
      <Policy />
      <FeaturedProduct />
    </>
  );
}
