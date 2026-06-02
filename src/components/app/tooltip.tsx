import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { ReactNode } from "react";

type AppTooltipProps = {
  children: ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
};

export default function AppTooltip({ children, content, side }: AppTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
