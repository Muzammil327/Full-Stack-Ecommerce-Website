import React from "react";
import ProductDetail from "@/src/components/productDetail/page";
import { getSession } from "@/src/utils/getSession";

interface productDetail {
  productDetail: string;
}

interface Iprops {
  params: productDetail;
}

export default async function Page({ params }: Iprops) {
  const session = await getSession();
  const userId = session?.user?._id as string;
  return (
    <main>
      <ProductDetail params={params.productDetail} userId={userId} />
    </main>
  );
}

export async function generateMetadata({ params }: Iprops) {

  const slug = params.productDetail;

  const response = await fetch(`http://localhost:3000/api/product/${slug}`).then((res) => res.json())
  const data = response.singleProduct

  return {
    title: data?.name,
    description: data?.Sdescription,
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
      description: data?.Sdescription,
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
      description: data?.Sdescription,
      images: {
        url: data?.image,
        alt: data?.name,
      },
    },
  };
}
