"use client";

import { Button, buttonVariants } from "@/ui/button";
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
import { ReactNode, useEffect, useMemo, useState, type SubmitEvent } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { ChevronDown, ChevronUp, EraserIcon, Search } from "lucide-react";
import { ComboboxItem } from "@/lib/types/shadcn/combobox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import ItemsButtonDropdown from "./items-button";
import AppTooltip from "@/app/_components/ui/tooltip";
import { SearchFilterParams } from "../_components";

export default function SnippetSearch({ languages }: { languages: Language[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const queryParam = searchParams.get(SearchFilterParams.QUERY) || "";
  const languageParam = searchParams.get(SearchFilterParams.LANGUAGE)?.toLowerCase();

  const items = useMemo(
    () =>
      languages.map((l) => ({
        id: l.id,
        value: l.slug,
        label: l.name,
      })),
    [languages],
  );

  const selectedLanguage = useMemo(
    () => items.find((i) => i.value === languageParam) ?? null,
    [items, languageParam],
  );

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchLanguage, setSearchLanguage] = useState<ComboboxItem | null>(selectedLanguage);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setSearchLanguage(selectedLanguage), [selectedLanguage]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setSearchQuery(queryParam), [queryParam]);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (searchQuery) params.set(SearchFilterParams.QUERY, searchQuery);
    else params.delete(SearchFilterParams.QUERY);

    if (searchLanguage) params.set(SearchFilterParams.LANGUAGE, searchLanguage.value);
    else params.delete(SearchFilterParams.LANGUAGE);

    params.delete(SearchFilterParams.PAGE);

    router.push(appRoutes.home + "?" + params.toString());
  }

  function handleReset() {
    setSearchLanguage(null);
    setSearchQuery("");
  }

  return (
    <CollapsibleContainer isOpen={params.size > 0}>
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
            onValueChange={setSearchLanguage}
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
    </CollapsibleContainer>
  );
}

function CollapsibleContainer(props: { children: ReactNode; isOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsOpen(props.isOpen), [props.isOpen]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col justify-start items-end gap-1.5"
    >
      <AppTooltip content="Search" side="left">
        <CollapsibleTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "*:size-1.5",
          })}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </CollapsibleTrigger>
      </AppTooltip>
      <CollapsibleContent className="w-full mt-1">{props.children}</CollapsibleContent>
    </Collapsible>
  );
}
