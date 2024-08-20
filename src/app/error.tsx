"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button, Heading1, Links } from "@/src/components/ui/ui";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex items-center justify-center py-20 flex-col">
      <Heading1 title="Something went wrong!" className="" />
      <Button className="button_solid px-6 mt-5" title="Try again">
        <Links slug="/" title="error try again">Try again</Links>
      </Button>
    </section>
  );
}
