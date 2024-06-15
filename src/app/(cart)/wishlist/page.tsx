"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Favourite_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/src/components/contexts/cartContext";
import { useAuth } from "@/src/components/contexts/authContext";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const { errorWishList, loadingWishList, getToWishlistBtn, wishList } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { session } = useAuth();
  const router = useRouter();

  const DeleteHandle = async (productId: string) => {
    try {
      setIsLoading(true);
      if (session) {
        await axios.delete(`${Favourite_API_Endpoint}/delete/${productId}`);
        await getToWishlistBtn();
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      setError("Error removing product from wishlist. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  if (!session) {
    return router.push("/sign-in");
  }
  return (
    <>
      <Container>
        <div className="my-20">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            {error && (
              <>
                <span>{error}</span>
              </>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              {loadingWishList && isLoading ? (
                <>
                  <LoadingCart />
                  <LoadingCart />
                  <LoadingCart />
                  <LoadingCart />
                </>
              ) : (
                <>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        <span className="sr-only">Image</span>
                        Image
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Name
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Price
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorWishList && errorWishList}
                    {wishList ? ( // Check if userData is not null before rendering
                      wishList.map((user, index) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="md:px-6 px-2 py-2">
                            <Image
                              src={user.product_Detail.image}
                              alt={user.product_Detail.name}
                              title={user.product_Detail.name}
                              height={1080}
                              width={1080}
                              className="h-20 w-20 mx-auto"
                              objectFit="cover"
                            />
                          </td>
                          <td className="md:px-6 px-2 py-4 font-semibold text-gray-900">
                            <Link href={`/stores/${user.product_Detail.slug}`}>
                              {user.product_Detail.name}
                            </Link>
                          </td>
                          <td className="md:px-6 px-2 py-4 font-semibold text-gray-900">
                            {user.product_Detail.price -
                              user.product_Detail.discountprice}
                          </td>
                          <td className="md:px-6 px-2 py-4">
                            <button
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={() => DeleteHandle(user._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>NO user WishList...</p>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductList;
