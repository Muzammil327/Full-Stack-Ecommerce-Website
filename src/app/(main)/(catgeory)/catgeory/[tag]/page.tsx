"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import LoadingProductCard from "@/src/components/ui/Loading/LoadingProductCard";
import { Container, Heading1 } from "@/src/components/ui/ui";
import axios from "axios";
import {
  PaginationType,
  ProductCardDataType,
  ProductCardType,
} from "@/src/types/page";
import ProductCard from "@/src/components/elements/ProductCard/Productcard";
import Pagination from "@/src/components/elements/pagination";


interface tag {
  tag: string;
}

interface Iprops {
  params: tag;
}

const CategoryPageContent = ({ params }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [page, setPage] = useState(1);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      let response: any = [];
      if (params.tag) {
        response = await axios.get<ProductCardDataType>(
          `/api/product/home/separateCatgeory?page=${page}&tags=${params.tag}`
        );
      }
      setProducts(response.data.products);

      setPagination(response.data.pagination as any);
    } catch (error) {
      console.log(error);
      setError("Error Store PRODUCTS");
    } finally {
      setLoading(false);
    }
  }, [page, params.tag]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <main>
      {error && <h1>Error fetching Catgeory data...</h1>}
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <Heading1 className="capitalize" title={params.tag || ""} />
      </div>
      <div className="py-12">
        <Container>
          {loading ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:mx-4 mt-5">
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:mx-4 mt-5">
                {products.map((product: any) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    session={undefined}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center mt-8">
                <Pagination
                  page={page}
                  setPage={setPage}
                  loading={loading}
                  pagination={pagination}
                />
              </div>{" "}
            </>
          )}
        </Container>
      </div>
    </main>
  );
};

const CategoryPage = ({ params }: Iprops) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
};

export default CategoryPage;


export async function generateMetadata({ params }: Iprops) {
  const slug = params.tag;
  const convertToUpperCaseithHyphen = (text: string) => {
    return text.toUpperCase().replace(/-/g, " ").replace(/\s+/g, " ");
  };
  try {
    return {
      title: convertToUpperCaseithHyphen(slug),
      description: convertToUpperCaseithHyphen(slug),
      alternates: {
        canonical: `/catgeory/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      openGraph: {
        title: convertToUpperCaseithHyphen(slug),
        description: convertToUpperCaseithHyphen(slug),
        url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/catgeory/${slug}`,
        images: [
          {
            alt: convertToUpperCaseithHyphen(slug),
          },
        ],
      },
      twitter: {
        title: convertToUpperCaseithHyphen(slug),
        description: convertToUpperCaseithHyphen(slug),
        images: {
          alt: convertToUpperCaseithHyphen(slug),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      title: "Error",
      description: "Unable to fetch product data",
      alternates: {
        canonical: `/catgeory/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: "Error",
        description: "Unable to fetch product data",
        url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/catgeory/${slug}`,
        images: [
          {
            url: "/default-error-image.jpg",
            alt: "Error",
          },
        ],
      },
      twitter: {
        title: "Error",
        description: "Unable to fetch product data",
        images: {
          url: "/default-error-image.jpg",
          alt: "Error",
        },
      },
    };
  }
}
