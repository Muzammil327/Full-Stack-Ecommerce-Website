import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Instragram() {
  const WebDev = process.env.NEXT_PUBLIC_WEBSITE_NAME;
  const data = [
    {
      id: 0,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
    {
      id: 1,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
    {
      id: 2,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
    {
      id: 3,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
    {
      id: 4,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
    {
      id: 5,
      img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
      title: "Hello World",
    },
  ];
  return (
    <>
      <div className="instagram grid md:grid-cols-6 grid-cols-3">
        {data.map((data: any) => {
          return (
            <>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0" key={data.id}>
                <div className="instagram__item">
                  <Image
                    src={data.img}
                    alt={data.title}
                    title={data.title}
                    className="set-bg"
                    height={400}
                    width={400}
                  />
                  <div className="instagram__text flex flex-col">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                    >
                      <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z" />
                    </svg>{" "}
                    <Link href="/" className="md:text-base text-sm">@ {WebDev}</Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
