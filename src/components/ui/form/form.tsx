import React from "react";

export default function Form({
  SubmitHandle,
  children,
  className,
}: {
  SubmitHandle: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form onSubmit={SubmitHandle} className={className}>
      {children}
    </form>
  );
}
