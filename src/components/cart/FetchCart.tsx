import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { CartItem } from "@/src/types/page";
import { FaMinus, FaPlus } from "react-icons/fa";
import Processing from "../ui/Loading/Processing";
import { FaDeleteLeft } from "react-icons/fa6";

export default function FetchCart({
  getToCartBtn,
  cart,
}: {
  getToCartBtn: () => void;
  cart: CartItem[];
}) {
  const [loading, setLoading] = useState(false);
  // ----------------------- DELETE CART -------------------------------------------

  const DeleteHandle = async (cartId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/cart?cartId=${cartId}`);
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------- PUT INCREASE CART -------------------------------------------

  const handleUpdateCartIncrease = async (_id: string, qty: number) => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/cart?increase=${_id}`, { qty });
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------- PUT DECREASE CART -------------------------------------------

  const handleUpdateCartDecrease = async (_id: string, qty: number) => {
    setLoading(true);

    try {
      const response = await axios.put(`/api/cart?decrease=${_id}`, { qty });
      if (response.data.statusbar === 200) {
        await getToCartBtn();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {cart ? (
        cart.map((user: CartItem, index: number) => (
          <tr className="bg-white border-b hover:bg-gray-50" key={index}>
            <td className="p-3">
              <Image
                src={user.product_Detail.image}
                alt={user.product_Detail.name}
                title={user.product_Detail.name}
                height={1080}
                width={1080}
                className="w-full block h-20"
              />
            </td>
            <td className="text-left py-4 font-semibold text-gray-900">
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
                  {loading ? <Processing /> : <FaMinus />}
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
                  {loading ? <Processing /> : <FaPlus />}
                </button>
              </form>
            </td>
            <td className="px-6 text-center py-4 font-semibold text-gray-900">
              {user.product_Detail.price * user.qty}
            </td>
            <td className="px-6 text-center py-4 font-semibold text-gray-900">
              {user.size && user.size}
            </td>
            <td className="px-6 py-4 text-center">
              <button
                className="font-medium t1 hover:underline"
                onClick={() => DeleteHandle(user._id)}
              >
                {loading ? <Processing /> : <FaDeleteLeft size={40} />}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <p>NO Cart...</p>
      )}
    </React.Fragment>
  );
}
