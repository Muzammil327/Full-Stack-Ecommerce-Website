"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import axios from "axios";
import Container from "@/src/components/ui/Container";
import Button from "@/src/components/ui/Button";
import Table2 from "@/src/components/ui/Table/Table2";
import GETAdminOrderAction from "@/src/action/admin/GETAdminOrderAction";
import AdminSidebar from "../AdminSidebar";

const AdminOrderView = () => {
  const { error, loading, adminOrder, fetchAdminOrder } = GETAdminOrderAction();

  if (error) {
    return <h1>Error getting order</h1>;
  }

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.put(`/api/admin/order?orderId=${orderId}`, { status });
      fetchAdminOrder();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Container>
      <AdminSidebar />

      <div className="my-10">
        <div className="flex gap-5 items-center my-8">
          <Button
            variant="outline"
            onClick={() => fetchAdminOrder("Pending")}
            title="Pending Order"
            disabled={loading}
          >
            Pending
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchAdminOrder("Confirmed")}
            title="confirmed order"
            disabled={loading}
          >
            Confirmed
          </Button>{" "}
          <Button
            variant="outline"
            onClick={() => fetchAdminOrder("Shipped")}
            title="shipped order"
            disabled={loading}
          >
            Shipped
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchAdminOrder("Delivered")}
            title="delivered order"
            disabled={loading}
          >
            Delivered
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchAdminOrder("Cancelled")}
            title="cancelled order"
            disabled={loading}
          >
            Cancelled
          </Button>
        </div>
        <Table2
          columns={[
            "Image",
            "Name",
            "Price",
            "Total Price",
            "Size",
            "Status",
            "Action",
          ]}
          loading={loading}
          cellCount={7}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {adminOrder ? (
              adminOrder.map((user: any) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={user._id}
                >
                  <td className="p-4">
                    <Image
                      src={`https://res.cloudinary.com/desggllml/image/upload/w_600,c_fill,g_center/${user.product.image}`}
                      alt={user.product.name}
                      title={user.product.name}
                      height={1080}
                      width={1080}
                      className="w-full block h-40"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.product.name} <br />
                    Username: {user.user.username} <br />
                    Adress 1: {user.user.addressLine1} <br />
                    Adress 2: {user.user.addressLine2} <br />
                    Additional Info: {user.user.additionalInfo} <br />
                    Location: {user.user.additionalInfo}-{" "}
                    {user.user.additionalInfo} <br />
                    Phone: {user.user.phone1} - {user.user.phone2} <br />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.product.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.totalPrice}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.size}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user._id, e.target.value)
                      }
                      className="block w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out hover:border-gray-400"
                    >
                      <option value="Pending" className="py-2 px-4">
                        Pending
                      </option>
                      <option value="Confirmed" className="py-2 px-4">
                        Confirmed
                      </option>
                      <option value="Shipped" className="py-2 px-4">
                        Shipped
                      </option>
                      <option value="Delivered" className="py-2 px-4">
                        Delivered
                      </option>
                      <option value="Cancelled" className="py-2 px-4">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <p>NO User Order...</p>
            )}
          </Suspense>
        </Table2>
      </div>
    </Container>
  );
};

export default AdminOrderView;
