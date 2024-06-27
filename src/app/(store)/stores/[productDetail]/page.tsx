import React from "react";
import ProductDetail from "@/src/components/productDetail/page";
import { getProductDetails } from "./FetchSeoData";

interface productDetail {
  productDetail: string;
}

interface Iprops {
  params: productDetail;
}

export default function Page({ params }: Iprops) {
  return (
    <main>
      <ProductDetail params={params.productDetail} />
    </main>
  );
}

export async function generateMetadata({ params }: Iprops) {
  const slug = params.productDetail;
  const data = await getProductDetails(params.productDetail);
  return {
    title: data?.name,
    description: data?.description,
    // keywords: post?.data.keyword,
    alternates: {
      canonical: `/stores/${slug}`,
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
      title: data?.name,
      description: data?.description,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/stores/${slug}`,
      images: [
        {
          url: data?.image,
          alt: data?.name,
        },
      ],
    },
    twitter: {
      title: data?.name,
      description: data?.description,
      images: {
        url: data?.image,
        alt: data?.name,
      },
    },
  };
}
