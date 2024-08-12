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

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

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
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      loop={true}
      modules={[EffectFlip, Pagination, Navigation, Autoplay]}
      className="mySwipe"
    >
      {data.slider.map((index) => (
        <SwiperSlide key={index}>
          <div className="max-w-full">
            <Image
              src={`https://res.cloudinary.com/desggllml/image/upload/c_fill,w_500,h_500,e_improve,e_sharpen/${index}`}
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
