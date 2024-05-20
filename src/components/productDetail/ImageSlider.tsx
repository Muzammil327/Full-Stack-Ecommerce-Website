import React, { useState } from "react";
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
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <div className="img">
      {!swiperReady && (
        <div className="loading-spinner">
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1714240538/${response.image}.png`}
            width={1080}
            height={1080}
            alt=""
            onLoad={() => setSwiperReady(true)}
          />
        </div>
      )}

      {swiperReady && (
        <Swiper
          effect={"flip"}
          grabCursor={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          modules={[EffectFlip, Pagination, Navigation, Autoplay]}
          className="mySwipe"
        >
          {response.slider.map((index: string, slideIndex: number) => (
            <SwiperSlide key={slideIndex}>
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1714240538/${index}.png`}
                width={1080}
                height={1080}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
