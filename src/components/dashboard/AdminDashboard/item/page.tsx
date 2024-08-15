"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table/Table2";
import GETAdminItemAction from "@/src/action/admin/GETAdminItemAction";

export default function AdminItemView() {
  const { error, loading, items, fetchItems } = GETAdminItemAction();
  const deletePlatform = async (id: string) => {
    try {
      await axios.delete(`/api/admin/items?itemsId=${id}`);
      await fetchItems(); // Refetch products after deletion
    } catch (err) {
      console.error("Error deleting product items:", err);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mx-auto md:px-6 px-4 my-8">
      <Button className="button_solid px-4">
        <Link href="/dashboard/admin/items/add">Add New Items</Link>
      </Button>
      <Table
        cellCount={4}
        loading={loading}
        columns={["Item Name", "Catgeory Name", "Sub Catgeory Name", "Action"]}
      >
        {items.map((items: any) => (
          <TableRow
            columns={[
              items.cat.map((data: any) => data.name),
              items.subcat.map((data: any) => data.name),
            ]}
            tableHeading={items.name}
            key={items._id}
          >
            <Link
              href={`/dashboard/admin/items/put/${items._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              type="submit"
              onClick={() => deletePlatform(items._id)}
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
