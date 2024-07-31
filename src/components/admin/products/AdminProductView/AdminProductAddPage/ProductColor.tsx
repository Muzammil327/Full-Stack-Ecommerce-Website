import Label from "@/src/components/ui/Label";
import { Color } from "@/src/utils/fetchColor";
import Select from "react-select";

export function ProductColor({ colors, setColors }: any) {
  const { error, loading, color } = Color();


  const options = color.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  if(error) return <h1>Error from color.</h1>

  const handleSelectChange = (selectedOptions: any) => {
    setColors(selectedOptions);
  };

  return (
    <div className="mb-6">
      <Label label="Colors:" htmlFor="colors" />
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        value={loading ? []: colors}
        className="mt-1"
      />
    </div>
  );
}
