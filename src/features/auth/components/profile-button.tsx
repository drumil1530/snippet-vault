"use client";

import AppTooltip from "@/components/custom-ui/tooltip";
import { AuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { appRoutes } from "@/utils/routes";
import { User as SessionUser } from "better-auth";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { logout } from "../actions/logout";
import { toast } from "sonner";

interface ProfileButtonProps {
  session: AuthSession | null;
}

export default function UserMenu({ session }: ProfileButtonProps) {
  return (
    <DropdownMenu>
      <AppTooltip content="Profile">
        <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "icon" })}>
          {session?.user.name.charAt(0).toUpperCase() ?? <User className="size-1.5" />}
        </DropdownMenuTrigger>
      </AppTooltip>
      <DropdownMenuContent align="end" className="min-w-fit">
        {session ? <LoggedInUserMenu user={session.user} /> : <GuestUserMenu />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LoggedInUserMenu({ user }: { user: SessionUser }) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="space-y-1">
        <p className="font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <form action={logout}>
        <DropdownMenuItem asChild className="w-full">
          <button
            type="submit"
            onClick={() => {
              toast.success("Logged out successfully!", { position: "top-center" });
            }}
          >
            <LogOut /> Logout
          </button>
        </DropdownMenuItem>
      </form>
    </DropdownMenuGroup>
  );
}

function GuestUserMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={appRoutes.auth.login}>
          <LogIn /> Login
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={appRoutes.auth.register}>
          <UserPlus /> Register
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
