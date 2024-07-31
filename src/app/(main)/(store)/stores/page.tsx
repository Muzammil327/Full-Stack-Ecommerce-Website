import React from "react";
import StorePage from "@/src/components/store/page";
import type { Metadata } from "next";
import { getSession } from "@/src/utils/getSession";

const data = {
  title: "SMI Store",
  description:
    "I am a Full Stack Developer With Frontend Backend and Deveops Enginerr with Javascript, Typescript, Phython, PHP, Node JS and SQL.",
  canonical: "/stores/",
  index: true,
  follow: true,
  image: "/opengraph-image.png",
  keywords: [
    "mmuzammil-portfolio",
    "muzammil",
    "muzammil Safdar",
    "muzammil Safdar Portfolio",
    "muzammil portfolio",
  ],
};
export default async function Page() {
  const session = await getSession();
  const userId = session?.user?._id as string;
  return (
    <main>
      <StorePage userId={userId} />
    </main>
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/${data.canonical}`,
    images: [
      {
        url: data.image,
        alt: data.title,
      },
    ],
  },
  alternates: {
    canonical: data.canonical,
  },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: {
      index: data.index,
      follow: data.follow,
    },
  },
  twitter: {
    title: data.title,
    description: data.description,
    images: {
      url: data.image,
      alt: data.title,
    },
  },
};
