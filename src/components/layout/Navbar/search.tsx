"use client";

import * as React from "react";

import { Button } from "@/src/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { FaSearch } from "react-icons/fa";
import { ShadcnUIInput } from "@/src/components/shadcnUI/Shadcnui-Input";

export function SearchIcon() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="iconSmall" round="md">
          <FaSearch />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[600px] w-full mt-4 py-4 px-4 flex items-center gap-2">
        <ShadcnUIInput placeholder="Search for Products" type="text" />
        <Button variant="paddingWidth" round="md">
        <FaSearch />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
