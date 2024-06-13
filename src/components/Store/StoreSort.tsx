import React, { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import StoreCatgeory from "@/src/components/Store/StoreCatgeory";
import StoreSubCatgeory from "@/src/components/Store/StoreSubCatgeory";
import StorePrice from "@/src/components/Store/StorePrice";
import StoreTags from "@/src/components/Store/StoreTags";

export interface StoreSortProps {
  filterItemsLH: (value: string) => void;
  filterItemsHL: (value: string) => void;
  setPage: (page: number) => void;
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  setTags: (tags: string) => void;
  setHighPrice: (price: number | null) => void;
  setLowPrice: (price: number | null) => void;
  category: string;
  subCategory: string;
}

export default function StoreSort({
  filterItemsLH,
  filterItemsHL,
  setPage,
  setCategory,
  setSubCategory,
  setTags,
  setHighPrice,
  setLowPrice,
  category,
  subCategory,
}: StoreSortProps) {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const HighPrice = (value: number) => {
    setHighPrice(value);
    setPage(1);
  };
  const LowPrice = (value: number) => {
    setLowPrice(value);
    setPage(1);
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              id="menu-button"
              aria-expanded={isSortOpen}
              aria-haspopup="true"
            >
              Sort
              <svg
                className={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Sort options */}
          <div
            className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isSortOpen ? "" : "hidden"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <ul className="py-1" role="none">
              <li
                className="text-gray-500 block cursor-pointer px-4 py-2 text-sm"
                onClick={() => {
                  filterItemsHL("");
                  filterItemsLH("pricelowtohigh");
                  setIsSortOpen(false);
                }}
              >
                Price: Low to High{" "}
              </li>
              <li
                className="text-gray-500 block cursor-pointer px-4 py-2 text-sm"
                onClick={() => {
                  filterItemsLH("");
                  filterItemsHL("pricehightolow");
                  setIsSortOpen(false);
                }}
              >
                Price: High to Low{" "}
              </li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open menu</span>
          <FaBars size={24} />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 absolute top-4 right-0">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <FaXmark size={24} />
                  </button>
                </div>
                {/* Links */}
                <div className="mt-12 px-4">
                  <StoreCatgeory
                    filterItem={(value: string) => {
                      setCategory(value.toLowerCase());
                      setPage(1);
                      setOpen(false);
                    }}
                  />
                  <StoreSubCatgeory
                    filterItem={(value: string) => {
                      setSubCategory(value.toLowerCase());
                      setPage(1);
                      setOpen(false);
                    }}
                    catgeorySet={category}
                  />
                  <StoreTags
                    filterItem={(value: string) => {
                      setTags(value.toLowerCase());
                      setPage(1);
                      setOpen(false);
                    }}
                    catgeorySet={category}
                    subCatgeorySet={subCategory}
                  />
                  <StorePrice
                    filterItem={(lowPrice: number, highPrice: number) => {
                      LowPrice(lowPrice);
                      HighPrice(highPrice);
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
