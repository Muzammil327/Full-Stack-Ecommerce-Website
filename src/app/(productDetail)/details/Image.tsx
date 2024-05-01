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

export default function ProductImage() {
  return (
    <>
      <div className="img">
        <Swiper
          effect={"flip"}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectFlip, Pagination, Navigation, Autoplay]}
          className="mySwipe"
        >
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
