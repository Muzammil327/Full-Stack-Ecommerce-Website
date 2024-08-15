"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useParams } from "next/navigation";
import { EditAdminSizeAction } from "@/src/action/admin/GETAdminSizeAction";

const AdminSizeEditView = () => {
  const { put } = useParams();
  const putAsString = Array.isArray(put) ? put[0] : put;

  const [loadings, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { loading, error } = EditAdminSizeAction({
    sizeId: putAsString,
    name,
    setName,
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error from admin dashboard size edit</h1>;

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/size?sizeId=${put}`, {
        name,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
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
      <Button variant="outline" type="submit" title="update size button">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminSizeEditView;
