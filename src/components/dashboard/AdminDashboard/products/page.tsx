"use client";
import axios from "axios";
import Button from "@/src/components/ui/Button";
import Table, { TableRow } from "@/src/components/ui/Table/Table2";
import Pagination from "@/src/components/elements/pagination";
import { AdminProductProps } from "@/src/types/product";
import GETAdminProductAction from "@/src/action/admin/GETAdminProductAction";
import { useState } from "react";
import LoaderOverlay from "@/src/components/ui/Loading/LoaderOverlay/page";
import { Links } from "@/src/components/ui/Typography";

export default function AdminProductView() {
  const { error, loading, setPage, page, fetchProduct, pagination, products } =
    GETAdminProductAction();
  const [loader, setLoader] = useState<boolean>(false);

  const deleteProduct = async (id: string, publicId: string, slider: []) => {
    setLoader(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${id}?publicId=${publicId}&slider=${slider.join(
          ","
        )}`
      );

      await fetchProduct();
      setLoader(false);
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setLoader(false);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mx-auto md:px-6 px-4 my-8">
      <div className="flex gap-4">
        <Links title="add new products" slug="/dashboard/admin/products/add">
          <Button variant="solid" title="add product">
            Add Product
          </Button>
        </Links>
        <Links title="add new catgeory" slug="/dashboard/admin/catgeory/add">
          <Button variant="solid" title="add product">
            Add Catgeory
          </Button>
        </Links>
        <Links title="add sub catgeory" slug="/dashboard/admin/subcatgeory/add">
          <Button variant="solid" title="add product">
            Add Sub Catgeory
          </Button>
        </Links>
        <Links title="add new items" slug="/dashboard/admin/items/add">
          <Button variant="solid" title="add product">
            Add Item
          </Button>
        </Links>
        <Links title="add new colors" slug="/dashboard/admin/color/add">
          <Button variant="solid" title="add product">
            Add Color
          </Button>
        </Links>
        <Links title="add new size" slug="/dashboard/admin/size/add">
          <Button variant="solid" title="add product">
            Add Size
          </Button>
        </Links>
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
        {products.map((product: AdminProductProps) => (
          <TableRow
            columns={[
              product.cat.map((data: any) => data.name).join(", "),
              product.price, // Format price as a string with 2 decimal places
              product.dPrice, // Format price as a string with 2 decimal places
            ]}
            tableHeading={product.name}
            key={product._id}
          >
            <Links
              slug={`/dashboard/admin/products/put/${product._id}`}
              title="edit product"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Edit
            </Links>
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
      {loader && <LoaderOverlay />}
      <Pagination
        pagination={pagination}
        setPage={setPage}
        page={page}
        loading={loading}
      />
    </div>
  );
}
