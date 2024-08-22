import React from "react";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Select from "@/src/components/ui/Select";

export function ProductName({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  return (
    <div className="md:mb-5 mb-2">
      <div className="flex items-center justify-between">
        <Label label="Product Name:" htmlFor="productname" />
        <span>{name.length}</span>
      </div>
      <Input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your product name."
        type="text"
      />
    </div>
  );
}

export function ProductPrice({
  pPrice,
  setPPrice,
}: {
  pPrice: number | undefined;
  setPPrice: (name: number) => void;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor="productpurchaseprice" label="Purchase Price:" />
      <Input
        type="number"
        name="productpurchaseprice"
        value={pPrice || ""}
        onChange={(e) => setPPrice(parseInt(e.target.value))}
        placeholder="Enter your product purchase price."
      />
    </div>
  );
}

export function ProductDiscountPrice({
  discountPrice,
  setDiscountPrice,
}: {
  discountPrice: number | undefined;
  setDiscountPrice: (value: number) => void;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor="productdiscountprice" label="Discount Price:" />
      <Input
        type="number"
        name="productdiscountprice"
        value={discountPrice || ""}
        onChange={(e) => setDiscountPrice(parseInt(e.target.value))}
        placeholder="Enter discount percentage."
      />
    </div>
  );
}

export function ProductShortDes({
  Sdescription,
  setSdescription,
}: {
  Sdescription: string;
  setSdescription: (description: string) => void;
}) {
  return (
    <div className="md:mb-5 mb-2">
      <div className="flex items-center justify-between">
        <Label label="Short Description:" htmlFor="sdescription" />
        <span>{Sdescription.length}</span>
      </div>
      <textarea
        value={Sdescription}
        onChange={(e) => setSdescription(e.target.value)}
        placeholder="Enter your short description."
        className="shadow-sm rounded-md w-full px-4 py-16 border border-dashed border-gray-900/25 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-2"
      ></textarea>
    </div>
  );
}

export function ProductStatus({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (status: string) => void;
}) {
  const statusData = [
    {
      value: "",
      label: "Select Status",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "out of stock",
      label: "Out Of Stock",
    },
  ];
  return (
    <div className="mb-6">
      <Label label="Status:" htmlFor="status" />
      <Select
        options={statusData}
        selectedOption={status}
        onChange={(e: any) => setStatus(e.target.value)}
      />
    </div>
  );
}
