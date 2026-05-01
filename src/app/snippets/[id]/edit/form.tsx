"use client";

import { updateSnippet } from "@/app/snippets/_actions/update-snippet";
import SnippetBaseForm, { SnippetForm } from "@/app/snippets/_components/base-form";
import { Button } from "@/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import { Language, Snippet } from "@/generated/prisma/client";

type SnippetUpdateFormProps = {
  id: string;
  snippetData: Snippet | null;
  languages: Language[];
};

export default function SnippetUpdateForm({ id, snippetData, languages }: SnippetUpdateFormProps) {
  const initialState: State<SnippetForm> = {
    data: {
      title: snippetData?.title,
      languageId: snippetData?.languageId,
      code: snippetData?.code,
    },
  };

  const [state, formAction, isPending] = useActionState(updateSnippet.bind(null, id), initialState);

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />
      <div className="mt-2 flex gap-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating" : "Update"}
        </Button>
      </div>
    </form>
  );
}
