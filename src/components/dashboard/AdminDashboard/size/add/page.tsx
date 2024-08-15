"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";

const AdminSizeAddView = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`/api/admin/size`, {
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
      <Button
        title="add size"
        variant="outline"
        type="submit"
        disabled={loadings}
      >
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminSizeAddView;
