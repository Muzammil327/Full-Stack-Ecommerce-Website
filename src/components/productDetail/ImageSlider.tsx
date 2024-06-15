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

export default function ProductDetailImageSlider({ response }: any) {
  return (
    <div className="img">

      <Swiper
        effect={"flip"}
        grabCursor={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectFlip, Pagination, Navigation, Autoplay]}
        className="mySwipe"
      >
        {response.slider.map((index: string, slideIndex: number) => (
          <SwiperSlide key={slideIndex}>
            <div>
              <Image
                src={`https://backend-full-stack-ecommerce-website.vercel.app/uploadSliderImage/${index}`}
                width={1080}
                height={1080}
                alt=""
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
