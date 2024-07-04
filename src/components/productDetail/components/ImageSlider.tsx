"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-flip";

// import required modules
import { Autoplay } from "swiper/modules";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

// import ReactImageMagnify from "react-image-magnify";
import Image from "next/image";

interface ProductDetailImageSliderProps {
  data: {
    name: string;
    image: string;
    slider: [];
  };
}

export default function ProductDetailImageSlider({
  data,
}: ProductDetailImageSliderProps) {
  return (
    <Swiper
      effect={"flip"}
      grabCursor={true}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      modules={[EffectFlip, Pagination, Navigation, Autoplay]}
      className="mySwipe"
    >
      {/* <SwiperSlide>
        <div className="max-w-full">
        <Image
            src={data.image}
            width={500}
            height={500}
            alt={data.name}
            title={data.name}
            priority
            sizes="(max-width: 500px) 100vw, 300px"
            className="max-w-full h-auto"
          />

        </div>
      </SwiperSlide> */}
      {data.slider.map((index) => (
        <SwiperSlide key={index}>
          <div className="max-w-full">
            <Image
              src={index}
              width={500}
              height={500}
              alt={data.name}
              title={data.name}
              sizes="(max-width: 500px) 100vw, 300px"
              className="max-w-full h-auto"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
