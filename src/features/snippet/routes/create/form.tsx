"use client";

import { Button } from "@/ui/button";
import { State } from "@/lib/types/action-state";
import { useActionState } from "react";
import { Language } from "@/generated/prisma/client";
import { SnippetBaseForm, SnippetForm } from "@/features/snippet/components";
import { createSnippet } from "@/features/snippet/actions";
import { Spinner } from "@/ui/spinner";
import { Plus } from "lucide-react";

type SnippetCreateFormProps = {
  languages: Language[];
};

export default function SnippetCreateForm({ languages }: SnippetCreateFormProps) {
  const initialState: State<SnippetForm> = {};
  const [state, formAction, isPending] = useActionState(createSnippet, initialState);

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />

      <Button type="submit" className="mt-3" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            {"Creating"}
          </>
        ) : (
          <>
            <Plus />
            {"Create"}
          </>
        )}
      </Button>
    </form>
  );
}
