import { Suspense } from "react";
import { CategoryPageContent } from "./CategoryPageContent";


interface tag {
  tag: string;
}

interface Iprops {
  params: tag;
}

export default function CategoryPage({ params }: Iprops) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  )
}


export async function generateMetadata({ params }: Iprops) {
  const slug = params.tag;
  const convertToUpperCaseithHyphen = (text: string) => {
    return text.toUpperCase().replace(/-/g, " ").replace(/\s+/g, " ");
  };
  try {
    return {
      title: convertToUpperCaseithHyphen(slug) + "Collection",
      description: convertToUpperCaseithHyphen(slug) + "Collection",
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
        title: convertToUpperCaseithHyphen(slug) + "Collection",
        description: convertToUpperCaseithHyphen(slug) + "Collection",
        url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/catgeory/${slug}`,
        images: [
          {
            alt: convertToUpperCaseithHyphen(slug) + "Collection",
          },
        ],
      },
      twitter: {
        title: convertToUpperCaseithHyphen(slug) + "Collection",
        description: convertToUpperCaseithHyphen(slug) + "Collection",
        images: {
          alt: convertToUpperCaseithHyphen(slug) + "Collection",
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