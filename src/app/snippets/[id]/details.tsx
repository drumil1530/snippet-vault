import { getSnippet } from "../_actions/get-snippets";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Separator } from "@/ui/separator";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { buttonVariants } from "@/ui/button";
import CodeCopyButton from "./code-copy-button";
import DeleteSnippetButton from "./delete-dialog";
import CodeBlock from "../_components/code-block";

export default async function SnippetDetail({ id }: { id: string }) {
  const snippet = await getSnippet(id);

  if (!snippet) notFound();

  return (
    <Card className="gap-0">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription className="font-mono">
          {snippet.language.name}
        </CardDescription>
      </CardHeader>
      <Separator className="mt-3" />
      <CardContent className="h-42 min-h-42 relative p-0">
        <CodeBlock lang={snippet.language.shikiLang}>{snippet.code}</CodeBlock>
        <CodeCopyButton code={snippet.code} />
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-1">
          <Link
            href={appRoutes.snippets.list}
            className={buttonVariants({ variant: "outline" })}
          >
            Go back
          </Link>
          <Link
            href={appRoutes.snippets.edit(snippet.id)}
            className={buttonVariants({ variant: "secondary" })}
          >
            Edit
          </Link>
        </div>
        <DeleteSnippetButton id={snippet.id} />
      </CardFooter>
    </Card>
  );
}
