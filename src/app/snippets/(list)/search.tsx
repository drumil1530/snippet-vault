"use client";

import { Button } from "@/ui/button";
import { ButtonGroup } from "@/ui/button-group";
import { Input } from "@/ui/input";
import {
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectContent as Content,
  SelectItem as Item,
  Select,
  SelectLabel as Label,
  SelectGroup as Group,
} from "@/ui/select";
import { Language } from "@/generated/prisma/client";
import { appRoutes } from "@/utils/routes";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";

export default function SnippetSearch({
  languages,
}: {
  languages: Language[];
}) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const titleParam = searchParams.get("title") || "";
  const languageParam = searchParams.get("language");
  const selectedLanguage =
    languageParam && languages.map((l) => l.name).includes(languageParam)
      ? languageParam
      : "";

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (searchTitle) params.set("title", searchTitle);
    else params.delete("title");

    if (searchLanguage) params.set("language", searchLanguage);
    else params.delete("language");

    router.push(appRoutes.snippets.list + "?" + params.toString());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <ButtonGroup>
        <Input
          defaultValue={titleParam}
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Select
          defaultValue={selectedLanguage}
          onValueChange={(value) =>
            setSearchLanguage(value === "none" ? "" : value)
          }
        >
          <Trigger className="bg-popover gap-0.5 min-w-26">
            <Value placeholder="Languages" />
          </Trigger>

          <Content position="popper">
            <Group>
              <Label>Code Languages</Label>
              <Item value="none">None</Item>
              {languages.map((language) => (
                <Item key={language.id} value={language.name}>
                  {language.name}
                </Item>
              ))}
            </Group>
          </Content>
        </Select>
      </ButtonGroup>
      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  );
}
