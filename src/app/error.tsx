"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        variant="paddingWidth"
        round="md"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        asChild
      >
        Try again
      </Button>
    </div>
  );
}
