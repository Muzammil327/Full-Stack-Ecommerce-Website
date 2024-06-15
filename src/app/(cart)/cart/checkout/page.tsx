"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/src/components/contexts/cartContext";
import { useAuth } from "@/src/components/contexts/authContext";
import Container from "@/src/components/ui/Container";
import BillingAddress from "./billingAddress";

interface Product {
  product: string;
  qty: number;
}
import { toast } from "react-toastify";
import axios from "axios";
import { ADDRESS_API_Endpoint, ORDER_API_Endpoint } from "@/src/utils/constant";

interface FormData {
  phone1: string;
  phone2: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  postalCode: string;
  additionalInfo: string;
}

export default function Page() {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const { cart } = useCart();
  const { getToCartBtn } = useCart();
  const { session, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [addressData, setAddressData] = useState<FormData>({
    phone1: "",
    phone2: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
  });

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let total = 0;
    let totalTax = 0;

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
  }, [cart]);

  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleSubmit = async (products: Product[], totalPrice: any) => {
    try {
      setLoading(true);
      if (!session) {
        return toast.error("Please Login");
      }
      await Promise.all(
        products.map(async (product) => {
          await axios.post(`${ORDER_API_Endpoint}/post`, {
            product: product.product, // Send only the product ID
            qty: product.qty, // Send the quantity
            user,
            totalPrice,
          });
        })
      );

      // toast.success(response.data.message);
      getToCartBtn();
      router.push("/stores");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.warning(error.response?.data.message);
        } else if (error.response?.status === 500) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } else {
        console.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ADDRESS_API_Endpoint}/get/${user}`);
        const userDataFromApi: FormData = response.data;
        setAddressData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);
  useEffect(() => {
    if (
      addressData.phone1 &&
      addressData.phone2 &&
      addressData.additionalInfo &&
      addressData.city &&
      addressData.country &&
      addressData.addressLine1 &&
      addressData.addressLine2 &&
      addressData.postalCode
    ) {
      setIsFormFilled(true);
    }
  }, [addressData]);

  return (
    <Container>
      <div className="grid lg:grid-cols-9 grid-cols-1 gap-2 my-12">
        <div className="lg:col-span-6 col-span-1">
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
                    Total Product price
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
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {user.qty}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {user.product_Detail.price - user.product_Detail.discountprice}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {(user.product_Detail.price - user.product_Detail.discountprice) * user.qty}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>NO user Cart...</p>
                )}
              </tbody>
            </table>
          </div>
          <BillingAddress setIsFormFilled={setIsFormFilled} />
        </div>
        <div className="lg:col-span-3 col-span-1 md:mt-0 mt-8">
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
            {isFormFilled && (
              <>
                <button
                  className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all"
                  onClick={() =>
                    handleSubmit(
                      cart.map((item) => ({
                        product: item.product_Detail._id,
                        qty: item.qty,
                      })),
                      total
                    )
                  }
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </>
            )}
          </div>
        </div>{" "}
      </div>
    </Container>
  );
}
