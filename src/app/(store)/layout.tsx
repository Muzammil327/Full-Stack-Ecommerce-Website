import Navbar from "@/components/layout/Navbar/page";
import Footer from "@/components/layout/Footer/page";
import Instragram from "@/src/components/layout/Instragram/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Instragram />
      <Footer />
    </>
  );
}
