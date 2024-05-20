import React from "react";
import ProductDetail from "@/src/views/productDetail";
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
      canonical: `stores/${slug}`,
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
      url: `stores/${slug}`,
      images: [
        {
          url: `${`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1714240538/${data?.image}.png`}`,
          alt: data?.name,
        },
      ],
    },
    twitter: {
      title: data?.name,
      description: data?.description,
      images: {
        url: `${`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1714240538/${data?.image}.png`}`,
        alt: data?.name,
      },
    },
  };
}
