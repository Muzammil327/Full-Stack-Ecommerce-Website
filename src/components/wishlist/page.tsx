"use client";
import Image from "next/image";
import Link from "next/link";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { useWishlist } from "@/src/components/context/wishlistContext";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";
import { Table, Button, Container } from "@/src/components/ui/ui";

const WishlistView = () => {
  const { isFetchingWishList, wishList, getToWishlistBtn } = useWishlist();

  // ----------------------- DELETE WISHLIST -------------------------------------------

  const DeleteHandle = async (wishlistId: string) => {
    try {
      const response = await axios.delete(
        `/api/wishlist?wishlistId=${wishlistId}`
      );
      if (response.data.statusbar === 200) {
        getToWishlistBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <section>
      <Container>
        <div className="my-20">
          <Table
            data={{
              t1: "Image",
              t2: "Name",
              t3: "Price",
              t4: "Action",
            }}
          >
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
                {wishList ? (
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
                        {user.product_Detail.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          className="button_simple px-3"
                          onClick={() => DeleteHandle(user._id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No WishList...</p>
                )}
              </React.Fragment>
            )}
          </Table>
        </div>
      </Container>
    </section>
  );
};

export default WishlistView;
