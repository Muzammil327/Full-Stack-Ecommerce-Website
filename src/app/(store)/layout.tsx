import { ProductCardProvider } from "@/src/components/context/productCard";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <ProductCardProvider>{children}</ProductCardProvider>;
}
