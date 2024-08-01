import React from "react";
import HeroSlider from "@/src/components/home/HeroSlider";
import Policy from "@/src/components/home/policy";
import CatgeoryHome from "@/src/components/home/CatgeoryHome";
import Flash_Deal_Data from "@/src/components/home/data/flash_deal";
import New_Product_Data from "@/src/components/home/data/new_product";
import Feature_Products_Data from "@/src/components/home/data/feature_product";

import dynamic from "next/dynamic";
const Product = dynamic(() => import("@/src/components/home/Product"));
const TagHome = dynamic(() => import("@/src/components/home/TagHome"));

export default function HomeView() {
  return (
    <React.Fragment>
      <HeroSlider />
      <Product title="Feature Product" slug="/stores" /> {/* Feature */}
      <Policy />
      {/* <CatgeoryHome /> */}
      {/* <Product title="Flash Deals" slug="" /> Flash Deals */}
      {/* <TagHome /> */}
      {/* <Product title="New Product" slug="" /> New */}
      {/* <Product title="Top Home Appliances" slug="" /> Home Appliances */}
    </React.Fragment>
  );
}
