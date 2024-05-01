"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "../card/page";
// import required modules
import { ProducTypes } from "@/components/product/card/type";

const products: ProducTypes[] = [
  {
    id: 0,
    name: "Meclay London Lustrous Shine Shampoo 660ml + Conditioner Pair Box (Save Rupees 200)",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "/details",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
];
export default function TopProductSlider() {
  return (
    <div className="my-8">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {products.map((data: any) => (
          <>
            <SwiperSlide>
              <ProductCard product={data} key={data.id} />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
