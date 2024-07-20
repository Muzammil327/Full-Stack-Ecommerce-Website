import React from "react";
import { Container } from "@/src/components/ui/ui";

export default function CatgeoryHome() {
  return (
    <Container>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-12">
        {data.map((data: any) => {
          return (
            <div className="shadow-md relative" key={data.id}>
              <div className="overflow-hidden">
                <img
                  src={data.img}
                  alt={data.title}
                  title={data.title}
                  className="transform hover:scale-105 transition-transform duration-300 w-full"
                />
              </div>
              <h3 className="absolute top-5 text-2xl font-semibold left-4">
                {data.title}
              </h3>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const data = [
  {
    id: 0,
    title: "Laptop",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-3_370x.jpg?v=1639976027",
    slug: "",
  },
  {
    id: 1,
    title: "Tablets",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-2_370x.jpg?v=1639976027",
    slug: "",
  },
  {
    id: 2,
    title: "Headphones",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-4_370x.jpg?v=1639976027",
    slug: "",
  },
  {
    id: 3,
    title: "Laptop",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-3_370x.jpg?v=1639976027",
    slug: "",
  },
  {
    id: 4,
    title: "Tablets",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-2_370x.jpg?v=1639976027",
    slug: "",
  },
  {
    id: 5,
    title: "Headphones",
    img: "https://new-ella-demo.myshopify.com/cdn/shop/files/h9s1-custom-image-banner-4_370x.jpg?v=1639976027",
    slug: "",
  },
];
