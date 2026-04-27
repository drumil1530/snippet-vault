import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteSnippet } from "@/lib/actions/snippetActions";

export default function DeleteSnippetButton({ id }: { id: string }) {
  const formAction = deleteSnippet.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete snippet</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction type="submit" variant="destructive">
              Confirm
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
