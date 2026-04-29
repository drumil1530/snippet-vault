import { ReactNode } from "react";
import AppHeader from "./app-header";
import { ScrollArea } from "@/ui/scroll-area";
import { Toaster } from "@/ui/sonner";

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="w-full">
      <AppHeader />
      <ScrollArea className="h-[calc(100%-4.3rem)] *:*:block!">
        {children}
      </ScrollArea>
      <Toaster />
    </main>
  );
}
