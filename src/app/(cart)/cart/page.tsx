"use client";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Container from "@/src/components/element/container/page";
import Address from "../../(auth)/(userdashboard)/profile/address/page";
import Cart from "@/src/components/layout/Navbar/cart";

const ProductList = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressData, setAddressData] = useState({
    subtotal: subtotal,
    totalTax: totalTax,
    total: total,
    cart: cart,
  });

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        "/api/products/addToCart/update",
        addressData
      );
      const res = response.data;

      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Error during Product Category Update");
    } finally {
      setLoading(false);
    }
  }, [addressData]);

  useEffect(() => {
    // Trigger form submission whenever there's a change in cart data
    handleSubmit();
  }, [handleSubmit]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/products/addToCart/singleUser");
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    // Fetch cart data only if it's not already fetched
    if (!cart.length) {
      fetchCart();
    }
  }, [cart]);

  useEffect(() => {
    // Calculate subtotal when cart changes
    const calculateSubtotal = () => {
      let subTotal = 0;
      let total = 0;
      let totalTax = 0;
      cart.forEach((item) => {
        subTotal += item.cart.basePrice * item.quantity;
      });

      const taxCharges = 200; // Assuming tax charges
      totalTax = taxCharges * cart.length;
      total = subTotal + totalTax;

      // Update the addressData state with the latest values
      setAddressData({
        subtotal: subTotal,
        totalTax: totalTax,
        total: total,
        cart: cart,
      });

      // Store subtotal, total, and total tax in local storage
      localStorage.setItem("subtotal", subTotal.toString());
      localStorage.setItem("total", total.toString());
      localStorage.setItem("totalTax", totalTax.toString());

      setTotal(total);
      setSubtotal(subTotal);
      setTotalTax(totalTax);
    };

    calculateSubtotal();
  }, [cart]);

  // When component mounts, retrieve data from local storage
  useEffect(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    const storedTotal = localStorage.getItem("total");
    const storedTotalTax = localStorage.getItem("totalTax");

    if (storedSubtotal && storedTotal && storedTotalTax) {
      setSubtotal(parseFloat(storedSubtotal));
      setTotal(parseFloat(storedTotal));
      setTotalTax(parseFloat(storedTotalTax));
    }
  }, []);

  const handleIncrement = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1; // Increment quantity for the specified index
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1; // Decrement quantity for the specified index
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

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
                  {cart !== null ? ( // Check if userData is not null before rendering
                    cart.map((user, index) => (
                      <tr
                        className="bg-white border-b hover:bg-gray-50"
                        key={index}
                      >
                        <td className="p-4">
                          <img
                            src="/docs/images/products/apple-watch.png"
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.cart.name}
                        </td>
                        <td className="px-6 py-4">
                          {/* <QuantityControl initialValue= /> */}
                          <div className="flex items-center">
                            <button
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                              onClick={() => handleDecrement(index)}
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
                              onClick={() => handleIncrement(index)}
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
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.cart.basePrice * user.quantity}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading user data...</p>
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
