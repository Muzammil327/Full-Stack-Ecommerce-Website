"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ORDER_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import { useCart } from "@/src/components/contexts/cartContext";
import { useAuth } from "@/src/components/contexts/authContext";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { FaSquareCheck } from "react-icons/fa6";

const ProductList = () => {
  const { errorOrder, loadingOrder, getToOrderBtn, order } = useCart();

  const [error, setError] = useState("");
  const { session } = useAuth();

  const DeleteHandle = async (productId: string) => {
    try {
      if (session) {
        await axios.delete(`${ORDER_API_Endpoint}/delete/${productId}`);
        await getToOrderBtn();
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
              {loadingOrder ? (
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
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorOrder && errorOrder}
                    {order ? ( // Check if userData is not null before rendering
                      order.map((user, index) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="p-4">
                            <Image
                              src={`https://res.cloudinary.com/desggllml/image/upload/v1714240538/${user.product.image}.png`}
                              alt={user.product.name}
                              title={user.product.name}
                              height={1080}
                              width={1080}
                              className="w-full block h-20"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {user.product.name}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {user.product.price}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {user.totalPrice}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {user.status === "Pending" && (
                              <span className="text-blue-500">
                                {user.status}
                              </span>
                            )}
                            {user.status === "Confirmed" && (
                              <span className="text-green-500">
                                {user.status}
                              </span>
                            )}
                            {user.status === "Shipped" && (
                              <span className="text-orange-500">
                                {user.status}
                              </span>
                            )}
                            {user.status === "Delivered" && (
                              <span className="text-cyan-500 text-4xl">
                                <FaSquareCheck />
                              </span>
                            )}
                            {user.status === "Cancelled" && (
                              <span className="text-red-500">
                                {user.status}
                              </span>
                            )}
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