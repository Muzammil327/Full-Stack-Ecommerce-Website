import GETAdminSizeAction from "@/src/action/admin/GETAdminSizeAction";
import Label from "@/src/components/ui/Label";
import Select from "react-select";

type SizeData = {
  _id: String;
  name: String;
};

export function ProductSize({ size, setSize }: any) {
  const { error, loading, sizes } = GETAdminSizeAction();

  const options = sizes.map((data: SizeData) => ({
    value: data._id,
    label: data.name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    setSize(selectedOptions);
  };

  if (error) return <h1>Error from Size.</h1>;

  return (
    <div className="mb-6">
      <Label label="Sizes:" htmlFor="size" />
      <Select
        isMulti
        options={loading ? [] : options}
        onChange={handleSelectChange}
        value={size}
        className="mt-1"
      />
    </div>
  );
}
