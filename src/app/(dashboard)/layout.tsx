import { OrderProvider } from "@/src/components/context/orderContext";
import { ProductCardProvider } from "@/src/components/context/productCard";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderProvider>
      <ProductCardProvider>{children}</ProductCardProvider>
    </OrderProvider>
  );
}
