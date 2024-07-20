"use client";
import React from "react";
import { Container, Heading2, Links } from "@/src/components/ui/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaChevronRight } from "react-icons/fa";

export default function TagHome() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading2 title="Shop By Sub Categories" className="" />
        <Links slug="" title="read more" className="flex gap-2 items-center">
          View All
          <FaChevronRight />
        </Links>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        // centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
          1600: {
            slidesPerView: 8,
            spaceBetween: 50,
          },
        }}
        className="mt-12 mb-16"
      >
        {data.map((data: any) => {
          return (
            <SwiperSlide key={data.id}>
              <div className="relative flex items-center flex-col">
                <div className="">
                  <img
                    src={data.img}
                    alt={data.title}
                    title={data.title}
                    className="h-10 w-10 mb-2"
                  />
                </div>
                <h3 className="text-xl font-semibold hover:underline">
                  {data.title}
                </h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

const data = [
  {
    id: 0,
    title: "Sports",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/sports.png?v=2909828584237914655",
    slug: "",
  },
  {
    id: 1,
    title: "Apparel",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/apparel.png?v=6692593555781944967",
    slug: "",
  },
  {
    id: 2,
    title: "Accessories",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/accessorie.png?v=14188820596971969983",
    slug: "",
  },
  {
    id: 3,
    title: "Furniture",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/furniture.png?v=6258713703673212376",
    slug: "",
  },
  {
    id: 4,
    title: "Sports",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/sports.png?v=2909828584237914655",
    slug: "",
  },
  {
    id: 5,
    title: "Apparel",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/apparel.png?v=6692593555781944967",
    slug: "",
  },
  {
    id: 6,
    title: "Accessories",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/accessorie.png?v=14188820596971969983",
    slug: "",
  },
  {
    id: 7,
    title: "Furniture",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/furniture.png?v=6258713703673212376",
    slug: "",
  },
];
