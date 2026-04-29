import type { Metadata } from "next";
import { Geist_Mono, Nunito_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import Providers from "@/app/_components/providers";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | Snippet Vault", default: "Snippet Vault" },
  description: "An app to save code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        montserratHeading.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
