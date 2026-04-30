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
import { useState, type SubmitEvent } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { Search } from "lucide-react";
import { ComboboxItem } from "@/lib/types/shadcn/combobox";

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

  const [searchTitle, setSearchTitle] = useState(titleParam);
  const [searchLanguage, setSearchLanguage] = useState<ComboboxItem | null>(defaultItemValue);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (searchTitle) params.set("title", searchTitle);
    else params.delete("title");

    if (searchLanguage) params.set("language", searchLanguage.value);
    else params.delete("language");

    router.push(appRoutes.snippets.list + "?" + params.toString());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            defaultValue={titleParam}
            type="search"
            placeholder="Search title..."
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Combobox
          items={items}
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
      <Button type="submit" className="cursor-pointer">
        <Search />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
