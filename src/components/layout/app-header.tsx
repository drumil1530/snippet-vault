import { Kbd } from "../ui/kbd";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function AppHeader() {
  return (
    <header className="flex justify-between items-center bg-sidebar sticky z-10 top-0 left-0 p-2 mb-2 w-full shadow">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger size="lg" />
        </TooltipTrigger>
        <TooltipContent side="right">
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>b</Kbd>
        </TooltipContent>
      </Tooltip>
      <div className="me-3">Welcome to Snippet Vault!</div>
    </header>
  );
}
