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
import DeleteButton from "./delete-button";

export default function DeleteSnippetButton({ id }: { id: string }) {
  return (
    <AlertDialog>
      <Trigger asChild>
        <Button variant="destructive">Delete snippet</Button>
      </Trigger>
      <Content>
        <Header>
          <Title className="text-destructive">Are you absolutely sure?</Title>
          <Description>
            This action cannot be undone. This will permanently delete your
            snippet from our servers.
          </Description>
        </Header>
        <Footer>
          <Cancel>Cancel</Cancel>
          <DeleteButton id={id} />
        </Footer>
      </Content>
    </AlertDialog>
  );
}
