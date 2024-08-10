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
  const convertToLowercaseWithHyphen = (text: string) => {
    return text.toUpperCase().replace(/-/g, " ").replace(/\s+/g, " ");
  };

  let response;
  try {
    response = await fetch(
      `https://smishopmart.vercel.app/api/product/${slug}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const productData = data.singleProduct;

    return {
      title: convertToLowercaseWithHyphen(productData?.name),
      description: productData?.Sdescription,
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
        title: productData?.name,
        description: productData?.Sdescription,
        url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/stores/${slug}`,
        images: [
          {
            url: productData?.image,
            alt: productData?.name,
          },
        ],
      },
      twitter: {
        title: productData?.name,
        description: productData?.Sdescription,
        images: {
          url: productData?.image,
          alt: productData?.name,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      title: "Error",
      description: "Unable to fetch product data",
      alternates: {
        canonical: `/stores/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: "Error",
        description: "Unable to fetch product data",
        url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/stores/${slug}`,
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
