"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/components/context/cartContext";
import { Button, Container, Table } from "@/src/components/ui/ui";
import { useOrder } from "@/src/components/context/orderContext";
import Link from "next/link";
import { LoadingTableRow } from "../ui/Loading/LoadingTableRow";
import Table1 from "@/src/components/ui/Table/Table1";

interface UserData {
  email?: string;
  phone1: string;
  phone2: string;
  addressLine1: string;
  image: string;
  country: string;
  city: string;
  postalCode: string;
  username: string;
  additionalInfo: string;
  emailVerified: boolean;
}

export default function CheckoutView({ userId }: any) {
  const { cart, isFetching } = useCart();
  const router = useRouter();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [delivery, setDelivery] = useState<number | undefined>(undefined);
  const { addToOrder, isLoadingOrder } = useOrder();

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let Total = 0;

    if (cart) {
      cart.forEach((item: any) => {
        Total += item.product_Detail.price * item.qty + Number(delivery);
        subTotal += item.product_Detail.price * item.qty;
      });
    }

    setSubtotal(subTotal);
    setTotal(Total); // Assuming total is equal to subtotal in this case
  }, [cart, delivery]);

  return (
    <Container>
      <div className="grid lg:grid-cols-9 grid-cols-1 gap-2 my-12">
        <div className="lg:col-span-6 col-span-1">
          <Table
            columns={[
              "Image",
              "Name",
              "Qty",
              "Price",
              "Size",
              "Total Product price",
            ]}
            loading={isFetching}
            cellCount={6}
          >
            {cart ? (
              cart.map((user, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="p-4">
                    <Image
                      src={`https://res.cloudinary.com/desggllml/image/upload/w_80,h_80,c_fill,g_center/${user.product_Detail.image}`}
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
                    {user.product_Detail.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.size}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {user.product_Detail.price * user.qty}
                  </td>
                </tr>
              ))
            ) : (
              <p>No items in cart...</p>
            )}
          </Table>
          <div className="mt-5">
            <Link href="/dashboard/address/" className="!mb-5">
              <Button className="button_solid !inline-block">
                Edit Address
              </Button>
            </Link>
            <UserData userId={userId} />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-1 md:mt-0 mt-8">
          <div className="cart-total bg-slate-100 rounded-md p-4">
            <span className="flex items-center justify-center pb-3 text-xl font-bold">
              Cart Total
            </span>
            <div className="total flex items-center justify-between my-8">
              <span>Sub Total</span>
              <span>{subtotal}</span>
            </div>
            <span className="my-2 text-xl font-semibold">Tax Charges</span>

            <div className="tax my-4 flex items-center justify-between">
              <select
                onChange={(e) => setDelivery(Number(e.target.value))}
                className="bg-color2 text-white rounded-md border-none outline-none py-3 px-5"
              >
                <option value="">Select Delivery</option>
                <option value="250">Leapards</option>
                <option value="300">Tcs</option>
              </select>
              <span>{delivery}</span>
            </div>
            <div className="total border-t py-5 flex items-center justify-between">
              <span>Total</span>
              <span>{total}</span>
            </div>
            {delivery && (
              <Button
                variant="solid"
                className="flex items-center justify-center w-full"
                onClick={() =>
                  addToOrder(
                    cart.map((item) => ({
                      product: item.product_Detail._id,
                      qty: item.qty,
                      size: item.size,
                    })),
                    total
                  )
                }
                disabled={isFetching}
              >
                {isFetching ? "Processing..." : "Place Order"}
              </Button>
            )}
          </div>
          {delivery === 250 && (
            <p className="p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae explicabo libero minus fugit beatae labore, cumque
              perspiciatis necessitatibus possimus repellendus fuga nam
              similique corrupti veniam, ea laudantium, consectetur reiciendis
              quaerat!
            </p>
          )}
          {delivery === 300 && (
            <p className="p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae explicabo libero minus fugit beatae labore, cumque
              perspiciatis necessitatibus possimus repellendus fuga nam
              similique corrupti veniam, ea laudantium, consectetur reiciendis
              quaerat!
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export function UserData({ userId }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/auth/address/${userId}`);
        const userDataFromApi = response.data.get_user_address;

        if (!userDataFromApi.additionalInfo) {
          localStorage.setItem("lastVisitedPage", window.location.pathname);

          router.push("/dashboard/address/");
          return;
        }

        setData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [router, userId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4 mt-5">
      {isLoading ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
            User Checkout Detail
          </caption>
          {[...Array(10)].map((_, index) => (
            <LoadingTableRow key={index} cellCount={2} />
          ))}
        </table>
      ) : (
        <>
          {error && <span className="text-red-500">{error}</span>}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
              User Profile
            </caption>
            <Table1 userProfile={data} />
          </table>
        </>
      )}
    </div>
  );
}
