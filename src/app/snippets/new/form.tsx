"use client";

import { createNewSnippet } from "@/app/snippets/_actions/create-snippet";
import SnippetBaseForm, { SnippetForm } from "../_components/base-form";
import { Button, buttonVariants } from "@/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { Language } from "@/generated/prisma/client";

export default function SnippetCreateForm({
  languages,
}: {
  languages: Language[];
}) {
  const initialState: State<SnippetForm> = {};
  const [state, formAction, isPending] = useActionState(
    createNewSnippet,
    initialState,
  );

  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} languages={languages} />
      <div className="mt-2">
        <Link
          href={appRoutes.snippets.list}
          className={buttonVariants({ variant: "outline" })}
        >
          Go back
        </Link>
        <Button type="submit" className="ms-1" disabled={isPending}>
          {isPending ? "Creating" : "Create"}
        </Button>
      </div>
    </form>
  );
}
