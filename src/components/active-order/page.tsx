"use client";
import Image from "next/image";
import { Container, Button, Table, Dialogs } from "@/src/components/ui/ui";
import { FaSquareCheck } from "react-icons/fa6";
import { useOrder } from "@/src/components/context/orderContext";
import { FaTimes } from "react-icons/fa";

const ActiveOrderView = () => {
  const { order, isFetchingOrder, DeleteHandle } = useOrder();
  return (
    <Container>
      <div className="my-20">
        <div className="relative overflow-x-auto sm:rounded-lg mb-10">
          <Table
            columns={[
              "Image",
              "Name",
              "Total Price",
              "Size",
              "Status",
              "Action",
            ]}
            loading={isFetchingOrder}
            cellCount={6}
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
                    {user.product.name}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.totalPrice}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.size}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.status === "Pending" && (
                      <span className="text-blue-500">{user.status}</span>
                    )}
                    {user.status === "Confirmed" && (
                      <span className="text-green-500">{user.status}</span>
                    )}
                    {user.status === "Shipped" && (
                      <span className="text-orange-500">{user.status}</span>
                    )}
                    {user.status === "Delivered" && (
                      <span className="text-cyan-500 text-4xl">
                        <FaSquareCheck />
                      </span>
                    )}
                    {user.status === "Cancelled" && (
                      <span className="text-red-500">{user.status}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.status === "Pending" && (
                      <Dialogs
                        className="button_outline p-1"
                        title="Delete Wishlist."
                        description="This will permanently delete your product from this wishlist."
                        para="Are you sure you want to delete your Wishlist Product?"
                        onClick={() => DeleteHandle(user._id)}
                      >
                        <FaTimes />
                      </Dialogs>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>NO user WishList...</p>
            )}
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ActiveOrderView;
