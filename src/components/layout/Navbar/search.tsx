import * as React from "react";
import Button from "@/src/components/ui/Button";
import { FaSearch } from "react-icons/fa";

export function SearchIcon() {
  return (
    <div className="ml-4 relative">
      <Button
          className="flex items-center justify-center !px-3 !h-10"
          variant="outline"
        title="serch here to find the products"
      >
        <FaSearch />
      </Button>
    </div>
  );
}
