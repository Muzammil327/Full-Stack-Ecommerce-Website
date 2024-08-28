"use client";
import Image from "next/image";
import { Container, Button, Table, Links } from "@/src/components/ui/ui";
import { FaSquareCheck } from "react-icons/fa6";
import { useOrder } from "@/src/components/context/orderContext";
import { FaTimes } from "react-icons/fa";

const ActiveOrderView = () => {
  const { order, isFetchingOrder, DeleteHandle } = useOrder();

  return (
    <Container>
      <div className="my-20">
        <span>
          After 5 days, it is not refundable.
        </span>
        <div className="relative overflow-x-auto sm:rounded-lg mb-10">
          <Table
            columns={[
              "Image",
              "Order Id",
              "Name",
              "Total Price",
              "Color",
              "Created At",
              "Status",
              "Action",
            ]}
            loading={isFetchingOrder}
            cellCount={8}
          >
            {order ? ( // Check if userData is not null before rendering
              order.map((user: any, index: number) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="p-4">
                    <Image
                      src={`https://res.cloudinary.com/desggllml/image/upload/w_80,h_80,c_fill,g_center/${user.product.image}`}
                      alt={user.product.name}
                      title={user.product.name}
                      height={1080}
                      width={1080}
                      className="h-20 w-20 mx-auto"
                      objectFit="cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.status === "No Return" ? "0" : user._id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.product.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.totalPrice}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.color}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}{" "}
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.status === "Pending" && (
                      <span
                        className="text-blue-500"
                        title="After 6 Hours: The customer will receive a confirmation call. If confirmed, the order status will be updated to confirmed. SMI SHOP MART cancel your order at this stage."
                      >
                        {user.status}
                      </span>
                    )}
                    {user.status === "Confirmed" && (
                      <span
                        className="text-green-500"
                        title="The order has been confirmed by the customer following a phone confirmation after the initial 6-hour pending period.The order is now queued for packaging and will be prepared for shipping within 1 business day."
                      >
                        {user.status}
                      </span>
                    )}
                    {user.status === "Shipped" && (
                      <span
                        className="text-orange-500"
                        title="The order has been carefully packaged and dispatched from the seller’s warehouse center. SMI Store Mart provides the customer with detailed shipment updates at every stage of the delivery process."
                      >
                        {user.status}
                      </span>
                    )}
                    {user.status === "Delivered" && (
                      <span
                        className="text-cyan-500 text-4xl"
                        title="Delivery has been confirmed, marking the completion of the order."
                      >
                        <FaSquareCheck />
                      </span>
                    )}
                    {user.status === "Cancelled" && (
                      <span
                        className="text-red-500"
                        title="The order has been cancelled either by the customer or by SMI Shop Mart. Cancellation may occur due to reasons such as stock unavailability, or a customer-initiated request."
                      >
                        {user.status}
                      </span>
                    )}
                    {user.status === "No Return" && (
                      <span
                        className="text-sky-500"
                        title="The order has been cancelled either by the customer or by SMI Shop Mart. Cancellation may occur due to reasons such as stock unavailability, or a customer-initiated request."
                      >
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.status === "Pending" && (
                      <Button
                        className="button_outline p-1"
                        onClick={() => DeleteHandle(user._id)}
                      >
                        <FaTimes />
                      </Button>
                    )}
                    {user.status === "Delivered" && (
                      <Links
                        title="return / replace"
                        slug={`/dashboard/active-order/${user._id}`}
                      >
                        <Button className="button_outline p-1">Return</Button>
                      </Links>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>NO Orders...</p>
            )}
          </Table>
          <div className="mt-5">
            <Links
              slug="/status-details"
              title="Status Details"
              className="relative inline-block"
            >
              <Button variant="outline" className="">
                See Status Details
              </Button>
            </Links>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ActiveOrderView;
