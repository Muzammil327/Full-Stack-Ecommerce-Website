import React, { useEffect } from "react";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import Select from "@/src/components/ui/Select";
import { Platform } from "@/src/utils/fetchPlatform";

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

export function ProductPSlug({
  pSlug,
  setPSlug,
}: {
  pSlug: string;
  setPSlug: (name: string) => void;
}) {
  return (
    <div className="md:mb-5 mb-2">
      <div className="flex items-center justify-between">
        <Label label="Product Slug:" htmlFor="productslug" />
        <span>{pSlug.length}</span>
      </div>
      <Input
        name="productslug"
        value={pSlug}
        onChange={(e) => setPSlug(e.target.value)}
        placeholder="Enter your product name."
        type="text"
      />
    </div>
  );
}

export function ProductPurchasePrice({
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

export function ProductQuantity({
  quantity,
  setQuantity,
}: {
  quantity: number | undefined;
  setQuantity: (name: number) => void;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor="productpurchasequantity" label="Purchase Quantity:" />
      <Input
        type="number"
        name="productpurchasequantity"
        value={quantity || ""}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        placeholder="Enter your product quantity."
      />
    </div>
  );
}

export function ProductDeliveryCharge({
  deliveryCharge,
  setDeliveryCharge,
}: {
  deliveryCharge: number | undefined;
  setDeliveryCharge: (name: number) => void;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor="productdeliverycharge" label="Delivery Charge:" />

      <Input
        type="number"
        name="productdeliverycharge"
        value={deliveryCharge || ""}
        onChange={(e) => setDeliveryCharge(parseInt(e.target.value))}
        placeholder="Enter your product delivery charge."
      />
    </div>
  );
}

export function ProductProfit({
  profit,
  setProfit,
}: {
  profit: number | undefined;
  setProfit: (profit: number) => void;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor="productdeliverycharge" label="Profit:" />

      <Input
        type="number"
        name="productprofit"
        value={profit || ""}
        onChange={(e) => setProfit(parseInt(e.target.value))}
        placeholder="Enter your product profit."
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

export function ProductPlatform({
  platform,
  setPlatform,
  setDeliveryCharge,
}: {
  platform: string;
  setPlatform: (description: string) => void;
  setDeliveryCharge: (charge: number | undefined) => void;
}) {
  const { error, loading, platforms } = Platform();

  useEffect(() => {
    const selectedPlatform = platforms.find(
      (data: any) => data._id === platform
    );

    if (selectedPlatform) {
      setDeliveryCharge(selectedPlatform.shipping);
    } else {
      setDeliveryCharge(undefined); // Reset if the platform doesn't match
    }
  }, [platform, platforms, setDeliveryCharge]);

  if (error) {
    return <h1>Error getting product platform.</h1>;
  }

  return (
    <div className="mb-6">
      <Label label="Platform:" htmlFor="platform" />
      <Select id="platform" value={platform} setValue={setPlatform}>
        {loading ? (
          <option value="">Select Platform</option>
        ) : (
          <>
            <option value="">Select Platform</option>
            {platforms.map((data: any) => (
              <option value={data._id} key={data._id}>
                {data.name}
              </option>
            ))}
          </>
        )}
      </Select>
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
      id: "",
      name: "Select Status",
    },
    {
      id: "active",
      name: "Active",
    },
    {
      id: "out of stock",
      name: "Out Of Stock",
    },
  ];
  return (
    <div className="mb-6">
      <Label label="Status:" htmlFor="status" />
      <Select id="status" value={status} setValue={setStatus}>
        {statusData.map((data) => (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
