"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { OrderItem } from "@/src/types/page";
import Button from "../../ui/Button";

const AdminOrderView = () => {
  const [data, setData] = useState<OrderItem[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const fetchData = useCallback(async (status?: string) => {
    try {
      setLoadingOrder(true);
      let response;
      response = await axios.get(`/api/auth/admin/order`);
      if (status) {
        response = await axios.get(`/api/auth/admin/order?status=${status}`);
      }

      setData(response.data.getTotalOrder);
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
      await axios.put(`/api/auth/admin/order?orderId=${orderId}`, { status });
      // Assuming the server responds  updated order data, you can update the state to reflect the changes
      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="my-20">
          <div className="flex gap-5 items-center my-8">
            <Button
              className="button_bg !px-4"
              onClick={() => fetchData("Shipped")}
            >
              Shipped
            </Button>
            <Button
              className="button_bg !px-4"
              onClick={() => fetchData("Pending")}
            >
              Pending
            </Button>
            <Button
              className="button_bg !px-4"
              onClick={() => fetchData("Confirmed")}
            >
              Confirmed
            </Button>
            <Button
              className="button_bg !px-4"
              onClick={() => fetchData("Delivered")}
            >
              Delivered
            </Button>
            <Button
              className="button_bg !px-4"
              onClick={() => fetchData("Cancelled")}
            >
              Cancelled
            </Button>
          </div>
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
                      data.map((user: any) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={user._id}
                        >
                          <td className="p-4">
                            <Image
                              src={`${user.product.image}`}
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

export default AdminOrderView;
