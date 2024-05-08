"use client";
import React, { useEffect, useState } from "react";
import Container from "@/src/components/element/container/page";
import { useCart } from "@/src/components/context/cartContext/page";
import Image from "next/image";
import { useAuth } from "@/src/components/context/authContext";
import CheckoutBtn from "./checkoutBtn";
import LoadingCart from "@/src/components/element/Loading/LoadingCart";
import axios from "axios";
import { Cart_API_Endpoint } from "@/src/utils/constant";

const ProductList = () => {
  const { errorCart, loadingCart, getToCartBtn, cart } = useCart();

  const { session } = useAuth();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);

  const DeleteHandle = async (productId: string) => {
    try {
      // setIsLoading(true);
      if (session) {
        await axios.delete(`${Cart_API_Endpoint}/delete/${productId}`);
        await getToCartBtn();
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleUpdateCartIncrease = async (_id: string, quantity: number) => {
    try {
      // setIsLoading(true);

      await axios.put(`${Cart_API_Endpoint}/update/increase/${_id}`, {
        quantity,
      });
      await getToCartBtn();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUpdateCartDecrease = async (_id: string, quantity: number) => {
    try {
      await axios.put(`${Cart_API_Endpoint}/update/decrease/${_id}`, {
        quantity,
      });
      await getToCartBtn();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let total = 0;
    let totalTax = 0;

    if (cart) {
      cart.forEach((item: any) => {
        subTotal += item.product.price * item.quantity;
      });

      const taxCharges = 200; // Assuming tax charges
      totalTax = taxCharges * cart.length;
      total = subTotal + totalTax;
    }

    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cart]);
  return (
    <>
      <Container>
        <div className="grid md:grid-cols-6 grid-cols-1 gap-2 md:my-20 my-10">
          <div className="md:col-span-4 col-span-1">
            <div className="relative overflow-x-auto sm:rounded-lg mb-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                {loadingCart ? (
                  <>
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                  </>
                ) : (
                  <>
                    {errorCart && errorCart}
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
                      {cart ? ( // Check if userData is not null before rendering
                        cart.map((user, index) => (
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
                                  <span className="sr-only">
                                    Decrease Quantity
                                  </span>
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
                                  <span className="sr-only">
                                    Increase Quantity
                                  </span>
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
                              {user.product.price * user.quantity}
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
                  </>
                )}
              </table>
            </div>
            {/* <div className="coupon flex items-center gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="rounded-full py-2 px-5 outline-none w-full border"
              />
              <button className="py-3 px-16 bg-red-500 text-white rounded-full border border-solid border-red-500 hover:bg-white hover:text-red-500 text-lg font-semibold transition-all hover:transition-all">
                Apply
              </button>
            </div> */}
          </div>
          <div className="md:col-span-2 col-span-1 md:mt-0 mt-8">
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
              <CheckoutBtn cart={cart} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductList;
