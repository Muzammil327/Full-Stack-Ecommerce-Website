"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { useWishlist } from "@/src/components/context/wishlistContext";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";

const WishlistView = () => {
  const { isFetchingWishList, wishList, getToWishlistBtn } = useWishlist();

  // ----------------------- DELETE WISHLIST -------------------------------------------

  const DeleteHandle = async (wishlistId: string) => {
    try {
      const response = await axios.delete(
        `/api/wishlist?wishlistId=${wishlistId}`
      );
      if (response.data.statusbar === 200) {
        await getToWishlistBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    } finally {
    }
  };

  return (
    <>
      <Container>
        <div className="my-20">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-12 py-2">
                    Image
                  </th>
                  <th scope="col" className="px-20 py-2 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-20 py-2">
                    Price
                  </th>
                  <th scope="col" className="px-20 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isFetchingWishList ? (
                  Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td colSpan={5}>
                          <LoadingCart />
                        </td>
                      </tr>
                    ))
                ) : (
                  <React.Fragment>
                    {wishList ? ( // Check if userData is not null before rendering
                      wishList.map((user, index) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="p-3">
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
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            <Link href={`/stores/${user.product_Detail.slug}`}>
                              {user.product_Detail.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                            {user.product_Detail.price -
                              user.product_Detail.discountprice}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="font-medium t1 hover:underline"
                              onClick={() => DeleteHandle(user._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No WishList...</p>
                    )}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WishlistView;
