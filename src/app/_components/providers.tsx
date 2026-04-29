"use client";

import ThemeProvider from "@/app/_components/theme/theme-provider";
import { ReactNode } from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider } from "@/ui/sidebar";
import { TooltipProvider } from "@/ui/tooltip";
import MainContent from "./main-content";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <MainContent>{children}</MainContent>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
