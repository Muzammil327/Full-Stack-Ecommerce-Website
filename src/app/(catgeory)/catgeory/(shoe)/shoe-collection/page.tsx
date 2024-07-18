"use client";
import React from "react";
import Slider from "@/src/components/elements/Slider";
import { SwiperSlide } from "swiper/react";
import "@/src/style/catgeory/shoe/global.scss";
import Container from "@/src/components/ui/Container";
import { BsPhone } from "react-icons/bs";
import { FaBus, FaPhone } from "react-icons/fa6";

export default function Page() {
  return (
    <main className="wrapper">
      <section className="hero">
        <div className="inner">
          <div className="c1">
            <span>{hero.span}</span>
            <h1>{hero.h1}</h1>
            <p>{hero.p}</p>
            <div className="button">
              <button>{hero.btn}</button>
            </div>
          </div>
          <div className="c2">
            <Slider>
              {hero.array.map((data: any) => {
                return (
                  <SwiperSlide className="slider" key={data.id}>
                    <img src={data.imgSrc} alt={data.title} />
                  </SwiperSlide>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
      <section className="about">
        <Container>
          <div className="inner">
            <div className="img">
              <img
                src="https://kit.juliha.com/zitshoe/wp-content/uploads/sites/16/2021/06/fashion-sneakers-disco-minimal-style-PPZALSU-2.png"
                alt=""
              />
            </div>
            <div className="c2">
              <span>ABOUT</span>
              <h3>About ZitShoe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                quod repellendus, mollitia nobis ullam aspernatur dolorum
                laboriosam ea dolor excepturi, fugiat, amet ipsam odio velit
                ducimus! Magnam mollitia atque et sunt eligendi.
              </p>
              <div className="c2layout">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur nihil velit nemo, quos placeat mollitia facilis nisi
                  voluptate beatae quas?
                  <ul>
                    <li>
                      <CircleSvg />
                      Quick Repair Process{" "}
                    </li>
                    <li>
                      {" "}
                      <CircleSvg />
                      Commitment to Customers{" "}
                    </li>
                    <li>
                      {" "}
                      <CircleSvg />
                      Low Price Guarantee
                    </li>
                    <li>
                      {" "}
                      <CircleSvg />7 Days Warranty
                    </li>
                  </ul>
                  <div className="btn"></div>
                </p>
                <img
                  src="https://templatekit.jegtheme.com/shoelace/wp-content/uploads/sites/191/2021/10/unrecognizable-girl-in-white-sneakers-on-trendy-yellow-striped-background-1536x1536.jpg"
                  alt=""
                  className="h-60 w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="process">
        <Container>
          <div className="head">
            <span>{process.span}</span>
            <h3>{process.h3}</h3>
            <div className="inner">
              {process.array.map((data: any) => {
                return (
                  <div className="card" key={data.id}>
                    <span>0{data.id}</span>
                    <h5>{data.title}</h5>
                    <p>{data.p}</p>
                    <div className="icon">{data.icon}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

const hero = {
  span: "Welcome, SMI Shoe Store",
  h1: "Keeping Your Favorite Shoes in The Best Performance",
  p: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa amet suscipit repellendus vel sed error aperiam et neque officia non.",
  btn: "Get Started",
  array: [
    {
      id: 0,
      imgSrc:
        "https://askproject.net/shoecare/wp-content/uploads/sites/31/2021/09/african-sportsman-tying-shoes-6HE9F45.jpg",
      title: "",
    },
    {
      id: 1,
      imgSrc:
        "https://askproject.net/shoecare/wp-content/uploads/sites/31/2021/09/african-sportsman-tying-shoes-6HE9F45.jpg",
      title: "",
    },
    {
      id: 2,
      imgSrc:
        "https://askproject.net/shoecare/wp-content/uploads/sites/31/2021/09/african-sportsman-tying-shoes-6HE9F45.jpg",
      title: "",
    },
  ],
};

const process = {
  span: "Our Process",
  h3: "Stay at Home, We Make it Done for you.",
  array: [
    {
      id: 1,
      icon: <FaPhone />,
      title: "Contact for Order",
      p: "Lorem Ipsum is simply dummy text of the printing an typesetting industry.",
    },
    {
      id: 2,
      icon: <FaBus />,
      title: "Pick Up Order",
      p: "Lorem Ipsum is simply dummy text of the printing an typesetting industry.",
    },
    {
      id: 3,
      icon: <FaBus />,
      title: "Clean Your Shoes",
      p: "Lorem Ipsum is simply dummy text of the printing an typesetting industry.",
    },
    {
      id: 4,
      icon: <FaBus />,
      title: "Deliver to You",
      p: "Lorem Ipsum is simply dummy text of the printing an typesetting industry.",
    },
  ],
};

export function CircleSvg() {
  return (
    <div className="bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center mr-2">
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
    </div>
  );
}
