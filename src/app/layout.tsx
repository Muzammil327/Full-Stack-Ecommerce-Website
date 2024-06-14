import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/globals.scss";
import NextAuthProvider from "@/src/components/provider/authProvider";
import { ToastContainer } from "react-toastify";

import Header from "@/src/components/layout/header/page";
import Navbar from "@/src/components/layout/Navbar/page";
import Footer from "@/src/components/layout/Footer/page";

import dynamic from "next/dynamic";
const Instragram = dynamic(
  () => import("@/src/components/layout/Instragram/page")
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMI Store Title App",
  description: "SMI Store Description App",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_LINK}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Next.js" />
        <meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR_NAME} />
        <link rel="author" href={process.env.NEXT_PUBLIC_AUTHOR_LINK} />
        <meta name="generator" content="Next.js" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="light" />
        <meta name="creator" content={process.env.NEXT_PUBLIC_CREATOR} />
        <meta name="publisher" content={process.env.NEXT_PUBLIC_CREATOR} />
        {/* og */}
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_CREATOR}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        {/* icon */}
        <meta name="theme-color" content="#f73e3e" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
          type="image/png"
        />

        <link
          rel="apple-touch-icon"
          href="/favicon/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        {/* twitter */}

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:creator"
          content={`@${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}
        />
        <meta
          property="twitter:domain"
          content={process.env.NEXT_PUBLIC_CREATOR}
        />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <Navbar />
          {children}
          <Instragram />
          <Footer />
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
