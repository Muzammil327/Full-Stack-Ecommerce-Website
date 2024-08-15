"use client";
import axios from "axios";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table/Table2";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";

export default function AdminCatgeoryView() {
  const { error, loading, categories, fetchCatgeory } = GETAdminCatgeoryAction();
  
  const deletePlatform = async (id: string) => {
    try {
      await axios.delete(`/api/admin/catgeory?catgeoryId=${id}`);
      await fetchCatgeory(); // Refetch products after deletion
    } catch (err) {
      console.error("Error deleting product catgeory:", err);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mx-auto md:px-6 px-4 my-8">
      <Button className="button_solid px-4">
        <Link href="/dashboard/admin/catgeory/add">Add New Catgeory</Link>
      </Button>
      <Table
        cellCount={2}
        loading={loading}
        columns={["Catgeory Name", "Action"]}
      >
        {categories.map((catgeory: any) => (
          <TableRow
            columns={[]}
            tableHeading={catgeory.name}
            key={catgeory._id}
          >
            <Link
              href={`/dashboard/admin/catgeory/put/${catgeory._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={() => deletePlatform(catgeory._id)}
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
