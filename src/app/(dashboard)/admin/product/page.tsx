"use client";
import {
  ProductCardProps,
  ProductPaginationProps,
} from "@/src/types/product";
import { Product_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<ProductPaginationProps>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Product_API_Endpoint}/get?page=${page}&limit=10`
        );
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call fetchData function to fetch user data
  }, [page]); // useEffect dependency

  const handleLoadMore = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  return (
    <>
      <div className="mx-auto md:px-6 px-4 my-8">
        <button>
          {" "}
          <Link
            href="/admin/product/add"
            className="bg-red-500 hover:bg-red-600 transition-all text-white py-3 px-8 my-3 rounded-md"
          >
            Add New Product
          </Link>
        </button>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
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
              {products &&
                products.map((product: ProductCardProps) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}{" "}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="flex items-center px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/product/Slider/fhgfh`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                      >
                        Edit Slider
                      </Link>
                      <Link
                        href={`/admin/product/put/fhgfh`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                      >
                        Edit Remaining
                      </Link>
                      <Link
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="flex items-center md:justify-between border-t border-gray-200 bg-white py-3 mt-4">
            <div className="flex md:flex-row flex-col sm:flex-1 items-center md:justify-between justify-center">
              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium px-1">
                    {pagination.startResult}
                  </span>
                  to
                  <span className="font-medium px-1">
                    {pagination.endResult}
                  </span>
                  of
                  <span className="font-medium px-1">
                    {pagination.totalResults}
                  </span>
                  results
                </p>
              </div>
              <div>
                {products.length === 6 && (
                  <button
                    onClick={handleLoadMore}
                    className="bg-red-400 mx-auto my-4 py-1 px-4 text-white flex items-center justify-center"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
