import React from "react";
import HeroSlider from "@/src/components/home/HeroSlider";
import FeaturedProduct from "./FeaturedProduct";
import Policy from "./policy";

export default function HomeView() {
  return (
    <React.Fragment>
      <HeroSlider />
      <Policy />
      <FeaturedProduct />
    </React.Fragment>
  );
}
