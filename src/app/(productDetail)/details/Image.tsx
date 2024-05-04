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

import ReactImageMagnify from "react-image-magnify";

export default function ProductImage() {
  return (
    <>
      <div className="img">
        <Swiper
          effect={"flip"}
          grabCursor={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectFlip, Pagination, Navigation, Autoplay]}
          className="mySwipe"
        >
          {data.map((data: any) => {
            return (
              <>
                <SwiperSlide>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Jersey",
                        src: `${data.image}`,
                        isFluidWidth: true,
                        width: 600,
                        height: 600,
                      },
                      largeImage: {
                        src: `${data.image}`,
                        width: 1200,
                        height: 1500,
                      },
                      enlargedImagePosition: "over",
                      lensStyle: {
                        backgroundColor: "rgba(0,0,0,.6)",
                      },
                    }}
                  />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

const data = [
  {
    id: 0,
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    alt: "",
  },
  {
    id: 1,
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    alt: "",
  },
  {
    id: 2,
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    alt: "",
  },
  {
    id: 3,
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    alt: "",
  },
];
