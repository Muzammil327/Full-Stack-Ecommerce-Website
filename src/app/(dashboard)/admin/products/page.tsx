"use client";
import { ProductPaginationProps } from "@/src/types/product";
import { Product_DELETE, Product_STORE } from "@/src/utils/constant";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  slider: [];
}
export default function Page() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<ProductPaginationProps>();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Product_STORE}?page=${page}&limit=10`
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [page, setProducts, setPagination]);

  useEffect(() => {
    fetchData(); // Call fetchData function to fetch user data
  }, [page, fetchData]); // useEffect dependency

  const handleLoadMore = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const DeleteProduct = async (id: string, publicId: string, slider: any) => {
    try {
      await axios.delete(
        `${Product_DELETE}/${id}?publicId=${publicId}&?slider=${slider}`
      );
      fetchData(); // Assuming fetchData is a function to fetch updated data
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <>
      <div className="mx-auto md:px-6 px-4 my-8">
        <button>
          {" "}
          <Link
            href="/admin/products/add"
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
                        href={`/admin/products/put/${product._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          DeleteProduct(
                            product._id,
                            product.image,
                            product.slider
                          )
                        }
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </button>
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
                {products.length === 10 && (
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
