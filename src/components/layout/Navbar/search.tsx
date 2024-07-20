import * as React from "react";
import Button from "@/src/components/ui/Button";
import { FaSearch } from "react-icons/fa";

export function SearchIcon() {
  return (
    <div className="ml-4 relative">
      <Button className="button_outline md:!p-3 !p-2">
        <FaSearch />
      </Button>
    </div>
  );
}
