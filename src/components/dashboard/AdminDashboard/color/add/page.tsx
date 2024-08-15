"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";

const AdminColorAddView = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`/api/admin/color`, {
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
        <Label label="Color Name:" htmlFor="colorname" />
        <Input
          name="colorname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Color Name."
          type="text"
          disabled={loadings}
        />
      </div>
      <Button
        title="add color"
        variant="outline"
        type="submit"
        disabled={loadings}
      >
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminColorAddView;
