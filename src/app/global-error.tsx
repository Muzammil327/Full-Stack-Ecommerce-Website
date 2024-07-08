"use client";
import { Button } from "@/src/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button
          variant="paddingWidth"
          round="md"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again Later Plz Go to Home Page!
        </Button>
      </body>
    </html>
  );
}
