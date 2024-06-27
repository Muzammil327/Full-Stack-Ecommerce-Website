"use client";
import Container from "@/src/components/ui/Container";
import { useCart } from "@/src/components/context/cartContext";
import FetchCart from "./FetchCart";
import LoadingCart from "../ui/Loading/LoadingCart";
import CheckoutButton from "./CheckoutButton";

const CartView = ({ userId }: { userId: string }) => {
  const { isFetching } = useCart();
  return (
    <Container>
      <section className="grid md:grid-cols-6 grid-cols-1 gap-2 md:my-20 my-10">
        <div className="md:col-span-4 col-span-1 relative overflow-x-auto sm:rounded-lg mb-10">
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
              {isFetching ? (
                <>
                  <tr>
                    <td colSpan={5}>
                      <LoadingCart />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <LoadingCart />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <LoadingCart />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <LoadingCart />
                    </td>
                  </tr>
                </>
              ) : (
                <FetchCart />
              )}
            </tbody>
          </table>
        </div>

        <div className="md:col-span-2 col-span-1 md:mt-0 mt-8 bg-slate-100 rounded-md p-4">
          <CheckoutButton userId={userId} />
        </div>
      </section>
    </Container>
  );
};

export default CartView;
