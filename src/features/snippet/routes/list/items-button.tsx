"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownMenuTrigger as Trigger,
} from "@/ui/dropdown-menu";
import { appRoutes } from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonGroup, ButtonGroupSeparator } from "@/ui/button-group";
import { ChevronDownIcon } from "lucide-react";

export default function ItemsButtonDropdown() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const pageItems = params.get("items") || 6;
  const [items, setItems] = useState(pageItems);

  function handleClick(newItemsNumber: number) {
    if (newItemsNumber !== 6) params.set("items", newItemsNumber.toString());
    else params.delete("items");

    params.delete("page");
    setItems(newItemsNumber);

    router.push(appRoutes.home + "?" + params.toString());
  }

  return (
    <DropdownMenu>
      <ButtonGroup className="text-muted-foreground">
        <Button variant="outline">Items</Button>
        <ButtonGroupSeparator />
        <Trigger asChild>
          <Button variant="outline" className="ps-2 pe-1">
            {items}
            <ChevronDownIcon className="h-1 w-1 mt-0.5" />
          </Button>
        </Trigger>
      </ButtonGroup>
      <Content className="min-w-auto">
        {[3, 6, 9, 12].map((i) => (
          <Item key={i} onClick={() => handleClick(i)} disabled={items === i}>
            {i}
          </Item>
        ))}
      </Content>
    </DropdownMenu>
  );
}
