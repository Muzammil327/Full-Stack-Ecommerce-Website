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
import ProductCard from "@/src/components/product/card/page";
import { useFetch } from "@/src/components/function/useFetch";
import LoadingProductCard from "@/src/components/element/Loading/LoadingProductCard";

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
  console.log(data);
  return (
    <div className="my-8">
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
          {error && <h1>Error Free Delivery Product...</h1>}

          <>
            {data?.get_Free_Delivery_Products?.map(
              (product: Free_Delivery_Product) => (
                <>
                  <SwiperSlide>
                    <ProductCard product={product} key={product._id} />
                  </SwiperSlide>
                </>
              )
            )}
          </>
        </Swiper>
      )}
    </div>
  );
}
