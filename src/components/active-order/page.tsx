"use client";
import Image from "next/image";
import { Container, Button } from "@/src/components/ui/ui";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { FaSquareCheck } from "react-icons/fa6";
import { useOrder } from "@/src/components/context/orderContext";

const ActiveOrderView = () => {
  const { order, isFetchingOrder, DeleteHandle } = useOrder();
  return (
    <>
      <Container>
        <div className="my-20">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              {isFetchingOrder ? (
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
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Size
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
                    {order ? ( // Check if userData is not null before rendering
                      order.map((user: any, index: number) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="p-4">
                            <Image
                              src={user.product.image}
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
                            {user.status === "Pending" && (
                              <Button
                                className="button_simple px-3"
                                onClick={() => DeleteHandle(user._id)}
                              >
                                Remove
                              </Button>
                            )}
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

export default ActiveOrderView;
