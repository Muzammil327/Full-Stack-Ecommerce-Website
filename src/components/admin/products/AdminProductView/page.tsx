"use client";
import axios from "axios";
import Link from "next/link";
import { PRODUCT_DELETE } from "@/src/utils/constant";
import { ProductCard } from "@/src/utils/fetchProduct";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table";
import Pagination from "@/src/components/admin/products/AdminProductView/pagination";
import { AdminProductCardProps } from "@/src/types/product";

export default function Page() {
  const { error, loading, setPage, page, fetchProduct, pagination, products } =
    ProductCard();

  const deleteProduct = async (
    id: string,
    publicId: string,
    slider: string[]
  ) => {
    try {
      await axios.delete(
        `${PRODUCT_DELETE}/${id}?publicId=${publicId}&slider=${slider.join(
          ","
        )}`
      );
      await fetchProduct(); // Refetch products after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mx-auto md:px-6 px-4 my-8">
      <div className="flex gap-4">
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/products/add">Add Product</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/catgeory/add">Add Catgeory</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/subcatgeory/add">Add Sub Catgeory</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/items/add">Add Item</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/color/add">Add Color</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/size/add">Add Size</Link>
        </Button>
        <Button className="button_solid px-4">
          <Link href="/dashboard/admin/platform/add">Add Platform</Link>
        </Button>
      </div>
      <Table
        cellCount={5}
        loading={loading}
        columns={[
          "Product Name",
          "Category",
          "Price",
          "Discount Price",
          "Action",
        ]}
      >
        {products.map((product: AdminProductCardProps) => (
          <TableRow
            columns={[
              product.category,
              product.price, // Format price as a string with 2 decimal places
              product.dPrice, // Format price as a string with 2 decimal places
            ]}
            tableHeading={product.name}
            key={product._id}
          >
            <Link
              href={`/dashboard/admin/products/put/${product._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={() =>
                deleteProduct(product._id, product.image, product.slider)
              }
              className="text-red-600 hover:underline mx-1"
            >
              Remove
            </button>
          </TableRow>
        ))}
      </Table>

      <Pagination
        pagination={pagination}
        setPage={(page: number) => {
          setPage(page);
        }}
        page={page}
        loading={loading}
      />
    </div>
  );
}
