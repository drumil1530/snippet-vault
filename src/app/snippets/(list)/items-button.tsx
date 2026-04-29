"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent as MenuContent,
  DropdownMenuItem as MenuItem,
  DropdownMenuTrigger as MenuTrigger,
} from "@/ui/dropdown-menu";
import { appRoutes } from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonGroup, ButtonGroupSeparator } from "@/ui/button-group";
import { ChevronDownIcon } from "lucide-react";

export default function ItemsButtonDropdown({
  pageItems,
}: {
  pageItems: number;
}) {
  const [items, setItems] = useState(pageItems);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  function handleClick(newItemsNumber: number) {
    if (newItemsNumber !== 6) params.set("items", newItemsNumber.toString());
    else params.delete("items");
    setItems(newItemsNumber);

    router.push(appRoutes.snippets.list + "?" + params.toString());
  }

  return (
    <DropdownMenu>
      <ButtonGroup>
        <Button variant="outline">Items</Button>
        <ButtonGroupSeparator />
        <MenuTrigger asChild>
          <Button variant="outline" className="ps-2 pe-1">
            {items}
            <ChevronDownIcon className="h-1 w-1 mt-0.5" />
          </Button>
        </MenuTrigger>
      </ButtonGroup>
      <MenuContent className="min-w-auto">
        <MenuItem onClick={() => handleClick(3)}>3</MenuItem>
        <MenuItem onClick={() => handleClick(6)}>6</MenuItem>
        <MenuItem onClick={() => handleClick(9)}>9</MenuItem>
        <MenuItem onClick={() => handleClick(12)}>12</MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
}
