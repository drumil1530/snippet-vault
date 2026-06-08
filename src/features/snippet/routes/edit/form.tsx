"use client";

import { SnippetWithLanguageAndTags, updateSnippet } from "@/features/snippet/actions";
import { SnippetBaseForm, SnippetForm } from "@/features/snippet/components";
import { Button } from "@/ui/button";
import { State } from "@/lib/types/action-state";
import { useActionState } from "react";
import { Language } from "@/generated/prisma/client";
import { Spinner } from "@/ui/spinner";
import { Pen } from "lucide-react";

type SnippetEditFormProps = {
  id: string;
  snippetData: SnippetWithLanguageAndTags;
  languages: Language[];
};

export default function SnippetEditForm({ id, snippetData, languages }: SnippetEditFormProps) {
  const initialState: State<SnippetForm> = {
    data: {
      title: snippetData?.title,
      languageId: snippetData?.languageId,
      code: snippetData?.code,
      description: snippetData.description ?? undefined,
      tags: snippetData.tagsOnSnippets.map((t) => t.tag.name).join(","),
    },
  };

  const [state, formAction, isPending] = useActionState(updateSnippet.bind(null, id), initialState);

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />

      <Button type="submit" className="mt-3" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            {"Updating"}
          </>
        ) : (
          <>
            <Pen />
            {"Update"}
          </>
        )}
      </Button>
    </form>
  );
}
