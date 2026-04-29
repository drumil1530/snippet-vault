"use client";

import { updateNewSnippet } from "@/app/snippets/_actions/update-snippet";
import SnippetBaseForm, {
  SnippetForm,
} from "@/app/snippets/_components/base-form";
import { Button, buttonVariants } from "@/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { Language, Snippet } from "@/generated/prisma/client";

export default function SnippetUpdateForm({
  id,
  snippetData,
  languages,
}: {
  id: string;
  snippetData: Snippet | null;
  languages: Language[];
}) {
  const initialState: State<SnippetForm> = {
    data: {
      title: snippetData?.title,
      languageId: snippetData?.languageId,
      code: snippetData?.code,
    },
  };

  const [state, formAction, isPending] = useActionState(
    updateNewSnippet.bind(null, id),
    initialState,
  );

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />
      <div className="mt-2 flex gap-1">
        <Link
          href={appRoutes.snippets.details(id)}
          className={buttonVariants({ variant: "outline" })}
        >
          Go back
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating" : "Update"}
        </Button>
      </div>
    </form>
  );
}
