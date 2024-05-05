'use client'
import React, { CSSProperties, useEffect, useState } from "react";
import Container from "@/src/components/element/container/page";
import { useCart } from "@/src/components/context/cartContext/page";
import Image from "next/image";

const ProductList = () => {
  const { cartBuy, removeFromCart, updateCartIncrease, updateCartDecrease } =
    useCart();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);

  const DeleteHandle = async (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateCartIncrease = (productId: string, quantity: number) => {
    updateCartIncrease(productId, quantity); // Add the product to the cart
  };
  const handleUpdateCartDecrease = (productId: string, quantity: number) => {
    updateCartDecrease(productId, quantity); // Add the product to the cart
  };

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cartBuy changes
    let subTotal = 0;
    let total = 0;
    let totalTax = 0;

    if (cartBuy) {
      cartBuy.forEach((item: any) => {
        subTotal += item.price * item.quantity;
      });

      const taxCharges = 200; // Assuming tax charges
      totalTax = taxCharges * cartBuy.length;
      total = subTotal + totalTax;
    }

    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cartBuy]);

  return (
    <>
      <Container>
        <div className="grid md:grid-cols-6 gap-2 my-20">
          <div className="md:col-span-4">
            <div className="relative overflow-x-auto sm:rounded-lg mb-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
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
                  {cartBuy ? ( // Check if userData is not null before rendering
                    cartBuy.map((user, index) => (
                      <tr
                        className="bg-white border-b hover:bg-gray-50"
                        key={index}
                      >
                        <td className="p-4">
                          <Image
                            src={`https://res.cloudinary.com/desggllml/image/upload/v1714240538/some-folder-name/${user.image}.png`}
                            alt={user.name}
                            title={user.name}
                            sizes="(max-width: 600px) 90vw, 600px"
                            height={1600}
                            width={1216}
                            className="w-16 md:w-32 max-w-full max-h-full"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4">
                          {/* <QuantityControl initialValue= /> */}
                          <form className="flex items-center">
                            <button
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              onClick={() =>
                                handleUpdateCartDecrease(
                                  user._id,
                                  user.quantity
                                )
                              }
                            >
                              <span className="sr-only">Decrease Quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={user.quantity}
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                              placeholder="1"
                              required
                              readOnly
                            />
                            <button
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              onClick={() =>
                                handleUpdateCartIncrease(
                                  user._id,
                                  user.quantity
                                )
                              }
                            >
                              <span className="sr-only">Increase Quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.price * user.quantity}
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
                    <p>NO user Cart...</p>
                  )}
                </tbody>
              </table>
            </div>
            <div className="coupon flex items-center gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="rounded-full py-2 px-5 outline-none w-full border"
              />
              <button className="py-3 px-16 bg-red-500 text-white rounded-full border border-solid border-red-500 hover:bg-white hover:text-red-500 text-lg font-semibold transition-all hover:transition-all">
                Apply
              </button>
            </div>
          </div>
          <div className="col-span-2 md:mt-0 mt-8">
            <div className="cart-total bg-slate-100 rounded-md p-4">
              <span className="flex items-center justify-center pb-3 text-xl font-bold">
                Cart Total
              </span>
              <div className="total flex items-center justify-between mt-8">
                <span>Sub Total</span>
                <span>{subtotal}</span>
              </div>
              <div className="tax my-4 flex items-center justify-between">
                <span>Tax Charges</span>
                <span>{totalTax}</span>
              </div>
              <div className="total border-t py-2 flex items-center justify-between">
                <span>Total</span>
                <span>{total}</span>
              </div>
              <button className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductList;

const svgStyle: CSSProperties = {
  stroke: "rgb(0, 0, 0)",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
};
