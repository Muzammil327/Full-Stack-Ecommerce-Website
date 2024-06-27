"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";


export default function HeroSlider() {
  return (
    <section>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/slider/headphones.png"
            sizes="(max-width: 1600px) 90vw, 600px"
            alt=""
            title=""
            height={720}
            width={1600}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/slider/airpods.png"
            sizes="(max-width: 1600px) 90vw, 600px"
            alt=""
            title=""
            height={720}
            width={1600}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/slider/shoes.png"
            sizes="(max-width: 1600px) 90vw, 600px"
            alt=""
            title=""
            height={720}
            width={1600}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/slider/watches.png"
            sizes="(max-width: 1600px) 90vw, 600px"
            alt=""
            title=""
            height={720}
            width={1600}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
