import React from "react";
import HeroSlider from "@/src/components/home/HeroSlider";
import Product from "@/src/components/home/Product";
import Policy from "@/src/components/home/policy";
import CatgeoryHome from "@/src/components/home/CatgeoryHome";
import TagHome from "@/src/components/home/TagHome";

export default function HomeView() {
  return (
    <React.Fragment>
      <HeroSlider />
      <Policy />
      <Product title="Flash Deals" slug="" /> {/* Flash Deals */}
      <CatgeoryHome />
      <TagHome />
      <Product title="New Product" slug="" /> {/* New */}
      <Product title="Feature Product" slug="" /> {/* Feature */}
      <Product title="Top Home Appliances" slug="" /> {/* Home Appliances */}
    </React.Fragment>
  );
}
