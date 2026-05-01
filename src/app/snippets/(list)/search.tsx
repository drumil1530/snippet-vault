"use client";

import { Button } from "@/ui/button";
import { ButtonGroup } from "@/ui/button-group";
import {
  Combobox,
  ComboboxContent as Content,
  ComboboxEmpty as Empty,
  ComboboxInput,
  ComboboxItem as Item,
  ComboboxList as List,
} from "@/ui/combobox";
import { Language } from "@/generated/prisma/client";
import { appRoutes } from "@/utils/routes";
import { useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useState, type SubmitEvent } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { ChevronDown, ChevronUp, EraserIcon, Search } from "lucide-react";
import { ComboboxItem } from "@/lib/types/shadcn/combobox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import ItemsButtonDropdown from "./items-button";

export default function SnippetSearch({ languages }: { languages: Language[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const titleParam = searchParams.get("title") || "";
  const languageParam = searchParams.get("language")?.toLowerCase();
  const selectedLanguage = languages.find((l) => l.slug === languageParam);

  const items = languages.map((l) => ({
    id: l.id,
    value: l.slug,
    label: l.name,
  })) satisfies ComboboxItem[];

  const defaultItemValue = selectedLanguage
    ? ({
        id: selectedLanguage.id,
        label: selectedLanguage.name,
        value: selectedLanguage.slug,
      } satisfies ComboboxItem)
    : null;

  const [searchQuery, setSearchQuery] = useState(titleParam);
  const [searchLanguage, setSearchLanguage] = useState<ComboboxItem | null>(defaultItemValue);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (searchQuery) params.set("query", searchQuery);
    else params.delete("query");

    if (searchLanguage) params.set("language", searchLanguage.value);
    else params.delete("language");

    params.delete("page");

    router.push(appRoutes.home + "?" + params.toString());
  }

  function handleReset() {
    setSearchLanguage(null);
    setSearchQuery("");
  }

  return (
    <CollapsibleSearch>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-1.5 w-full">
        <ButtonGroup className="w-full">
          <InputGroup>
            <InputGroupInput
              value={searchQuery}
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Combobox
            items={items}
            value={searchLanguage}
            defaultValue={defaultItemValue}
            onValueChange={(value) => setSearchLanguage(value)}
            autoHighlight
          >
            <ComboboxInput showClear placeholder="Languages" className="min-w-26" />
            <Content>
              <Empty>No language found.</Empty>

              <List>
                {(language: ComboboxItem) => (
                  <Item key={language.id} value={language}>
                    {language.label}
                  </Item>
                )}
              </List>
            </Content>
          </Combobox>
        </ButtonGroup>
        <div className="flex justify-between flex-row-reverse md:flex-row gap-1">
          <div className="flex gap-1">
            <Button type="submit" className="cursor-pointer">
              <Search /> Search
            </Button>
            <Button
              type="reset"
              variant="destructive"
              onClick={handleReset}
              className="cursor-pointer"
            >
              <EraserIcon /> Reset
            </Button>
          </div>
          <ItemsButtonDropdown />
        </div>
      </form>
    </CollapsibleSearch>
  );
}

function CollapsibleSearch({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col justify-start items-end gap-1.5"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon" className="*:h-1.5 *:w-1.5">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full mt-1">{children}</CollapsibleContent>
    </Collapsible>
  );
}
