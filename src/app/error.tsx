"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
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
    <section>
      <h2>Something went wrong!</h2>
      {/* <Button variant="paddingWidth" round="md" asChild>
        <Link href="/">Try again</Link>
      </Button> */}
    </section>
  );
}
