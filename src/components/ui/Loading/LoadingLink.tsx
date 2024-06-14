"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingLink({
  children,
  link,
  class_name,
}: Readonly<{
  children: React.ReactNode;
  link: string;
  class_name: string;
}>) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = (e: any) => {
    setLoading(true);
    // Simulate a network request or navigation delay
    setTimeout(() => {
      setLoading(false);
      // Simulate navigation here, e.g., history.push('/new-page');
    }, 2000);
  };

  return (
    <>
      <div className={`loader ${loading ? "active" : ""}`}>
        <div className="spinner"></div>
      </div>
      <Link href={link} onClick={handleLinkClick} className={class_name}>
        {children}
      </Link>
    </>
  );
}
