"use client";

import { AlertDialogAction as Action } from "@/ui/alert-dialog";
import { deleteSnippet } from "@/features/snippet/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/utils/routes";

export default function DeleteButton({ id }: { id: string }) {
  const formAction = deleteSnippet.bind(null, id);
  const router = useRouter();

  return (
    <form action={formAction}>
      <Action
        type="submit"
        variant="destructive"
        className="w-full"
        onClick={() => {
          toast.success("Snippet deleted successfully!", {
            position: "top-center",
          });
          router.push(appRoutes.home);
        }}
      >
        Confirm
      </Action>
    </form>
  );
}
