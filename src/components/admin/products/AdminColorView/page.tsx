"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table";
import { Color } from "@/src/utils/fetchColor";

export default function Page() {
  const { error, loading, color, fetchColor } = Color();
  const deletePlatform = async (id: string) => {
    try {
      await axios.delete(`/api/product/color?colorId=${id}`);
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
      <Button className="button_solid px-4">
        <Link href="/dashboard/admin/color/add">Add New Color</Link>
      </Button>
      <Table
        cellCount={2}
        loading={loading}
        columns={["Color Name", "Action"]}
      >
        {color.map((platform: any) => (
          <TableRow
            columns={[]}
            tableHeading={platform.name}
            key={platform._id}
          >
            <Link
              href={`/dashboard/admin/products/put/${platform._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={() => deletePlatform(platform._id)}
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
