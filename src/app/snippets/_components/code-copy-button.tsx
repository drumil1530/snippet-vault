"use client";

import { Button } from "@/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CodeCopyButton({ code }: { code: string }) {
  const [clicked, setClicked] = useState<boolean>(false);

  function handleClick() {
    setClicked(true);
    navigator.clipboard.writeText(code);

    setTimeout(() => setClicked(false), 1000);
    toast.success("Code copied!", { position: "top-center" });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 z-1"
      onClick={handleClick}
    >
      {clicked ? (
        <Check className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Copy className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  );
}
