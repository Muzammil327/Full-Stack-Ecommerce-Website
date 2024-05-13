"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ORDER_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { Order } from "@/src/types/order";

const ProductList = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoadingOrder(true);
      const response = await axios.get(`${ORDER_API_Endpoint}/stats`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoadingOrder(false);
    }
  }, []);

  useEffect(() => {
    fetchData(); // Call fetchData function to fetch user data
  }, [fetchData]); // useEffect dependency

  const handleStatusChange = async (orderId: string, status: String) => {
    try {
      await axios.put(`${ORDER_API_Endpoint}/update/${orderId}`, { status });
      // Assuming the server responds with updated order data, you can update the state to reflect the changes
      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // const DeleteHandle = async (productId: string) => {
  //   try {
  //     if (session) {
  //       await axios.delete(`${ORDER_API_Endpoint}/delete/${productId}`);
  //       await getToOrderBtn();
  //     }
  //   } catch (error) {
  //     console.error("Error removing product from cart:", error);
  //     setError("Error removing product from cart. Please try again later.");
  //   }
  // };

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
                    {data ? ( // Check if userData is not null before rendering
                      data.map((user: Order) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={user._id}
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
                            <select
                              value={user.status}
                              onChange={(e) =>
                                handleStatusChange(user._id, e.target.value)
                              }
                              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          {/* <td className="px-6 py-4">
                            <button
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={() => DeleteHandle(user._id)}
                            >
                              Remove
                            </button>
                          </td> */}
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
