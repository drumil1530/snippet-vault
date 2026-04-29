"use client";

import { AlertDialogAction as Action } from "@/ui/alert-dialog";
import { deleteSnippet } from "../_actions/delete-snippet";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
  const formAction = deleteSnippet.bind(null, id);

  return (
    <form action={formAction}>
      <Action
        type="submit"
        variant="destructive"
        onClick={() =>
          toast.success("Snippet deleted successfully!", {
            position: "top-center",
          })
        }
      >
        Confirm
      </Action>
    </form>
  );
}
