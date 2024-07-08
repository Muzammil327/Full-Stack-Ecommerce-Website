"use client";
import LoadingTableRow from "@/src/components/ui/Loading/LoadingTableRow";
import axios from "axios";
import Link from "next/link";
import { useProductCard } from "../../context/productCard";
import { PRODUCT_DELETE } from "@/src/utils/constant";
import { Button } from "../../ui/button";

interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  slider: [];
}
export default function AdminProductView() {
  const { error, loading, setPage, fetchProduct, pagination, products } =
    useProductCard();

  const handleLoadMore = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const DeleteProduct = async (id: string, publicId: string, slider: any) => {
    try {
      await axios.delete(
        `${PRODUCT_DELETE}/${id}?publicId=${publicId}&slider=${slider}`
      );
      fetchProduct(); // Assuming fetchData is a function to fetch updated data
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <>
      {error && <h1>Error fetching Catgeory data...</h1>}

      <div className="mx-auto md:px-6 px-4 my-8">
        <Button variant="paddingWidth" round="md" asChild>
          <Link href="/dashboard/admin/products/add">Add New Product</Link>
        </Button>

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
              {loading ? (
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mx-4 mt-5">
                  <LoadingTableRow />
                  <LoadingTableRow />
                  <LoadingTableRow />
                  <LoadingTableRow />
                  <LoadingTableRow />
                  <LoadingTableRow />
                </div>
              ) : (
                <>
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
                            href={`/dashboard/admin/products/put/${product._id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="paddingWidth"
                            round="md"
                            onClick={() =>
                              DeleteProduct(
                                product._id,
                                product.image,
                                product.slider
                              )
                            }
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                </>
              )}
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
                  <Button
                    variant="paddingWidth"
                    round="md"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
