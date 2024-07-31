"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "@/src/components/ui/form/form";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import Select from "@/src/components/ui/Select";
import { Catgeory } from "@/src/utils/fetchCatgeory";

const Page = () => {
  const [loadings, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [catgeoryId, setCatgeoryId] = useState<string>("");
  const { loading, error, categories } = Catgeory();
  // ---------------------- Handle Product POST DATA ----------------------
  const SubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`/api/product/subcatgeory`, {
        name,
        catgeoryId,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        router.push("/dashboard/admin/subcatgeory");
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

  if (error) return <h1>Error from store catgeory filter</h1>;

  return (
    <Form SubmitHandle={SubmitHandle} className="container mx-auto px-12 my-10">
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
      <div className="md:mb-5 mb-2">
        <Label label="Catgeory Name:" htmlFor="catgeoryname" />
        <Select id="catgeoryname" value={catgeoryId} setValue={setCatgeoryId}>
          {loading ? (
            <React.Fragment>
              <option value="">Select Catgeory</option>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <option value="">Select Catgeory</option>
              {categories.map((data: any) => {
                return (
                  <option value={data._id} key={data._id}>
                    {data.name}
                  </option>
                );
              })}
            </React.Fragment>
          )}
        </Select>
      </div>
      <Button className="button_outline w-full py-4 rounded-md">
        {loadings ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default Page;
