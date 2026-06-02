"use client";

import AppTooltip from "@/components/app/tooltip";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CopyButtonProps = { code: string; className?: ClassValue };

export function CodeCopyButton({ code, className }: CopyButtonProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  function handleClick() {
    setClicked(true);
    navigator.clipboard.writeText(code);

    setTimeout(() => setClicked(false), 1000);
    toast.success("Code copied!", { position: "top-center" });
  }

  return (
    <AppTooltip content="Copy">
      <Button
        variant="ghost"
        size="icon"
        className={cn("absolute top-2 right-2 z-1 [&>svg]:size-[1.2rem]", className)}
        onClick={handleClick}
      >
        {clicked ? <Check /> : <Copy />}
        <span className="sr-only">Copy</span>
      </Button>
    </AppTooltip>
  );
}
