"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/src/components/contexts/authContext";
import { useCart } from "@/src/components/contexts/cartContext";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import {
  Cart_API_Endpoint,
  PENDINGORDER_API_Endpoint,
} from "@/src/utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Processing from "@/src/components/ui/Loading/Processing";

interface Product {
  product: string;
  qty: number;
}

const ProductList = () => {
  const { errorCart, loadingCart, getToCartBtn, cart } = useCart();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);

  const DeleteHandle = async (productId: string) => {
    try {
      await axios.delete(`${Cart_API_Endpoint}/delete/${productId}`);

      await getToCartBtn();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
    }
  };

  const handleUpdateCartIncrease = async (_id: string, qty: number) => {
    try {
      // setIsLoading(true);
      await axios.put(`${Cart_API_Endpoint}/update/increase/${_id}`, { qty });
      await getToCartBtn();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUpdateCartDecrease = async (_id: string, qty: number) => {
    try {
      await axios.put(`${Cart_API_Endpoint}/update/decrease/${_id}`, { qty });

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

    if (cart.length === 0) {
      return router.push("/stores");
    }

    if (cart) {
      cart.forEach((item: any) => {
        subTotal += (item.product_Detail.price - item.product_Detail.discountprice) * item.qty;
        totalTax = item.product_Detail.deliveryCharge * cart.length;
      });

      total = subTotal + totalTax;
    }

    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cart, router]);
  if (!session) {
    return router.push("/sign-in");
  }
  
  const handleSubmit = async (products: Product[]) => {
    const user = session.user._id;
    setLoading(true);
    try {
      // Post each product individually
      await Promise.all(
        products.map(async (product) => {
          await axios.post(`${PENDINGORDER_API_Endpoint}/post`, {
            product: product.product, // Send only the product ID
            qty: product.qty, // Send the quantity
            user,
          });
        })
      );
      router.push("/cart/checkout");
      setLoading(false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Error adding product to cart. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
                      {cart ? (
                        cart.map((user, index) => (
                          <tr
                            className="bg-white border-b hover:bg-gray-50"
                            key={index}
                          >
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
                                  onClick={() =>
                                    handleUpdateCartDecrease(user._id, user.qty)
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
                                  value={user.qty}
                                  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                  placeholder="1"
                                  required
                                  readOnly
                                />
                                <button
                                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                  type="button"
                                  onClick={() =>
                                    handleUpdateCartIncrease(user._id, user.qty)
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
                              {(user.product_Detail.price -
                                user.product_Detail.discountprice) *
                                user.qty}
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
              {error && <span className="text-red-500">{error}</span>}
              {cart.length === 0 ? null : (
                <button
                  className="btn"
                  onClick={() =>
                    handleSubmit(
                      cart.map((item) => ({
                        product: item.product_Detail._id,
                        qty: item.qty,
                      }))
                    )
                  }
                  disabled={loading}
                >
                  {loading ? <Processing /> : "Proceed to Checkout"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductList;
