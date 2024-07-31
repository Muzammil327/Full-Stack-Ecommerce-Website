"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "@/src/components/elements/ProductCard/Productcard";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import { Heading2, Container, Links } from "@/src/components/ui/ui";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Product({
  title,
  slug,
}: // featureProduct
any) {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [featureProduct, setFeatureProduct] = useState<[]>([]);

  const getToCartBtn = useCallback(async () => {
    try {
      setIsFetching(true);

      const response = await axios.get(`/api/product/home?feature=feature`);
      setFeatureProduct(response.data.get_Feature_Products);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    getToCartBtn();
  }, [getToCartBtn]);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading2 title={title} className="!text-color2" />
        <Links
          slug={slug}
          title="read more"
          className="flex gap-2 items-center"
        >
          View All
          <FaChevronRight />
        </Links>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 3,
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
          1600: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mt-12 mb-16"
      >
        {isFetching ? (
          <React.Fragment>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <LoadingProductCard />
            </SwiperSlide>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {featureProduct?.map((product: any) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} session={undefined} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
      </Swiper>
    </Container>
  );
}
