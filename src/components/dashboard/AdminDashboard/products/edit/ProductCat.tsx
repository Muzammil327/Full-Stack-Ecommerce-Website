import React from "react";
import Label from "@/src/components/ui/Label";
import Select from "react-select";
import GETAdminCatgeoryAction from "@/src/action/admin/GETAdminCatgeoryAction";
import GETAdminItemAction from "@/src/action/admin/GETAdminItemAction";
import GETAdminSubCatgeoryAction from "@/src/action/admin/GETAdminSubCatgeoryAction";

type SizeData = {
  _id: String;
  name: String;
};

export function ProductCategory({ category, setCategory }: any) {
  const { error, loading, categories } = GETAdminCatgeoryAction();
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
  const { error, loading, subCatgeory } = GETAdminSubCatgeoryAction();

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
  const { error, loading, items } = GETAdminItemAction();

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
