"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "@/src/components/ui/form/form";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";

const AdminPlatformView = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [shipping, setShipping] = useState<number | undefined>(0);

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`/api/product/platform`, {
        name,
        shipping,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        setShipping(0);
        router.push("/dashboard/admin/platform");
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
    <Form SubmitHandle={SubmitHandle} className="container mx-auto px-12 my-10">
      <div className="md:mb-5 mb-2">
        <Label label="Platform Name:" htmlFor="platformname" />
        <Input
          name="platformname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your platform name."
          type="text"
        />
      </div>
      <div className="md:mb-5 mb-2">
        <Label label="Shipping Charges:" htmlFor="shippingcharge" />
        <Input
          name="shippingcharge"
          value={shipping || ""}
          onChange={(e) => setShipping(parseInt(e.target.value))}
          placeholder="Enter your shipping charge."
          type="number"
        />
      </div>
      <Button className="button_outline w-full py-4 rounded-md">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default AdminPlatformView;
