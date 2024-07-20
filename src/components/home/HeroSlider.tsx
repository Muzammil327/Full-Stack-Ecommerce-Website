"use client";
import React, { useState, Fragment } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { categories } from "@/src/components/data";

// Import Swiper styles
import "swiper/css";
import { FaChevronRight } from "react-icons/fa6";
import { Transition } from "@headlessui/react";
import {
  Button,
  Container,
  ImageContainer,
  Links,
} from "@/src/components/ui/ui";

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
    <Container>
      <div className="grid lg:grid-cols-7 items-start gap-4 border-b border-gray-200 my-2">
        <div className="lg:flex items-center w-full gap-4 hidden lg:col-span-2">
          <CatgeoryButtonDesktop />
        </div>
        <Swiper
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
          className="mySwiper md:mt-0 mt-3 lg:col-span-5 w-full"
        >
          <SwiperSlide className="w-full h-auto">
            <ImageContainer
              src="/slider/headphones.png"
              alt="Headphones"
              priority
              sizes="(max-width: 1600px) 90vw, 600px"
              width={1600}
              height={720}
            />
          </SwiperSlide>
          <SwiperSlide className="w-full h-auto">
            <ImageContainer
              src="/slider/airpods.png"
              alt=""
              width={1600}
              height={720}
              sizes="(max-width: 1600px) 90vw, 600px"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full h-auto">
            <ImageContainer
              src="/slider/shoes.png"
              alt=""
              sizes="(max-width: 1600px) 90vw, 600px"
              width={1600}
              height={720}
            />
          </SwiperSlide>
          <SwiperSlide className="w-full h-auto">
            <Image
              src="/slider/watches.png"
              alt=""
              width={1600}
              height={720}
              sizes="(max-width: 1600px) 90vw, 600px"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
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
    <CatgeoryLayout
      cat={cat}
      setCat={setCat}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubCategory={selectedSubCategory}
      setSelectedSubCategory={setSelectedSubCategory}
    />
  );
}

function CatgeoryButtonDesktop() {
  const [cat, setCat] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  return (
    <CatgeoryLayout
      cat={cat}
      setCat={setCat}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubCategory={selectedSubCategory}
      setSelectedSubCategory={setSelectedSubCategory}
    />
  );
}

function CatgeoryLayout({
  cat,
  setCat,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: any) {
  return (
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
          <ul className="absolute left-0 right-0 top-12 z-50 bg-slate-100 flex flex-col">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between border-b-2 py-4 px-5"
              >
                <span
                  className="block font-medium text-gray-900 cursor-pointer"
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
          <ul className="absolute left-0 right-0 top-12 z-50 bg-gray-100 flex flex-col">
            <li className="flex items-center justify-between border-b-2 py-5 px-5">
              <span
                className="-m-2 block font-medium text-gray-900 cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                &larr; Back
              </span>
            </li>
            {selectedCategory?.subCategories.map((subCategory: any) => (
              <li
                key={subCategory.id}
                className="flex items-center justify-between border-b-2 py-5 px-5"
              >
                <span
                  className="-m-2 block font-medium text-gray-900 cursor-pointer"
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
          <ul className="absolute left-0 right-0 top-12 z-50 bg-gray-100 flex flex-col">
            <li className="flex items-center justify-between border-b-2 py-5 px-5">
              <span
                className="-m-2 block font-medium text-gray-900 cursor-pointer"
                onClick={() => setSelectedSubCategory(null)}
              >
                &larr; Back
              </span>
            </li>
            {selectedSubCategory?.tags?.map((tag: any) => (
              <li
                key={tag.id}
                className="flex items-center justify-between border-b-2 py-5 px-5"
              >
                <Links
                  slug="/"
                  title="product cageory name or list"
                  className="-m-2 block font-medium text-gray-900 cursor-pointer"
                >
                  {tag.name}
                </Links>
              </li>
            ))}
          </ul>
        </Transition.Child>
      </Transition>
    </div>
  );
}
