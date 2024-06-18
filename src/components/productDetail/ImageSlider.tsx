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

export default function ProductDetailImageSlider({ response, image }: any) {
  return (
    <div className="img mx-8">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectFlip, Pagination, Navigation, Autoplay]}
        className="mySwipe"
      >
        <SwiperSlide>
          <div className="h-auto w-full">
            <Image src={image} width={600} height={600} alt="" priority />
          </div>
        </SwiperSlide>
        {response.slider.map((index: string, slideIndex: number) => (
          <SwiperSlide key={slideIndex}>
            <div className="h-auto w-full">
              <Image src={index} width={600} height={600} alt="" priority />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
