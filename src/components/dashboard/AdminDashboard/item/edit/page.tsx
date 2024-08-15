"use client";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useParams } from "next/navigation";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";
import GETAdminSubCatgeoryAction from "@/src/action/admin/GETAdminSubCatgeoryAction";
import Select from "react-select";
import { EditAdminItemAction } from "@/src/action/admin/GETAdminItemAction";
// EditAdminItemAction
interface Product {
  value: string;
  label: string;
}

const AdminItemsEditView = () => {
  const { put } = useParams();
  const putAsString = Array.isArray(put) ? put[0] : put;

  const { loading1, error1, data } = EditAdminItemAction({
    itemId: putAsString,
  }) as any;

  const [loadings, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      const options = data.cat.map(({ _id, name }: any) => ({
        value: _id,
        label: name,
      }));
      setCatgeoryId(options); // Set category IDs if 'data' exists
      const options2 = data.subcat.map(({ _id, name }: any) => ({
        value: _id,
        label: name,
      }));
      setSubCatgeoryId(options2); // Set category IDs if 'data' exists
    }
  }, [data]);

  if (loading || loading1) return <h1>Loading...</h1>;
  if (error || error1) return <h1>Error loading data</h1>;

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const categoryIds = catgeoryId.map((category) => category.value);
      const subcategoryIds = subCatgeoryId.map((subcatgeory) => subcatgeory.value);
      const response = await axios.put(`/api/admin/items?itemsId=${put}`, {
        name,
        catgeoryId: categoryIds,
        subCatgeoryId: subcategoryIds,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        setCatgeoryId([]);
        setSubCatgeoryId([]);
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

  return (
    <form onSubmit={SubmitHandle} className="container mx-auto px-12 my-10">
      <div className="md:mb-5 mb-2">
        <Label label="Size Name:" htmlFor="sizename" />
        <Input
          name="sizename"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your size name."
          type="text"
          disabled={loadings}
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
      <Button variant="outline" type="submit" title="update size button">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminItemsEditView;
