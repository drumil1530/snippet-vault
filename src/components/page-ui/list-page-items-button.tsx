"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { appRoutes } from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";

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
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Items | {items}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleClick(3)}>3</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick(6)}>6</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick(9)}>9</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick(12)}>12</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
