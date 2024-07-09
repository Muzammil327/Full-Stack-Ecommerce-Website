import * as React from "react";
import Button from "@/src/components/ui/Button";
import { FaSearch } from "react-icons/fa";

export function SearchIcon() {
  return (
    <Button className="button_outline">
      <FaSearch />
    </Button>
  );
}
