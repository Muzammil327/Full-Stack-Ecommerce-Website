"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "@/src/components/elements/ProductCard/Productcard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import { Heading2, Container, Links } from "@/src/components/ui/ui";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Product({ title, slug, loading, products }: any) {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h2 className="mt-10 text-color2 scroll-m-20 md:text-2xl sm:text-xl text-lg font-semibold transition-colors first:mt-0">
          {title}
        </h2>
        <Links
          slug={slug}
          title="read more"
          className="flex gap-2 items-center md:text-base text-sm"
        >
          View All
          <FaChevronRight />
        </Links>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        loop={true}
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
            slidesPerView: 3,
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
          1600: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="md:mt-10 mt-6 mb-10"
      >
        {loading ? (
          <React.Fragment>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {products?.map((product: any) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} session={undefined} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
      </Swiper>
    </Container>
  );
}
