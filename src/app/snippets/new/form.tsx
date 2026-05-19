"use client";

import { createSnippet } from "@/app/snippets/_actions/create-snippet";
import { SnippetBaseForm, SnippetForm } from "../_components/base-form";
import { Button } from "@/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import { Language } from "@/generated/prisma/client";

type SnippetCreateFormProps = {
  languages: Language[];
};

export default function SnippetCreateForm({ languages }: SnippetCreateFormProps) {
  const initialState: State<SnippetForm> = {};
  const [state, formAction, isPending] = useActionState(createSnippet, initialState);

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />
      <div className="mt-2">
        <Button type="submit" className="ms-1" disabled={isPending}>
          {isPending ? "Creating" : "Create"}
        </Button>
      </div>
    </form>
  );
}
