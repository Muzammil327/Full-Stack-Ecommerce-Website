"use client";
import { ProducTypes } from "@/components/product/card/type";
import Container from "@/components/element/container/page";
import ProductCard from "@/components/product/card/page";
import HeroSlider from "@/components/HeroSlider/page";
import TopProductSlider from "@/components/product/topProductSlider/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Discount from "@/src/components/product/discount/page";

const products: ProducTypes[] = [
  {
    id: 0,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: 45,
    cat: "Accessories",
  },
];

export default function HomePage() {
  const [fetchCat, setFetchCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products");

        setFetchCat(response.data.catgeoryProduct);
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const addToCart = async (productId: any) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/products/addToCart", {
        productId: productId,
        quantity: 1, // You can adjust the quantity as needed
      });
      router.push("/cart");
      // Optionally, you can handle success response here
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HeroSlider />
      <Container>
        {/* <Hero /> */}
        <h1 className="text-2xl font-semibold my-12">Trending Products</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 my-12 mb-10">
          {products.map((data: any) => (
            <>
              <ProductCard product={data} key={data.id} />
            </>
          ))}
        </div>
      </Container>
      <Discount />
      <Container>
        <h1 className="text-2xl font-semibold my-12">Top Rated Products</h1>
        <TopProductSlider />
      </Container>
    </>
  );
}
