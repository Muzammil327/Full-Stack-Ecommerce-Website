import { ProductCardProvider } from "@/src/components/context/productCard";
import { ReactNode } from "react";
import './style_store.scss'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <ProductCardProvider>{children}</ProductCardProvider>;
}
