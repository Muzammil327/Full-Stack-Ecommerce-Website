import React from "react";
import { useCart } from "../context/cartContext";
import Image from "next/image";

export default function FetchCart() {
  const {
    cart,
    DeleteHandle,
    handleUpdateCartIncrease,
    handleUpdateCartDecrease,
  } = useCart();
  return (
    <React.Fragment>
      {cart ? (
        cart.map((user, index) => (
          <tr className="bg-white border-b hover:bg-gray-50" key={index}>
            <td className="p-4">
              <Image
                src={user.product_Detail.image}
                alt={user.product_Detail.name}
                title={user.product_Detail.name}
                height={1080}
                width={1080}
                className="w-full block h-20"
              />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900">
              {user.product_Detail.name}
            </td>
            <td className="px-6 py-4">
              <form className="flex items-center">
                <button
                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                  type="button"
                  onClick={() => handleUpdateCartDecrease(user._id, user.qty)}
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
                  value={user.qty}
                  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                  placeholder="1"
                  required
                  readOnly
                />
                <button
                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                  type="button"
                  onClick={() => handleUpdateCartIncrease(user._id, user.qty)}
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
              {(user.product_Detail.price - user.product_Detail.discountprice) *
                user.qty}
            </td>
            <td className="px-6 py-4">
              <button
                className="font-medium t1 hover:underline"
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
    </React.Fragment>
  );
}
