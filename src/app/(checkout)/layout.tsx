import { OrderProvider } from "@/src/components/context/orderContext";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OrderProvider>{children}</OrderProvider>;
}
