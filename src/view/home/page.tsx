"use client";
import Container from "@/components/element/container/page";
import HeroSlider from "@/view/home/HeroSlider";
import TopProductSlider from "@/view/home/TopProductSlider";
import Discount from "@/view/home/Discount";
import { Heading1 } from "@/src/components/element/Typography";
import FeaturedProduct from "./FeaturedProduct";
import BestPriceProductSlider from "./BestPriceProductSlider";
import FreeDeliveryProductSlider from "./FreeDeliveryProductSlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <Container>
        <Heading1 title="Trending Products" />
        <FeaturedProduct />
      </Container>
      <Discount />
      <Container>
        <Heading1 title="Top Rated Products" />
        <TopProductSlider />
      </Container>
      <Container>
        <Heading1 title="Free Delivery Products" />
        <FreeDeliveryProductSlider />
      </Container>
      <Container>
        <Heading1 title="Best Price Products" />
        <BestPriceProductSlider />
      </Container>
    </>
  );
}
