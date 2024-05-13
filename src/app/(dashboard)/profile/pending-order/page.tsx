"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PENDINGORDER_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/src/components/contexts/cartContext";
import { useAuth } from "@/src/components/contexts/authContext";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";

const ProductList = () => {
  const { errorpOrder, loadingpOrder, getToPendingOrderBtn, pOrder } =
    useCart();
  const [error, setError] = useState("");
  const { session } = useAuth();

  const DeleteHandle = async (productId: string) => {
    try {
      if (session) {
        await axios.delete(`${PENDINGORDER_API_Endpoint}/delete/${productId}`);
        await getToPendingOrderBtn();
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      setError("Error removing product from cart. Please try again later.");
    }
  };

  return (
    <>
      <Container>
        <div className="my-20">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              {loadingpOrder ? (
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
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorpOrder && errorpOrder}
                    {pOrder ? ( // Check if userData is not null before rendering
                      pOrder.map((user, index) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="p-4">
                            <Image
                              src={`https://res.cloudinary.com/desggllml/image/upload/v1714240538/${user.product_Detail.image}.png`}
                              alt={user.product_Detail.name}
                              title={user.product_Detail.name}
                              height={1080}
                              width={1080}
                              className="w-full block h-20"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            <Link href={`/stores/${user.product_Detail.slug}`}>
                              {user.product_Detail.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {user.product_Detail.price}
                          </td>
                          <td className="px-6 py-4">
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
