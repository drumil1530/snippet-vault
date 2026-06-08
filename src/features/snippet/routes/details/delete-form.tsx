"use client";

import { AlertDialogAction as Action } from "@/ui/alert-dialog";
import { deleteSnippet } from "@/features/snippet/actions";
import { Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteForm({ id }: { id: string }) {
  const formAction = deleteSnippet.bind(null, id);

  return (
    <form action={formAction}>
      <DeleteSubmitButton />
    </form>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Action type="submit" variant="destructive" className="w-full" disabled={pending}>
      <Trash2Icon /> {pending ? "Deleting..." : "Confirm"}
    </Action>
  );
}
