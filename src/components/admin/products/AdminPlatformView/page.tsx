"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table";
import { Platform } from "@/src/utils/fetchPlatform";

export default function AdminProductView() {
  const { error, loading, platforms, fetchPlatform } = Platform();
  const deletePlatform = async (id: string) => {
    try {
      await axios.delete(`/api/product/platform?platformId=${id}`);
      await fetchPlatform(); // Refetch products after deletion
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
        <Link href="/dashboard/admin/platform/add">Add New Platform</Link>
      </Button>
      <Table
        cellCount={3}
        loading={loading}
        columns={["Platform Name", "Shipping Charge", "Action"]}
      >
        {platforms.map((platform: any) => (
          <TableRow
            columns={[platform.shipping]}
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
