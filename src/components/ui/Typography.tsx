import React from "react";

export function Heading1({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-2xl font-semibold my-12">{title}</h1>
    </>
  );
}
export function Heading2({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-2xl font-semibold my-12">{title}</h2>
    </>
  );
}
export function Heading3({ title }: { title: string }) {
  return (
    <>
      <h3 className="text-2xl font-semibold my-12">{title}</h3>
    </>
  );
}
export function Paragraph({ title }: { title: string }) {
  return (
    <>
      <p className="text-2xl font-semibold my-12">{title}</p>
    </>
  );
}
