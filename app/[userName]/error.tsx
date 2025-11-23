"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

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
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <h2 className="text-xl font-semibold tracking-tight">
          Something went wrong!
        </h2>
        <p className="text-sm text-muted-foreground max-w-[400px]">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <Button onClick={() => reset()} variant="outline">
        Try again
      </Button>
    </div>
  );
}
