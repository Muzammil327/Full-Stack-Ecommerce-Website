"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/elements/Logo";
import Container from "@/src/components/ui/Container";
import Auth from "@/src/components/layout/Navbar/auth";
import AuthMobile from "./authMobile";
import { FaHeart } from "react-icons/fa6";
import LoadingLink from "@/src/components/ui/Loading/LoadingLink";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaShoppingBasket,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";

export interface Page {
  name: string;
  href: string;
}

export default function NavbarView({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  const { isFetching, cart } = useCart();
  const { isFetchingWishList, wishList } = useWishlist();

  return (
    <section className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={setOpen}>
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
                <div className="flex pb-2 px-4 absolute top-4 right-0">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <FaTimes />
                  </button>
                </div>

                {/* Links */}
                {/* <Tab.Group as="div" className="mt-12">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item: CategoryItem) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div
                              // className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                              >
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                  height={500}
                                  width={500}
                                />
                              </div>
                              <Link
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                                onClick={() => setOpen(false)}
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section: CategorySection) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map(
                                (item: CategorySectionItems) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      href={item.href}
                                      className="-m-2 block p-2 text-gray-500"
                                      onClick={() => setOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group> */}

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page: Page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <AuthMobile userId={userId} setOpen={setOpen} />
                <div className="px-4 border-t border-gray-200 py-6">
                  <ul className="flex gap-4">
                    <li>
                      <Link href="/">
                        <FaFacebook />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="relative bg-white border-b border-gray-200">
        <Container>
          <div className="">
            <div className="flex items-center py-3">
              <button
                type="button"
                className="fixed top-32 right-0 p-2 lg:hidden btnIcon_outline_2 z-40"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <FaBars />
              </button>
              <div>
                <Logo />
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-4">
                  {/* {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute z-50 inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-gray-300">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-8">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map(
                                        (item: CategoryItem) => (
                                          <div
                                            key={item.name}
                                            className="group relative text-base sm:text-sm"
                                          >
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <Image
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                                height={300}
                                                width={300}
                                              />
                                            </div>
                                            <Link
                                              href={item.href}
                                              className="mt-6 block font-medium text-gray-900"
                                              onClick={close}
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </Link>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map(
                                        (section: CategorySection) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map(
                                                (
                                                  item: CategorySectionItems
                                                ) => (
                                                  <li
                                                    key={item.name}
                                                    className="flex"
                                                  >
                                                    <Link
                                                      href={item.href}
                                                      className="hover:text-gray-800"
                                                      onClick={close}
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))} */}

                  {navigation.pages.map((page: Page) => (
                    <LoadingLink
                      link={page.href}
                      class_name="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      key={page.name}
                    >
                      {page.name}
                    </LoadingLink>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <Auth userId={userId} />

                {/* Search */}
                {/* <div className="flex lg:ml-2">
                  <Link
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <FaSearch />
                    <span className="sr-only">Search</span>
                  </Link>
                </div> */}

                {/* Cart */}
                <div className="mr-2 flow-root md:ml-6 relative">
                  <LoadingLink
                    link="/cart"
                    class_name="group -m-2 flex items-center p-2 text-xl btnIcon_outline_2"
                  >
                    <FaShoppingBasket />
                    <span className="ml-2 absolute -top-4 -right-4 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
                      {isFetching ? (
                        <span className="sr-only">items in cart, view bag</span>
                      ) : (
                        <>{cart && cart.length}</>
                      )}
                    </span>{" "}
                  </LoadingLink>
                </div>

                {/* Fvourite */}
                <div className="ml-4 flow-root lg:ml-6 relative">
                  <LoadingLink
                    link="/wishlist"
                    class_name="group text-2xl -m-2 flex items-center p-2 btnIcon_outline_2"
                  >
                    <FaHeart />
                    <span className="ml-2 absolute -top-4 -right-4 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
                      {isFetchingWishList ? (
                        <span className="sr-only">
                          items in wishList, view bag
                        </span>
                      ) : (
                        <>{wishList && wishList.length}</>
                      )}
                    </span>{" "}
                  </LoadingLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

const navigation = {
  // categories: [
  //   {
  //     id: "women",
  //     name: "Women",
  //     featured: [
  //       {
  //         name: "New Arrivals",
  //         href: "#",
  //         imageSrc:
  //           "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
  //         imageAlt:
  //           "Models sitting back to back, wearing Basic Tee in black and bone.",
  //       },
  //       {
  //         name: "Basic Tees",
  //         href: "#",
  //         imageSrc:
  //           "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
  //         imageAlt:
  //           "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
  //       },
  //     ],
  //     sections: [
  //       {
  //         id: "clothing",
  //         name: "Clothing",
  //         items: [
  //           { name: "Tops", href: "#" },
  //           { name: "Dresses", href: "#" },
  //           { name: "Pants", href: "#" },
  //           { name: "Denim", href: "#" },
  //           { name: "Sweaters", href: "#" },
  //           { name: "T-Shirts", href: "#" },
  //           { name: "Jackets", href: "#" },
  //           { name: "Activewear", href: "#" },
  //           { name: "Browse All", href: "#" },
  //         ],
  //       },
  //       {
  //         id: "accessories",
  //         name: "Accessories",
  //         items: [
  //           {
  //             name: "Watches",
  //             href: "/catgeory/watches?category=women&subcategory=accessories",
  //           },
  //           { name: "Wallets", href: "#" },
  //           { name: "Bags", href: "#" },
  //           { name: "Sunglasses", href: "#" },
  //           { name: "Hats", href: "#" },
  //           { name: "Belts", href: "#" },
  //         ],
  //       },
  //       {
  //         id: "brands",
  //         name: "Brands",
  //         items: [
  //           { name: "Full Nelson", href: "#" },
  //           { name: "My Way", href: "#" },
  //           { name: "Re-Arranged", href: "#" },
  //           { name: "Counterfeit", href: "#" },
  //           { name: "Significant Other", href: "#" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: "men",
  //     name: "Men",
  //     featured: [
  //       {
  //         name: "New Arrivals",
  //         href: "#",
  //         imageSrc:
  //           "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
  //         imageAlt:
  //           "Drawstring top with elastic loop closure and textured interior padding.",
  //       },
  //       {
  //         name: "Artwork Tees",
  //         href: "#",
  //         imageSrc:
  //           "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
  //         imageAlt:
  //           "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  //       },
  //     ],
  //     sections: [
  //       {
  //         id: "clothing",
  //         name: "Clothing",
  //         items: [
  //           { name: "Tops", href: "#" },
  //           { name: "Pants", href: "#" },
  //           { name: "Sweaters", href: "#" },
  //           { name: "T-Shirts", href: "#" },
  //           { name: "Jackets", href: "#" },
  //           { name: "Activewear", href: "#" },
  //           { name: "Browse All", href: "#" },
  //         ],
  //       },
  //       {
  //         id: "accessories",
  //         name: "Accessories",
  //         items: [
  //           { name: "Watches", href: "#" },
  //           { name: "Wallets", href: "#" },
  //           { name: "Bags", href: "#" },
  //           { name: "Sunglasses", href: "#" },
  //           { name: "Hats", href: "#" },
  //           { name: "Belts", href: "#" },
  //         ],
  //       },
  //       {
  //         id: "brands",
  //         name: "Brands",
  //         items: [
  //           { name: "Re-Arranged", href: "#" },
  //           { name: "Counterfeit", href: "#" },
  //           { name: "Full Nelson", href: "#" },
  //           { name: "My Way", href: "#" },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  pages: [
    { name: "Home", href: "/" },
    { name: "Stores", href: "/stores" }
  ],
};
