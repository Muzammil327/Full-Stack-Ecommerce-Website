"use client";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import Input from "@/src/components/ui/Input";
import Label from "@/src/components/ui/Label";
import Select from "@/src/components/ui/Select";
import { Heading1 } from "@/src/components/ui/Typography";
import React, { useEffect, useState } from "react";
import LoaderOverlay from "@/src/components/ui/Loading/LoaderOverlay/page";
import { useRouter } from "next/navigation";
import { Processing } from "@/src/components/ui/ui";
import ReturnReplaceAction from "@/src/action/form/returnResponse";

export default function ReturnReplaceForm({ orderId }: any) {
  const [data, setData] = useState<any>({
    orderId: orderId ?? "", // Use `??` to handle nullish values
    userName: "",
    contactNumber: "",
    returnReason: "",
    productCondition: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  return (
    <main>
      <div className="hero bg-slate-200 py-40 flex items-center justify-center">
        <Heading1 className="capitalize" title="Return Request" />
      </div>
      <Container>
        {loading && <LoaderOverlay />}

        <form
          className="md:my-10 my-6"
          onSubmit={(e) =>
            ReturnReplaceAction(e, data, setLoading, setData, router)
          }
        >
          <span>Updated: 8/19/2024</span>
          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="md:my-3 my-2">
              <Label label="Name:" htmlFor="name" />
              <Input
                type="text"
                value={data.userName}
                name="name"
                onChange={(e) => setData({ ...data, userName: e.target.value })}
                placeholder="Enter Your Name"
                disabled={loading}
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Contact Number:" htmlFor="contactNumber" />
              <Input
                type="number"
                value={data.contactNumber}
                name="contactNumber"
                onChange={(e) =>
                  setData({ ...data, contactNumber: e.target.value })
                }
                min={11}
                placeholder="Enter Contact Number (xxxx-xxxx-xxx)"
                disabled={loading}
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Reason for Return:" htmlFor="returnreason" />
              <Select
                options={returnReasonOptions}
                selectedOption={data.returnReason}
                onChange={(e: any) =>
                  setData({ ...data, returnReason: e.target.value })
                }
                disabled={loading}
              />
            </div>
            <div className="md:my-3 my-2">
              <Label label="Product Condition:" htmlFor="productCondition" />
              <Select
                options={productConditionOptions}
                selectedOption={data.productCondition}
                onChange={(e: any) =>
                  setData({ ...data, productCondition: e.target.value })
                }
                disabled={loading}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full my-2"
            disabled={loading}
          >
            {loading ? <Processing /> : "Submit"}
          </Button>
        </form>
      </Container>
    </main>
  );
}
