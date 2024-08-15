"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";
import Select from "react-select";

interface Product {
  value: string;
  label: string;
}

const AdminAddSubCatgeoryView = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [catgeoryId, setCatgeoryId] = useState<Product[]>([]);

  const { loading, error, categories } = GETAdminCatgeoryAction();
  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const categoryIds = catgeoryId.map((category) => category.value);

      const response = await axios.post(`/api/admin/subcatgeory`, {
        name,
        catgeoryId: categoryIds,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        setCatgeoryId([]);
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

  const options = categories.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    setCatgeoryId(selectedOptions);
  };

  if (error) return <h1>Error from store catgeory filter</h1>;

  return (
    <form onSubmit={SubmitHandle} className="container mx-auto px-12 my-10">
      <div className="md:mb-5 mb-2">
        <Label label="Sub Catgeory Name:" htmlFor="subcatgeoryname" />
        <Input
          name="subcatgeoryname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your sub catgeory name."
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
      <Button variant="solid" disabled={loadings} type="submit">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminAddSubCatgeoryView;
