"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

// import required modules
import { useFetch } from "@/src/components/hooks/useFetch";
import ProductCard from "@/src/components/elements/ProductCard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import Container from "../ui/Container";
import { Heading1 } from "../ui/Typography";
interface Free_Delivery_Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountprice: number;
  image: string;
  Featured: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  get_Free_Delivery_Products: Free_Delivery_Product[];
}

export default function FreeDeliveryProductSlider() {
  const { data, error, loading } = useFetch<ApiResponse>(
    `/api/products/GetFreeDeliveryProducts`
  );
  return (
    <Container>
      <Heading1 title="Free Delivery Products" />
      <div className="my-8">
        {error && <h1>Error Free Delivery Product...</h1>}

        {loading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            <LoadingProductCard />
          </div>
        ) : (
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
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
            }}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            <>
              {data?.get_Free_Delivery_Products?.map(
                (product: Free_Delivery_Product) => (
                  <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                )
              )}
            </>
          </Swiper>
        )}
      </div>
    </Container>
  );
}
