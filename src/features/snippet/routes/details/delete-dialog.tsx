import {
  AlertDialog,
  AlertDialogCancel as Cancel,
  AlertDialogContent as Content,
  AlertDialogDescription as Description,
  AlertDialogFooter as Footer,
  AlertDialogHeader as Header,
  AlertDialogTitle as Title,
  AlertDialogTrigger as Trigger,
} from "@/ui/alert-dialog";
import { Button } from "@/ui/button";
import DeleteForm from "./delete-form";
import { Trash2Icon } from "lucide-react";

export default function DeleteSnippetButton({ id }: { id: string }) {
  return (
    <AlertDialog>
      <Trigger asChild>
        <Button variant="destructive">
          <Trash2Icon /> Delete
        </Button>
      </Trigger>
      <Content>
        <Header>
          <Title className="text-destructive">Are you absolutely sure?</Title>
          <Description>
            This action cannot be undone.
            <br />
            This will permanently delete your snippet from our servers.
          </Description>
        </Header>
        <Footer>
          <Cancel>Cancel</Cancel>
          <DeleteForm id={id} />
        </Footer>
      </Content>
    </AlertDialog>
  );
}
