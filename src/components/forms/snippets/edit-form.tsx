"use client";

import { getSnippet, updateNewSnippet } from "@/lib/actions/snippetActions";
import SnippetBaseForm from "./base-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";

export default function SnippetUpdateForm({
  id,
  snippetData,
}: {
  id: string;
  snippetData: Awaited<NonNullable<ReturnType<typeof getSnippet>>>;
}) {
  const initialState: State<UpdateForm> = {
    data: {
      title: snippetData?.title,
      language: snippetData?.language,
      code: snippetData?.code,
    },
  };

  const [state, formAction, isPending] = useActionState(
    updateNewSnippet.bind(null, id),
    initialState,
  );

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} />
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

export interface UpdateForm {
  title?: string;
  code?: string;
  language?: string;
}
