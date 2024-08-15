"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table/Table2";
import GETAdminSizeAction from "@/src/action/admin/GETAdminSizeAction";
import AdminSidebar from "../AdminSidebar";

export default function AdminSizeView() {
  const { error, loading, sizes, fetchSize } = GETAdminSizeAction();

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/admin/size?sizeId=${id}`);
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
      <AdminSidebar />

      <Link href="/dashboard/admin/size/add">
        <Button title="add size" variant="outline" disabled={loading}>
          Add New Size
        </Button>
      </Link>
      <Table cellCount={2} loading={loading} columns={["Size Name", "Action"]}>
        {sizes.map((product: any) => (
          <TableRow columns={[]} tableHeading={product.name} key={product._id}>
            <Link
              href={`/dashboard/admin/size/put/${product._id}`}
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
    </div>
  );
}
