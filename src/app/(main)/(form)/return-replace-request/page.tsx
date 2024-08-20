"use client";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import Input from "@/src/components/ui/Input";
import Label from "@/src/components/ui/Label";
import Select from "@/src/components/ui/Select";
import { Heading1 } from "@/src/components/ui/Typography";
import React, { useState } from "react";
import { UploadButton } from "@/src/utils/uploadthing";
import LoaderOverlay from "@/src/components/ui/Loading/LoaderOverlay/page";

export default function ReturnReplaceForm() {
  const [orderId, setOrderId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [returnReason, setReturnReason] = useState<string>("");
  const [productCondition, setProductCondition] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const returnReasonOptions = [
    { value: "", label: "Select an Reason" },
    { value: "Defective", label: "Defective" },
    { value: "Wrong Item", label: "Wrong Item" },
    { value: "Missing Parts", label: "Missing Parts" },
    { value: "Product Not as Described", label: "Product Not as Described" },
  ];

  const productConditionOptions = [
    { value: "", label: "Select an Condition" },
    { value: "Unopend", label: "Unopend" },
    { value: "Used", label: "Used" },
  ];

  const SubmitHandle = () => {
    const datas = [
      orderId,
      productName,
      contactNumber,
      returnReason,
      productCondition,
      productCondition,
      videoUrl,
    ];

    console.log("Form Data Submit:", datas);
  };
  return (
    <main>
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <Heading1 className="capitalize" title="Return Request" />
      </div>
      <Container>
        {isLoading && <LoaderOverlay />}

        <form className="md:my-10 my-6" onSubmit={SubmitHandle}>
          <span>Updated: 8/19/2024</span>
          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="md:my-3 my-2">
              <Label label="Order Id:" htmlFor="orderId" />
              <Input
                type="text"
                value={orderId}
                name="orderId"
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Your Order Id"
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Name:" htmlFor="name" />
              <Input
                type="text"
                value={productName}
                name="name"
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Contact Number:" htmlFor="contactNumber" />
              <Input
                type="number"
                value={contactNumber}
                name="contactNumber"
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter Contact Number (xxxx-xxxx-xxx)"
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Reason for Return:" htmlFor="returnreason" />
              <Select
                options={returnReasonOptions}
                selectedOption={returnReason}
                onChange={(e: any) => setReturnReason(e.target.value)}
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Product Condition:" htmlFor="productCondition" />
              <Select
                options={productConditionOptions}
                selectedOption={productCondition}
                onChange={(e: any) => setProductCondition(e.target.value)}
              />
            </div>
            <div className="md:my-3 my-2 w-full block">
              <Label label="Product Vedio:" htmlFor="productCondition" />
              <UploadButton
                onClientUploadComplete={(res) => {
                  setIsLoading(false);
                  if (res && res.length > 0) {
                    const data = res[0];
                    console.log("File data:", data);
                    setVideoUrl(data.url);
                    alert("Upload Completed");
                  } else {
                    alert("No file uploaded.");
                  }
                }}
                onUploadError={(error: Error) => {
                  setIsLoading(false);
                  alert(`ERROR! ${error.message}`);
                }}
                endpoint={"imageUploader"}
              />
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full my-2">
            Submit
          </Button>
        </form>
      </Container>
    </main>
  );
}
