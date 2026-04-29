"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
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
          <SelectTrigger className="bg-popover gap-0.5 min-w-30">
            <SelectValue placeholder="Languages" />
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Code Languages</SelectLabel>
              <SelectItem value="none">None</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.name}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ButtonGroup>
      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  );
}
