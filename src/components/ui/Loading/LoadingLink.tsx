"use client";
import Link from "next/link";
import React, { useState } from "react";

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

  const handleLinkClick = (e: any) => {
    setLoading(true);
    // Simulate a network request or navigation delay
    setTimeout(() => {
      setLoading(false);
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
