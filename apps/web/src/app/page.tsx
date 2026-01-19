"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { ExampleForm } from "@/components/examples/example-form";

export default function Home() {
  return (
    <main className="p-6">
      <Toaster />
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>lucide and shadcn check</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Rocket />
          <Button
            onClick={() =>
              // Example of how to use toast popups (make sure Toaster is somewhere on the page)
              toast("Working!", {
                description: "This is a description",
                action: {
                  label: "Optional button",
                  onClick: () => console.log("Button clicked"),
                },
              })
            }
          >
            Check toast
          </Button>
        </CardContent>
      </Card>
      <br />
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Example zod form</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <ExampleForm />
        </CardContent>
      </Card>
    </main>
  );
}
