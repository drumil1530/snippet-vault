"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme/theme-toggle";
import {
  Sidebar,
  SidebarHeader as Header,
  SidebarContent as Content,
  SidebarGroup as Group,
  SidebarFooter as Footer,
  SidebarGroupLabel as GroupLabel,
  SidebarGroupContent as GroupContent,
  SidebarMenu as Menu,
  SidebarMenuItem as MenuItem,
  SidebarMenuButton as MenuButton,
} from "@/ui/sidebar";
import { Braces, ChevronDown, Plus, User2 } from "lucide-react";
import { Button } from "@/ui/button";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/ui/collapsible";
import { appRoutes } from "@/utils/routes";

export default function AppSidebar() {
  return (
    <Sidebar>
      <Header>
        <Link href={appRoutes.home} className="text-3xl font-semibold p-1">
          Snippet Vault
        </Link>
      </Header>

      <SidebarContent />

      <Footer className="p-2 flex-row justify-between">
        <Button size={"icon"} variant={"outline"}>
          <User2 className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">User</span>
        </Button>
        <ModeToggle />
      </Footer>
    </Sidebar>
  );
}

function SidebarContent() {
  const pathName = usePathname();

  const openFor = (path: string) => path.startsWith(path);
  const isActive = (path: string) => path === pathName;

  return (
    <Content>
      <Collapsible
        defaultOpen={openFor("snippets")}
        className="group/collapsible"
      >
        <Group>
          <GroupLabel asChild className="text-base">
            <CollapsibleTrigger>
              Snippets
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:-rotate-180" />
            </CollapsibleTrigger>
          </GroupLabel>
          <CollapsibleContent>
            <GroupContent>
              <Menu>
                <MenuItem>
                  <MenuButton
                    asChild
                    isActive={isActive(appRoutes.snippets.list)}
                  >
                    <Link href={appRoutes.snippets.list}>
                      <Braces />
                      Explore Snippets
                    </Link>
                  </MenuButton>
                </MenuItem>
                <MenuItem>
                  <MenuButton
                    asChild
                    isActive={isActive(appRoutes.snippets.new)}
                  >
                    <Link href={appRoutes.snippets.new}>
                      <Plus />
                      New Snippets
                    </Link>
                  </MenuButton>
                </MenuItem>
              </Menu>
            </GroupContent>
          </CollapsibleContent>
        </Group>
      </Collapsible>
    </Content>
  );
}
