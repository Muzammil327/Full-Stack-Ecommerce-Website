"use client";
import axios from "axios";
import Link from "next/link";
import { PRODUCT_DELETE } from "@/src/utils/constant";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table";
import { Size } from "@/src/utils/fetchSize";

export default function Page() {
  const { error, loading, sizes, fetchSize } = Size();

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/product/size?sizeId=${id}`);
      await fetchSize(); // Refetch products after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mx-auto md:px-6 px-4 my-8">
      <Button className="button_solid px-4">
        <Link href="/dashboard/admin/size/add">Add New Size</Link>
      </Button>
      <Table
        cellCount={2}
        loading={loading}
        columns={["Product Name", "Action"]}
      >
        {sizes.map((product: any) => (
          <TableRow columns={[]} tableHeading={product.name} key={product._id}>
            <Link
              href={`/dashboard/admin/products/put/${product._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-600 hover:underline mx-1"
            >
              Remove
            </button>
          </TableRow>
        ))}
      </Table>

      {/* <Pagination
        pagination={pagination}
        setPage={(page: number) => {
          setPage(page);
        }}
        page={page}
        loading={loading}
      /> */}
    </div>
  );
}
