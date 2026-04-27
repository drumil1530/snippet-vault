"use client";

import { createNewSnippet } from "@/lib/actions/snippetActions";
import SnippetBaseForm from "./base-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { State } from "@/lib/types/utilities";
import { useActionState } from "react";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";

export default function SnippetCreateForm() {
  const initialState: State<CreateForm> = {};
  const [state, formAction, isPending] = useActionState(
    createNewSnippet,
    initialState,
  );
  return (
    <form action={formAction}>
      <SnippetBaseForm state={state} />
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

export interface CreateForm {
  title?: string;
  code?: string;
  language?: string;
}
