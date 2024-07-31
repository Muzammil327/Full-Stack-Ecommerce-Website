import React from "react";
import Label from "@/src/components/ui/Label";
import Select from "react-select";
import { Items } from "@/src/utils/fetchItems";
import { Catgeory } from "@/src/utils/fetchCatgeory";
import { SubCatgeory } from "@/src/utils/fetchSubCatgeory";

type SizeData = {
  _id: String;
  name: String;
};

interface CatTypes {
  id: string;
  name: string;
}

export const SubCategory: CatTypes[] = [
  {
    id: "clothing",
    name: "Clothing",
  },
  {
    id: "shoes",
    name: "Shoes",
  },
  {
    id: "shirt",
    name: "Shirt",
  },
];

export function ProductCategory({ category, setCategory }: any) {
  const { error, loading, categories } = Catgeory();
  const options = categories.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    setCategory(selectedOptions);
  };

  if (error) return <h1>Error from Product Catgeory.</h1>;

  return (
    <div className="mb-6">
      <Label label="Category:" htmlFor="category" />
      <Select
        isMulti
        options={loading ? [] : options}
        onChange={handleSelectChange}
        value={category}
        className="mt-1"
      />
    </div>
  );
}

export function ProductSubCategory({ subCategory, setSubCategory }: any) {
  const { error, loading, subCatgeory } = SubCatgeory();

  const options = subCatgeory.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    setSubCategory(selectedOptions);
  };

  if (error) return <h1>Error from Product Sub Catgeory.</h1>;

  return (
    <div className="mb-6">
      <Label label="Sub Category:" htmlFor="subcategory" />
      <Select
        isMulti
        options={loading ? [] : options}
        onChange={handleSelectChange}
        value={subCategory}
        className="mt-1"
      />
    </div>
  );
}

export function ProductItems({ item, setItems }: any) {
  const { error, loading, items } = Items();

  const options = items.map((data: SizeData) => ({
    value: data._id,
    label: data.name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    setItems(selectedOptions);
  };

  if (error) return <h1>Error from Product Items.</h1>;

  return (
    <div className="mb-6">
      <Label label="Items:" htmlFor="items" />
      <Select
        isMulti
        options={loading ? [] : options}
        onChange={handleSelectChange}
        value={item}
        className="mt-1"
      />
    </div>
  );
}
