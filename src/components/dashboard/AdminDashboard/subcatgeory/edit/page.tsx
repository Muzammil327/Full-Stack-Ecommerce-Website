"use client";
import React, { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useParams } from "next/navigation";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";
import { EditAdminSubCatgeoryAction } from "@/src/action/admin/GETAdminSubCatgeoryAction";
import Select from "react-select";

const AdminSubCatgeoryEditView = () => {
  const { put } = useParams();
  const putAsString = Array.isArray(put) ? put[0] : put;

  const [loadings, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [catgeoryId, setCatgeoryId] = useState<
    { value: string; label: string }[]
  >([]);

  // Ensure the return type of EditAdminSubCatgeoryAction is properly typed
  const { loading1, error1, data } = EditAdminSubCatgeoryAction({
    subcatgeoryId: putAsString,
  }) as any;

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      const options = data.cat.map(({ _id, name }: any) => ({
        value: _id,
        label: name,
      }));
      setCatgeoryId(options); // Set category IDs if 'data' exists
    }
  }, [data]);

  const { loading, error, categories } = GETAdminCatgeoryAction();

  if (loading || loading1) return <h1>Loading...</h1>;
  if (error || error1) return <h1>Error loading data</h1>;

  // Handle form submission
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const categoryIds = catgeoryId.map((category) => category.value);

      const response = await axios.put(
        `/api/admin/subcatgeory?subcatgeoryId=${put}`,
        {
          name,
          catgeoryId: categoryIds,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        setCatgeoryId([]);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Some fields are empty");
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

  return (
    <form onSubmit={SubmitHandle} className="container mx-auto px-12 my-10">
      <div className="md:mb-5 mb-2">
        <Label label="Sub Category Name:" htmlFor="subcatgeoryname" />
        <Input
          name="subcatgeoryname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your sub category name."
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
      <Button variant="outline" type="submit" title="update category button">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminSubCatgeoryEditView;
