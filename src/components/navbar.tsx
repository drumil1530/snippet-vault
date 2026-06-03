import { appRoutes } from "@/utils/routes";
import Link from "next/link";
import { ThemeToggle } from "./theme/theme-toggle";
import { buttonVariants } from "@/ui/button";
import { PlusIcon } from "lucide-react";
import ProfileButton from "@/features/auth/components/profile-button";

export default function Navbar() {
  return (
    <header className="w-full bg-background shadow dark:border-b dark:border-accent mb-3">
      <nav className="flex justify-between items-center py-3 px-4 md:px-0 w-full max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <Link href={appRoutes.home} className="text-2xl" title="Snippet Vault">
          Snippets Vault
        </Link>
        <div className="flex gap-1.5">
          <Link href={appRoutes.snippets.new} className={buttonVariants({ variant: "default" })}>
            <PlusIcon /> New
          </Link>
          <ThemeToggle />
          <ProfileButton />
        </div>
      </nav>
    </header>
  );
}
