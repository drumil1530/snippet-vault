"use client";

import { Moon, MoonIcon, Sun, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownMenuTrigger as Trigger,
} from "@/ui/dropdown-menu";
import AppTooltip from "@/components/app/tooltip";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <AppTooltip content="Toggle Theme" side="left">
        <Trigger className={buttonVariants({ variant: "outline", size: "icon" })}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Trigger>
      </AppTooltip>
      <Content align="end" className="min-w-26">
        <Item onClick={() => setTheme("light")}>
          <SunIcon /> Light
        </Item>
        <Item onClick={() => setTheme("dark")}>
          <MoonIcon /> Dark
        </Item>
        <Item onClick={() => setTheme("system")}>
          <SunMoonIcon /> System
        </Item>
      </Content>
    </DropdownMenu>
  );
}
