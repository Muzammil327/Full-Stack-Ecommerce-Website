import { OrderProvider } from "@/src/components/context/orderContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderProvider>
      {children}
    </OrderProvider>
  );
}
