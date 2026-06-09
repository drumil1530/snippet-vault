"use client";

import { Button } from "@/ui/button";
import {
  Combobox,
  ComboboxContent as Content,
  ComboboxEmpty as Empty,
  ComboboxInput,
  ComboboxItem as Item,
  ComboboxList as List,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
} from "@/ui/combobox";
import { Language } from "@/generated/prisma/client";
import { appRoutes } from "@/utils/routes";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  type SubmitEvent,
} from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { ChevronDown, ChevronUp, EraserIcon, Search } from "lucide-react";
import { ComboboxItem } from "@/lib/types/shadcn/combobox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import ItemsButtonDropdown from "./items-button";
import { buildSearchParams, parseSearchFilters, SearchFilters } from "./search-utils";
import useTagSearch from "@/features/tag/hooks/useTagSearch";
import AppTooltip from "@/components/custom-ui/tooltip";
import { SearchFilterParams } from "../../constants";

export default function SnippetSearch({ languages }: { languages: Language[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const languageOptions = useMemo(
    () =>
      languages.map((l) => ({
        id: l.id,
        value: l.slug,
        label: l.name,
      })),
    [languages],
  );

  const initialFilters = useMemo(
    () => parseSearchFilters(searchParams, languageOptions),
    [searchParams, languageOptions],
  );

  const [filters, setFilters] = useState(initialFilters);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setFilters(initialFilters), [initialFilters]);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    router.push(appRoutes.home + "?" + buildSearchParams(filters, params));
  }

  function handleReset() {
    setFilters({
      query: "",
      tags: [],
      language: null,
    });
  }

  const isOpen =
    searchParams
      .keys()
      .toArray()
      .filter((k) => k !== SearchFilterParams.ITEMS && k !== SearchFilterParams.PAGE).length > 0;

  return (
    <CollapsibleContainer isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              value={filters.query}
              type="search"
              placeholder="Search..."
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button type="submit" className="min-w-24">
            <Search /> Search
          </Button>
        </div>
        <div className="rounded-xl border p-3 space-y-3 bg-card/40 border-border/70">
          <div className="space-y-2">
            <p className="text-sm font-medium">Tags</p>
            <RenderTagsInput filters={filters} setFilters={setFilters} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Language</p>
            <Combobox
              items={languageOptions}
              value={filters.language}
              onValueChange={(v) => setFilters((prev) => ({ ...prev, language: v }))}
              autoHighlight
            >
              <ComboboxInput showClear placeholder="Type to search language" className="min-w-26" />
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
          </div>

          <div className="flex justify-end gap-1">
            <Button type="reset" variant="ghost" onClick={handleReset}>
              <EraserIcon /> Reset
            </Button>
            <ItemsButtonDropdown />
          </div>
        </div>
      </form>
    </CollapsibleContainer>
  );
}

interface RenderTagsComboboxProps {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
}

function RenderTagsInput({ filters, setFilters }: RenderTagsComboboxProps) {
  const anchor = useComboboxAnchor();
  const { tags, loading, setInput } = useTagSearch();

  return (
    <Combobox
      multiple
      autoHighlight
      items={tags}
      value={filters.tags}
      onValueChange={(v) => setFilters((prev) => ({ ...prev, tags: v }))}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search and select multiple tags"
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <Content anchor={anchor}>
        <Empty>{loading ? "Searching..." : "No tags found."}</Empty>
        <List>
          {(item: string[], i) => (
            <Item key={i} value={item}>
              {item}
            </Item>
          )}
        </List>
      </Content>
    </Combobox>
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
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="*:size-1.5">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CollapsibleTrigger>
      </AppTooltip>
      <CollapsibleContent className="w-full mt-1">{props.children}</CollapsibleContent>
    </Collapsible>
  );
}
