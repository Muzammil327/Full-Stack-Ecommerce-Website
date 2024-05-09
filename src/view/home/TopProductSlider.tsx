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

interface Hot_Product {
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
  get_Hot_Products: Hot_Product[];
}

export default function TopProductSlider() {
  const { data, error, loading } = useFetch<ApiResponse>(
    `/api/products/GetHotProducts`
  );

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
          {error && <h1>Error Top Product...</h1>}

          <>
            {data?.get_Hot_Products?.map((product: Hot_Product) => (
              <>
                <SwiperSlide>
                  <ProductCard product={product} key={product._id} />
                </SwiperSlide>
              </>
            ))}
          </>
        </Swiper>
      )}
    </div>
  );
}
