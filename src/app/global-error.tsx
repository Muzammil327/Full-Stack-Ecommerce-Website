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
            () => reset()
          }
        >
          Try again Later Plz Go to Home Page!
        </Button>
      </body>
    </html>
  );
}
