import { ProductCardProvider } from "@/src/components/context/productCard";
import { ReactNode } from "react";

export default function CatgeoryLayout({ children }: { children: ReactNode }) {
  return <ProductCardProvider>{children}</ProductCardProvider>;
}
