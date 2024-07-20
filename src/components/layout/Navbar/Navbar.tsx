"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/elements/Logo";
import Container from "@/src/components/ui/Container";
import Auth from "@/src/components/layout/Navbar/auth";
import AuthMobile from "./authMobile";
import { FaHeart } from "react-icons/fa6";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaShoppingBasket,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";
import { SearchIcon } from "./search";
import { CatgeoryButton } from "../../home/HeroSlider";
import { Links, Button, ImageContainer } from "@/src/components/ui/ui";

export interface Page {
  name: string;
  href: string;
}

export default function NavbarView({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  const { isFetching, cart } = useCart();
  const { isFetchingWishList, wishList } = useWishlist();

  return (
    <section className="bg-white border-b">
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

                <div className="p-6">
                  <Logo />
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-8">
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

      {/* Desktop menu */}
      <div className="relative">
        <Container>
          <div className="flex items-center py-3">
            <div className="relative xl:w-[250px] lg:w-[200px] sm:w-[170px] w-[130px] h-auto">
              <ImageContainer
                src="/smi-logo.png"
                alt="SMI shop"
                height={91}
                width={400}
                className="w-full h-auto"
                sizes="(max-width: 200px) 100vw, 400px"
                priority
              />
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-10">
                {navigation.pages.map((page: Page) => (
                  <Links
                    slug={page.href}
                    className="flex items-center text-sm font-medium"
                    key={page.name}
                  >
                    {page.name}
                  </Links>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              <Auth userId={userId} />

              {/* Cart */}
              <div className="md:ml-6 relative">
                <Button className="button_outline md:!p-3 !p-2">
                  <Link href="/cart">
                    <FaShoppingBasket size={17} />
                    <span className="ml-2 absolute -top-2 -right-2 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
                      {isFetching ? (
                        <span className="sr-only">items in cart, view bag</span>
                      ) : (
                        <>{cart && cart.length}</>
                      )}
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Fvourite */}
              <div className="ml-4 relative">
                <Button className="button_outline md:!p-3 !p-2">
                  <Link href="/wishlist">
                    <FaHeart size={17} />
                    <span className="ml-2 absolute -top-2 -right-2 rounded-full md:h-5 h-4 bg1 md:w-5 w-4 flex items-center justify-center text-sm font-medium text-white">
                      {isFetchingWishList ? (
                        <span className="sr-only">
                          items in wishList, view bag
                        </span>
                      ) : (
                        <>{wishList && wishList.length}</>
                      )}
                    </span>{" "}
                  </Link>
                </Button>
              </div>
              {/* Search */}
              <div className="ml-4 relative">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="lg:hidden flex items-center w-full gap-4">
            <CatgeoryButton />
            <Button
              onClick={() => setOpen(true)}
              className="button_solid !py-4 !px-4"
            >
              <FaBars />
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Stores", href: "/stores" },
    { name: "Blogs", href: "/" },
    { name: "Contact", href: "/" },
  ],
};
