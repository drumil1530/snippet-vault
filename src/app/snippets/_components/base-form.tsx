"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Language } from "@/generated/prisma/client";
import { State } from "@/lib/types/utilities";
import { useState, useEffect } from "react";

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
  const codeLength = state.data?.code?.split("\n").length || 15;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);

  const selectedLanguage = languages.find(
    (l) => l.id === state.data?.languageId,
  );

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
        <Select name="languageId" defaultValue={state.data?.languageId}>
          {isReady ? (
            <>
              <SelectTrigger
                className="w-full"
                aria-invalid={
                  state.errors?.properties?.languageId ? true : false
                }
              >
                <SelectValue placeholder="Select code language">
                  {selectedLanguage?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Code languages</SelectLabel>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </>
          ) : (
            <SelectTrigger className="text-muted-foreground">
              Loading languages...
            </SelectTrigger>
          )}
        </Select>
        <FieldError>
          {state.errors?.properties?.languageId?.errors[0]}
        </FieldError>
      </Field>
      <Field data-invalid={state.errors?.properties?.code ? true : false}>
        <FieldLabel htmlFor="code">Snippet Code</FieldLabel>
        <Textarea
          id="code"
          name="code"
          placeholder="Code of snippet"
          rows={codeLength > 15 ? codeLength : 15}
          className="font-mono"
          defaultValue={state.data?.code}
          aria-invalid={state.errors?.properties?.code ? true : false}
        />
        <FieldError>{state.errors?.properties?.code?.errors[0]}</FieldError>
      </Field>
    </FieldGroup>
  );
}
