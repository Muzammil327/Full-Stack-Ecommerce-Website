import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/effect-flip";

// import required modules
import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";

// import required modules
import ProductCard from "../elements/ProductCard";

const products = [
  {
    id: 0,
    name: "Meclay London Lustrous Shine Shampoo 660ml + Conditioner Pair Box (Save Rupees 200)",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 1,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 2,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    slug: "#",
    image: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    category: "Accessories",
  },
];
export default function RelatedProduct({ relatedProducts }: any) {
  return (
    <div className="Similarproduct">
      <h1 className="text-2xl font-semibold my-12">Similar Products</h1>

      <div className="my-8">
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
          {relatedProducts.product_details.map((data: any) => (
            <>
              <SwiperSlide>
                <ProductCard product={data} key={data.id} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
