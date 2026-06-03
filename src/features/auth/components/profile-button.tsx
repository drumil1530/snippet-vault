import AppTooltip from "@/components/app/tooltip";
import { getSession } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { appRoutes } from "@/utils/routes";
import { LogIn, User, UserPlus } from "lucide-react";
import Link from "next/link";

export default function ProfileButton() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <DropdownMenu>
      <AppTooltip content="Profile">
        <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "icon" })}>
          <User className="size-[1.2rem]" />
        </DropdownMenuTrigger>
      </AppTooltip>
      <DropdownMenuContent align="end">{!session && <NotLoggedIn />}</DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotLoggedIn() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Not logged in?</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={appRoutes.register}>
          <UserPlus /> Register
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={appRoutes.login}>
          <LogIn /> Login
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
