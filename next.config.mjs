/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "preview.colorlib.com",
      },
      {
        protocol: "https",
        hostname: "backend-full-stack-ecommerce-website.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [{ type: "host", value: "www.growlearnhub.com" }],
  //       destination: "https://growlearnhub.com/:path*",
  //       permanent: true,
  //     },
  //   ];
  // },
  // trailingSlash: true,
  // reactStrictMode: true,
  // swcMinify: true,
};
export default nextConfig;
