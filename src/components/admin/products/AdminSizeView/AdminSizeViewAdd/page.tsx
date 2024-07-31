"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "@/src/components/ui/form/form";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [name, setName] = useState<string>("");

  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`/api/product/size`, {
        name,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        router.push("/dashboard/admin/size");
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
        <Label label="Size Name:" htmlFor="sizename" />
        <Input
          name="sizename"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your size name."
          type="text"
        />
      </div>
      <Button className="button_outline w-full py-4 rounded-md">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default Page;
