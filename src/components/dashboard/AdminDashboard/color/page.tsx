"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table/Table2";
import GETAdminColorAction from "@/src/action/admin/GETAdminColorAction";
import AdminSidebar from "../AdminSidebar";

export default function AdminColorView() {
  const { error, loading, color, fetchColor } = GETAdminColorAction();

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/admin/color?colorId=${id}`);
      await fetchColor(); // Refetch products after deletion
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

      <Link href="/dashboard/admin/color/add">
        <Button title="add color" variant="outline" disabled={loading}>
          Add New Color
        </Button>
      </Link>
      <Table cellCount={2} loading={loading} columns={["Color Name", "Action"]}>
        {color.map((product: any) => (
          <TableRow columns={[]} tableHeading={product.name} key={product._id}>
            <Link
              href={`/dashboard/admin/color/put/${product._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-600 hover:underline mx-1"
              type="submit"
            >
              Remove
            </button>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
