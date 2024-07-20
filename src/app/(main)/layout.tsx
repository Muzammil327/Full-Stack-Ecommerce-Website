import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
