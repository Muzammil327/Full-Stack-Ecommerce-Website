"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import ProductDetailImageSlider from "@/src/components/productDetail/components/ImageSlider";
import ProductDetailCatgeory, {
  ProductDetailItems,
} from "@/src/components/productDetail/components/catgeory";
import AddtoCartBtn from "@/src/components/productDetail/components/AddtoCartBtn";
import FavouriteBtn from "@/src/components/productDetail/components/FavouriteBtn";
import RelatedProduct from "@/src/components/productDetail/components/RelatedProduct";

import {
  Button,
  Container,
  Input,
  Label,
  Processing,
} from "@/src/components/ui/ui";
import axios from "axios";
import ShareButton from "@/src/components/productDetail/components/shareButton";
import ProductDetailTab from "@/src/components/productDetail/components/Tabs";
import LikeBtn from "@/src/components/productDetail/components/LikeBtn";
import DisLikeBtn from "@/src/components/productDetail/components/DisLikeBtn";
import { FcPaid } from "react-icons/fc";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Textarea from "../ui/textarea";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

export interface ProductCardData {
  _id: string;
  name: string;
  Sdescription: string;
  Ldescription: string;
  slug: string;
  cat: [];
  color_details: [];
  scat: [];
  subCategory: string;
  item: [];
  price: number;
  dPrice?: number;
  quantity: number;
  image: string;
  slider: [];
  keywords: [];
  size: [];
  productId: [];
  like: [];
  dislike: [];
  reviews: [];
}

export default function ProductDetail({
  params,
  userId,
}: {
  params: string;
  userId: string;
}) {
  const [data, setData] = useState<ProductCardData>();
  let [isOpen, setIsOpen] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const [selectedColor, setSelectedColor] = useState("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/${params}`);
      setData(response.data.singleProduct);
    } catch (error) {
      console.log(error);
      setError("Error Store PRODUCTS");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, params]);

  const handleColorChange = (event: any) => {
    // Get the value of the selected radio button
    const selectedValue = event.target.value;

    // Perform any logic needed, such as updating state
    setSelectedColor(selectedValue);
  };

  // Determine if color_details is an empty array
  const isColorDetailsEmpty =
    data &&
    Array.isArray(data.color_details) &&
    data.color_details.length === 0;

  // Check if a color is selected
  const hasSelectedColor = selectedColor !== null;

  return (
    <>
      {error && <h1>Error fetching Product Detail data...</h1>}

      {loading ? (
        <div className="relative border rounded-md">
          <Container>
            <div className="grid lg:grid-cols-9 grid-cols-1 my-8 md:gap-5 gap-4 animate-pulse">
              {/* image  */}
              <div className="lg:col-span-3 w-full h-auto aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <div className="rounded"></div>
              </div>
              <div className="lg:col-span-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-slate-700 rounded w-2/12"></div>
                  <div className="h-6 bg-slate-700 rounded w-2/12"></div>
                </div>
                <div className="h-10 bg-slate-700 rounded w-full my-2"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-slate-700 rounded w-3/12"></div>
                  <div className="h-8 bg-slate-700 rounded w-5/12"></div>
                </div>{" "}
                <div className="h-40 bg-slate-700 rounded w-full mt-4 mb-4"></div>
                <div className="my-5 grid grid-cols-4 items-center justify-between gap-2">
                  <div className="bg-slate-700 col-span-1 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 col-span-1 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 col-span-1 h-12 transition-all py-3 px-6 rounded-md"></div>
                  <div className="bg-slate-700 col-span-1 h-12 transition-all py-3 px-6 rounded-md"></div>
                </div>
                <div className="h-12 bg-slate-700 rounded w-full mt-4 mb-4"></div>
              </div>
              <div className="lg:col-span-2 bg-gray-200 px-2 flex flex-col justify-between">
                <div>
                  <div className="h-7 bg-slate-700 rounded w-full my-2"></div>
                  <div className="h-7 bg-slate-700 rounded w-full my-2"></div>
                </div>
                <div className="md:mt-auto mt-8 mx-auto flex flex-col w-full">
                  <div className="h-10 bg-slate-700 rounded w-full my-1"></div>
                  <div className="h-10 bg-slate-700 rounded w-full my-1"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <>
          <section>
            {data && (
              <Container>
                <div className="grid lg:grid-cols-9 grid-cols-1 my-8 md:gap-5 gap-4">
                  {/* -------------------------- Product Image Slider -------------------------- */}
                  <div className="slider lg:col-span-3">
                    <ProductDetailImageSlider data={data} />
                  </div>

                  <div className="lg:col-span-4">
                    {/* -------------------------- Catgeory -------------------------- */}
                    <ProductDetailCatgeory data={data} />

                    {/* -------------------------- Product Name -------------------------- */}
                    <h1 className="md:text-2xl text-xl font-bold my-3 capitalize">
                      {data.name}
                    </h1>

                    {/* -------------------------- Product Price -------------------------- */}
                    <div className="price flex gap-4 items-center">
                      <span className="line-through font-semibold text-xl text-gray-700">
                        Rs{data.price}.00
                      </span>
                      <span className="font-semibold text-indigo-500 text-2xl">
                        Rs{data.dPrice}.00
                      </span>
                    </div>

                    {/* -------------------------- Product Short Description -------------------------- */}
                    <p className="my-2 sm:text-base text-sm text-gray-500">
                      {data.Sdescription}
                    </p>

                    {/* ------------- Size ------------- */}
                    {data.color_details && (
                      <div className="mt-2 grid grid-cols-4 gap-4">
                        {data.color_details.map((data: any, index) => {
                          return (
                            <label
                              key={index}
                              className={`group relative flex cursor-pointer items-center justify-center rounded-md border ${
                                selectedColor === data.name
                                  ? "border-indigo-500"
                                  : "border-gray-300"
                              } bg-white px-1 py-1 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1`}
                            >
                              <input
                                type="radio"
                                name="size-choice"
                                value={data.name}
                                onChange={handleColorChange}
                                checked={selectedColor === data.name}
                                className="sr-only"
                                id={`size-${data.name}`} // Adding an ID for better accessibility
                              />
                              <span>{data.name}</span>
                              <span
                                className="pointer-events-none absolute inset-0 rounded-md"
                                aria-hidden="true"
                              ></span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* ------------- Product Button ------------- */}
                    <div className="mt-2 max-w-full flex flex-wrap md:gap-3 gap-2 flex-col">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                          <FavouriteBtn product={data._id} userId={userId} />
                        </div>
                        <div className="col-span-1">
                          <LikeBtn
                            fetchProduct={fetchProduct}
                            datas={data}
                            userId={userId}
                          />
                        </div>
                        <div className="col-span-1">
                          <DisLikeBtn
                            fetchProduct={fetchProduct}
                            datas={data}
                            userId={userId}
                          />
                        </div>{" "}
                        <div className="col-span-1">
                          <ShareButton urlCurrentPage={params} />
                        </div>
                      </div>
                      <div className="items-center justify-between !w-full">
                        {isColorDetailsEmpty ? (
                          <AddtoCartBtn
                            product={data._id}
                            userId={userId}
                            color={selectedColor}
                            data={data}
                          />
                        ) : selectedColor ? (
                          <AddtoCartBtn
                            product={data._id}
                            userId={userId}
                            color={selectedColor}
                            data={data}
                          />
                        ) : (
                          <Button variant="solid" className="w-full">
                            Select Color
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <div className="return flex items-center px-2">
                        <span className="text-gray-500">
                          <FcPaid />
                        </span>
                        <span className="ml-4 text-xs">
                          Cash on Delivery Available
                        </span>
                      </div>
                      <hr className="my-3" />

                      <div className="return flex items-center px-2">
                        <span className="text-gray-500">
                          <FcPaid />
                        </span>
                        <span className="ml-4 text-xs">Free shipping</span>
                      </div>
                      <hr className="my-3" />
                      <ProductDetailItems data={data} />
                    </div>

                    <div className="md:mt-auto mt-8 mx-auto flex gap-4 flex-col w-full">
                      <div className="w-full">
                        <Button className="block w-full">
                          <Link
                            href={`https://smishopmart.vercel.app/stores/${params}/`}
                          >
                            Order On WhatsApp
                          </Link>
                        </Button>
                      </div>
                      <div className="w-full">
                        <Button onClick={open} className="block w-full">
                          Ask a question
                        </Button>
                        <AskQuestionForm close={close} isOpen={isOpen} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs  */}
                <ProductDetailTab data={data} />

                {/* Related Products  */}
                <h1 className="text-2xl font-semibold my-12">
                  Similar Products
                </h1>
                <RelatedProduct relatedProducts={data} />
              </Container>
            )}
          </section>
        </>
      )}
    </>
  );
}

function AskQuestionForm({ close, isOpen }: any) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Validation logic for the phone number
  const isValidPhoneNumber = (phone: string): boolean => {
    // Example regex for US phone number format: (123) 456-7890, 123-456-7890, 1234567890
    const phoneRegex = /^03\d{9}$/; // 03 followed by exactly 9 digits
    return phoneRegex.test(phone);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    setPhone(newPhone);

    // Validate the phone number
    if (isValidPhoneNumber(newPhone)) {
      setError(""); // Clear error if phone number is valid
    } else {
      setError("Invalid phone number format.");
    }
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    console.log(name, email, phone, message);
    if (!name || !email || !phone || !message) {
      setLoading(false);
      return toast.error("Fields are required.");
    }

    try {
      const response = await axios.post("/api/form/askQuestionForm", {
        name,
        email,
        phone,
        message,
      });
      if (response.data.statusbar === 400) {
        toast.error(response.data.error);
      } else {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        close();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-md rounded-xl bg-slate-200 p-6 duration-300 ease-out data-[closed]:transform-[scale(50%)]"
          >
            <Button className="absolute top-1 right-2" onClick={close}>
              <FaTimes />
            </Button>
            <DialogTitle
              as="h3"
              className="text-xl font-medium text-black text-center"
            >
              Ask a question
            </DialogTitle>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <form onSubmit={HandleSubmit}>
              <div>
                <Label label="Name:" htmlFor="name" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="Enter your Name"
                />
              </div>
              <div>
                <Label label="Email:" htmlFor="email" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Enter your Email"
                />
              </div>

              <div>
                <Label label="Phone Number:" htmlFor="phone" />
                <Input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  ariaLabel="Phone Number"
                  min={11}
                  className={error ? "border-red-500" : ""}
                />
              </div>
              <div>
                <Label label="Message:" htmlFor="message" />
                <Textarea
                  value={message}
                  name="message"
                  placeholder="Enter Your Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  type="submit"
                  disabled={loading}
                  title="sign in"
                >
                  {loading ? <Processing /> : "Got it, thanks!"}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
