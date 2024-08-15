import React from "react";
import ReactQuill from "react-quill";
import Label from "@/src/components/ui/Label";
import "react-quill/dist/quill.snow.css";

export default function ProductLongDes({
  Ldescription,
  setLdescription,
}: {
  Ldescription: string;
  setLdescription: (description: string) => void;
}) {
  return (
    <div className="md:mb-5 mb-2">
      <Label label="Long Description:" htmlFor="ldescription" />
      <ReactQuill
        theme="snow"
        value={Ldescription}
        onChange={setLdescription}
        className="border border-dashed border-gray-900/25 rounded-md mt-2"
      />
    </div>
  );
}
