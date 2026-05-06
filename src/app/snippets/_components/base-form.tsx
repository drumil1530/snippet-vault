"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Language } from "@/generated/prisma/client";
import { State } from "@/lib/types/utilities";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
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
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/ui/combobox";
import { ComboboxItem as ComboboxItemType } from "@/lib/types/shadcn/combobox";
import { BaseUIEvent } from "@base-ui/react";
import { Button } from "@/ui/button";
import { XIcon } from "lucide-react";
import { appRoutes } from "@/utils/routes";
import { useDebounce } from "use-debounce";

export interface SnippetForm {
  title?: string;
  code?: string;
  languageId?: string;
  tags?: string;
}

type SnippetBaseFormProps = {
  state: State<SnippetForm>;
  languages: Language[];
};

export default function SnippetBaseForm({ state, languages }: SnippetBaseFormProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);

  const selectedLanguage = languages.find((l) => l.id === state.data?.languageId);

  return (
    <FieldGroup>
      <Field data-invalid={state.errors?.properties?.title ? true : false}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          name="title"
          placeholder="Title of snippet"
          defaultValue={state.data?.title}
          aria-invalid={state.errors?.properties?.title ? true : false}
        />
        <FieldError>{state.errors?.properties?.title?.errors[0]}</FieldError>
      </Field>
      <Field data-invalid={state.errors?.properties?.languageId ? true : false}>
        <FieldLabel htmlFor="languageId">Language</FieldLabel>
        <RenderLanguageSelectList
          isReady={isReady}
          languages={languages}
          state={state}
          selectedLanguage={selectedLanguage}
        />
        <FieldError>{state.errors?.properties?.languageId?.errors[0]}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="tags">Tags</FieldLabel>
        <RenderTagsCombobox state={state} />
        <FieldError>{state.errors?.properties?.tags?.errors[0]}</FieldError>
      </Field>
      <Field data-invalid={state.errors?.properties?.code ? true : false}>
        <FieldLabel htmlFor="code">Snippet Code</FieldLabel>
        <Textarea
          id="code"
          name="code"
          placeholder="Code of snippet"
          className="font-mono min-h-60"
          defaultValue={state.data?.code}
          aria-invalid={state.errors?.properties?.code ? true : false}
        />
        <FieldError>{state.errors?.properties?.code?.errors[0]}</FieldError>
      </Field>
    </FieldGroup>
  );
}

type LanguageSelectListProps = {
  languages: Language[];
  state: State<SnippetForm>;
  isReady: boolean;
  selectedLanguage?: Language;
};

function RenderLanguageSelectList(props: LanguageSelectListProps) {
  const { isReady, languages, selectedLanguage, state } = props;
  const defaultLang = languages.find((l) => l.id === state.data?.languageId) || selectedLanguage;

  const defaultLangValue =
    defaultLang &&
    ({
      id: defaultLang.id,
      value: defaultLang.id,
      label: defaultLang.name,
    } satisfies ComboboxItemType);

  const items = languages.map((l) => ({
    id: l.id,
    value: l.id,
    label: l.name,
  })) satisfies ComboboxItemType[];

  return (
    <Combobox autoHighlight items={items} defaultValue={defaultLangValue} name="languageId">
      {isReady ? (
        <>
          <ComboboxInput
            showClear
            placeholder="Select language"
            aria-invalid={state.errors?.properties?.languageId ? true : false}
          />
          <Content>
            <Empty>No language found.</Empty>

            <List>
              {(language: ComboboxItemType) => (
                <Item key={language.id} value={language}>
                  {language.label}
                </Item>
              )}
            </List>
          </Content>
        </>
      ) : (
        <ComboboxInput disabled placeholder="Loading languages..." />
      )}
    </Combobox>
  );
}

type RenderTagsComboboxProps = {
  state: State<SnippetForm>;
};

function RenderTagsCombobox({ state }: RenderTagsComboboxProps) {
  const anchor = useComboboxAnchor();

  async function fetchTags(value: string) {
    try {
      const res = await fetch(appRoutes.tags.search(value));
      const data = await res.json();

      if (Array.isArray(data)) setTags(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  const initialTagString = state.data?.tags ? state.data.tags : "";
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    (initialTagString.length > 0 && initialTagString.split(",")) || [],
  );
  const [input, setInput] = useState("");

  const [debouncedValue] = useDebounce(input, 300);

  useEffect(() => {
    fetchTags(debouncedValue);
  }, [debouncedValue]);

  function addTag(tag: string) {
    if (!selected.includes(tag) && tag.trim().length > 0)
      setSelected((prev) => [...new Set([...prev, tag])]);
  }

  function removeTag(value: string) {
    setSelected((prev) => [...prev.filter((v) => v !== value)]);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setLoading(true);
  }

  function handleEnter(e: BaseUIEvent<KeyboardEvent<HTMLInputElement>>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim().length === 0) return;

      addTag(input);
      setInput("");
    }
  }

  return (
    <Combobox multiple items={tags} value={selected} onValueChange={(v) => setSelected(v)}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value} showRemove={false}>
                  {value}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-50 hover:opacity-100 p-0 size-2"
                    onClick={() => removeTag(value)}
                    onKeyDown={(e) => e.key === "Enter" && removeTag(value)}
                  >
                    <XIcon className="pointer-events-none" />
                  </Button>
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                value={input}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder="Write and click enter to add tags..."
                aria-invalid={state.errors?.properties?.tags ? true : false}
              />
              <input type="hidden" value={selected.toString()} name="tags" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{loading ? "Searching..." : "No tags found."}</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
