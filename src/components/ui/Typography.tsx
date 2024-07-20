import Link from "next/link";
import React, { ReactNode } from "react";
import { roboto, montserrat } from "@/src/app/font";

export function Heading1({
  title,
  className,
}: {
  title: any;
  className: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-semibold lg:text-5xl h1 ${roboto.className} ${className}`}
    >
      {title}
    </h1>
  );
}
export function Heading2({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <h2
      className={`mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${roboto.className} ${className}`}
    >
      {title}
    </h2>
  );
}
export function Heading3({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <h3
      className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight ${roboto.className} ${className}`}
    >
      {title}
    </h3>
  );
}
export function Heading4({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {title}
    </h4>
  );
}
export function Heading5({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return <h4 className={`text-2xl font-semibold ${className}`}>{title}</h4>;
}
export function Heading6({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return <h4 className={`text-2xl font-semibold ${className}`}>{title}</h4>;
}
export function Paragraph({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-6 ${montserrat.className} ${className}`}
    >
      {title}
    </p>
  );
}

export function Links({
  children,
  className,
  slug,
  onClick,
  title,
  prefetch = true,
  target = "_blank" || undefined,
}: {
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  slug: string;
  title: string;
  target?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={slug}
      className={`${className} font-medium text-primary link1 ${montserrat.className}`}
      target={target}
      prefetch={prefetch}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function Lead({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <p
      className={`text-xl text-muted-foreground ${montserrat.className} ${className}`}
    >
      {title}
    </p>
  );
}
