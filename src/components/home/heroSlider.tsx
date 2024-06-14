"use client";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";

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
            src="/1.webp"
            sizes="(max-width: 600px) 90vw, 600px"
            alt=""
            title=""
            height={800}
            width={1600}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/1.webp"
            sizes="(max-width: 600px) 90vw, 600px"
            alt=""
            title=""
            height={800}
            width={1600}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/1.webp"
            sizes="(max-width: 600px) 90vw, 600px"
            alt=""
            title=""
            height={800}
            width={1600}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/1.webp"
            sizes="(max-width: 600px) 90vw, 600px"
            alt=""
            title=""
            height={800}
            width={1600}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
