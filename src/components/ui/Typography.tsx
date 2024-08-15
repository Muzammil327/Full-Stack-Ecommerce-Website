import Link from "next/link";
import React, { ReactNode } from "react";
import { roboto } from "@/src/app/font";

// Utility type for combining custom class names
type ClassNameProps = {
  className?: string;
};

// Heading1 Component
export function Heading1({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-semibold lg:text-5xl ${roboto.className} ${className}`}
    >
      {title}
    </h1>
  );
}

// Heading2 Component
export function Heading2({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return (
    <h2
      className={`mt-10 scroll-m-20 border-b pb-2 md:text-3xl sm:text-2xl text-xl font-semibold tracking-tight transition-colors first:mt-0 ${roboto.className} ${className}`}
    >
      {title}
    </h2>
  );
}

// Heading3 Component
export function Heading3({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return (
    <h3
      className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight ${roboto.className} ${className}`}
    >
      {title}
    </h3>
  );
}

// Heading4 Component
export function Heading4({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {title}
    </h4>
  );
}

// Heading5 Component
export function Heading5({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return <h5 className={`text-xl font-semibold ${className}`}>{title}</h5>;
}

// Heading6 Component
export function Heading6({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return <h6 className={`text-lg font-semibold ${className}`}>{title}</h6>;
}

// Paragraph Component
export function Paragraph({
  children,
  className,
}: {
  children: ReactNode;
} & ClassNameProps) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
    >
      {children}
    </p>
  );
}

// Links Component
export function Links({
  children,
  className,
  slug,
  onClick,
  title,
  target = "_self",
}: {
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  slug: string;
  title: string;
  target?: "_self" | "_blank";
  onClick?: () => void;
}) {
  return (
    <Link
      href={slug}
      className={`${className} font-medium text-primary link1`}
      target={target}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// Lead Component
export function Lead({
  title,
  className,
}: {
  title: ReactNode;
} & ClassNameProps) {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>{title}</p>
  );
}
