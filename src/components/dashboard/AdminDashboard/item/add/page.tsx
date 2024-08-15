"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";
import GETAdminSubCatgeoryAction from "@/src/action/admin/GETAdminSubCatgeoryAction";
import Select from "react-select";

interface Product {
  value: string;
  label: string;
}

const AdminAddItemView = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [catgeoryId, setCatgeoryId] = useState<Product[]>([]);
  const { error, categories } = GETAdminCatgeoryAction();

  const handleSelectChange = (selectedOptions: any) => {
    setCatgeoryId(selectedOptions);
  };

  const options = categories.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  const [subCatgeoryId, setSubCatgeoryId] = useState<Product[]>([]);
  const { loading, subCatgeory } = GETAdminSubCatgeoryAction();

  const handleSelectChange1 = (selectedOptions: any) => {
    setSubCatgeoryId(selectedOptions);
  };
  const options1 = subCatgeory.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const categoryIds = catgeoryId.map((category) => category.value);
      const subcategoryIds = subCatgeoryId.map((category) => category.value);

      const response = await axios.post(`/api/admin/items`, {
        name,
        catgeoryId: categoryIds,
        subCatgeoryId: subcategoryIds,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        router.push("/dashboard/admin/items");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Some Field Empty");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <h1>Error from store sub catgeory filter</h1>;

  return (
    <form onSubmit={SubmitHandle} className="container mx-auto px-12 my-10">
      <div className="md:mb-5 mb-2">
        <Label label="Item Name:" htmlFor="itemname" />
        <Input
          name="itemname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your item name."
          type="text"
        />
      </div>
      <div className="mb-6">
        <Label label="Category:" htmlFor="category" />
        <Select
          isMulti
          options={loading ? [] : options}
          onChange={handleSelectChange}
          value={catgeoryId}
          className="mt-1"
        />
      </div>
      <div className="mb-6">
        <Label label="Sub Catgeory:" htmlFor="subcatgeory" />
        <Select
          isMulti
          options={loading ? [] : options1}
          onChange={handleSelectChange1}
          value={subCatgeoryId}
          className="mt-1"
        />
      </div>
      <Button type="submit" variant="solid" disabled={loadings}>
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminAddItemView;
