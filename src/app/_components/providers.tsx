"use client";

import ThemeProvider from "@/app/_components/theme/theme-provider";
import { ReactNode } from "react";
import { TooltipProvider } from "@/ui/tooltip";
import MainContent from "./main-content";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <MainContent>{children}</MainContent>
      </TooltipProvider>
    </ThemeProvider>
  );
}
