"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Language } from "@/generated/prisma/client";
import { State } from "@/lib/types/utilities";
import { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxContent as Content,
  ComboboxEmpty as Empty,
  ComboboxInput,
  ComboboxItem as Item,
  ComboboxList as List,
} from "@/ui/combobox";
import { ComboboxItem } from "@/lib/types/shadcn/combobox";

export interface SnippetForm {
  title?: string;
  code?: string;
  languageId?: string;
}

export default function SnippetBaseForm({
  state,
  languages,
}: {
  state: State<SnippetForm>;
  languages: Language[];
}) {
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
        <RenderSelectList
          isReady={isReady}
          languages={languages}
          state={state}
          selectedLanguage={selectedLanguage}
        />
        <FieldError>{state.errors?.properties?.languageId?.errors[0]}</FieldError>
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

type SelectListProps = {
  languages: Language[];
  state: State<SnippetForm>;
  isReady: boolean;
  selectedLanguage?: Language;
};

function RenderSelectList(props: SelectListProps) {
  const { isReady, languages, selectedLanguage, state } = props;
  const defaultLang = languages.find((l) => l.id === state.data?.languageId) || selectedLanguage;

  const defaultLangValue =
    defaultLang &&
    ({
      id: defaultLang.id,
      value: defaultLang.id,
      label: defaultLang.name,
    } satisfies ComboboxItem);

  const items = languages.map((l) => ({
    id: l.id,
    value: l.id,
    label: l.name,
  })) satisfies ComboboxItem[];

  return (
    <Combobox items={items} defaultValue={defaultLangValue} name="languageId">
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
              {(language: ComboboxItem) => (
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
