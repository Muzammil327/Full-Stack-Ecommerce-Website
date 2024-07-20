"use client";
import React, { useState, Fragment } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { categories } from "@/src/components/data";

// Import Swiper styles
import "swiper/css";
import Container from "../ui/Container";
import { FaChevronRight } from "react-icons/fa6";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { Button, Links } from "@/src/components/ui/ui";

interface Tag {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  tags?: Tag[];
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export default function HeroSlider() {
  return (
    <section className="border-b border-gray-200 my-2">
      <Container>
        <div className="grid lg:grid-cols-7 items-start gap-4">
          <div className="lg:flex items-center w-full gap-4 hidden lg:col-span-2">
            <CatgeoryButton />
          </div>
          <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay]}
            className="mySwiper md:mt-0 mt-3 lg:col-span-5 w-full"
          >
            <SwiperSlide>
              <Image
                src="/slider/headphones.png"
                sizes="(max-width: 1600px) 90vw, 600px"
                alt=""
                title=""
                height={720}
                width={1600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/slider/airpods.png"
                sizes="(max-width: 1600px) 90vw, 600px"
                alt=""
                title=""
                height={720}
                width={1600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/slider/shoes.png"
                sizes="(max-width: 1600px) 90vw, 600px"
                alt=""
                title=""
                height={720}
                width={1600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/slider/watches.png"
                sizes="(max-width: 1600px) 90vw, 600px"
                alt=""
                title=""
                height={720}
                width={1600}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Container>
    </section>
  );
}

export function CatgeoryButton() {
  const [cat, setCat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  return (
    <>
      <div className="w-full relative">
        <Button
          className="button_solid w-full !py-2 capitalize"
          onClick={() => {
            setCat(!cat);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
          }}
        >
          Categories
        </Button>

        <Transition show={cat && !selectedCategory} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ul className="absolute left-0 right-0 top-12 z-50 bg-gray-100 flex flex-col space-y-6 p-8">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between"
                >
                  <span
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.name}
                  </span>
                  <span>
                    <FaChevronRight />
                  </span>
                </li>
              ))}
            </ul>
          </Transition.Child>
        </Transition>

        <Transition
          show={!!selectedCategory && !selectedSubCategory}
          as={Fragment}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ul className="absolute left-0 right-0 top-12 z-50 bg-gray-100 flex flex-col space-y-6 p-8">
              <li className="flex items-center justify-between">
                <span
                  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  &larr; Back
                </span>
              </li>
              {selectedCategory?.subCategories.map((subCategory) => (
                <li
                  key={subCategory.id}
                  className="flex items-center justify-between"
                >
                  <span
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    onClick={() => setSelectedSubCategory(subCategory)}
                  >
                    {subCategory.name}
                  </span>
                  <span>
                    <FaChevronRight />
                  </span>
                </li>
              ))}
            </ul>
          </Transition.Child>
        </Transition>

        <Transition show={selectedSubCategory !== null} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ul className="absolute left-0 right-0 top-12 z-50 bg-gray-100 flex flex-col space-y-6 p-8">
              <li className="flex items-center justify-between">
                <span
                  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  onClick={() => setSelectedSubCategory(null)}
                >
                  &larr; Back
                </span>
              </li>
              {selectedSubCategory?.tags?.map((tag) => (
                <li key={tag.id} className="flex items-center justify-between">
                  <Links
                    slug="/"
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  >
                    {tag.name}
                  </Links>
                </li>
              ))}
            </ul>
          </Transition.Child>
        </Transition>
      </div>
    </>
  );
}
