"use client";
import { Button } from "@/src/components/ui/button";
import { Link } from "lucide-react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button variant="paddingWidth" round="md" asChild>
          <Link href="/">Try again Later Plz Go to Home Page!</Link>
        </Button>
      </body>
    </html>
  );
}
