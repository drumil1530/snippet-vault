import { appRoutes } from "@/utils/routes";
import Link from "next/link";
import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "@/ui/button";
import { LogIn, PlusIcon } from "lucide-react";
import UserMenu from "@/features/auth/components/profile-button";
import { Skeleton } from "./ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Suspense } from "react";
import { AuthSession } from "@/lib/auth";
import { getSession } from "@/features/auth/actions/session";

export default function Navbar() {
  return (
    <header className="w-full bg-background shadow dark:border-b dark:border-accent">
      <nav className="flex justify-between items-center py-3 px-4 md:px-0 w-full max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <Link href={appRoutes.home} className="text-2xl" title="Snippet Vault">
          Snippets Vault
        </Link>
        <div className="flex gap-1.5">
          <Suspense fallback={<NavbarAuthSkeleton />}>
            <NavbarAuth />
          </Suspense>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

async function NavbarAuth() {
  const session = await getSession();

  if (!session) {
    return <LoggedOutNavbar />;
  }

  return <LoggedInNavbar session={session} />;
}

function LoggedInNavbar({ session }: { session: AuthSession }) {
  return (
    <>
      <Button asChild>
        <Link href={appRoutes.snippets.new}>
          <PlusIcon />
          New
        </Link>
      </Button>

      <UserMenu session={session} />
    </>
  );
}

function LoggedOutNavbar() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <PlusIcon /> New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52 space-y-3 p-4 justify-center">
          <p className="text-center">You need to be logged in to create a snippet.</p>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href={appRoutes.auth.login}>
              <LogIn /> Login
            </Link>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserMenu session={null} />
    </>
  );
}

function NavbarAuthSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-18 rounded-lg" />
      <Skeleton className="size-8 rounded-lg" />
    </>
  );
}
