import { ReactNode } from "react";
import { Toaster } from "@/ui/sonner";
import Navbar from "./navbar";

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="w-full px-4 py-4 md:px-0 max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        {children}
        <Toaster />
      </main>
    </>
  );
}
