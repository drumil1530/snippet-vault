import { getSnippet } from "@/lib/actions/snippetActions";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { buttonVariants } from "@/components/ui/button";
import CodeCopyButton from "./code-copy-button";
import DeleteSnippetButton from "./delete-snippet-button";

export default async function SnippetDetail({ id }: { id: string }) {
  const snippet = await getSnippet(id);

  if (!snippet) notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>{snippet.language}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="min-h-32 relative">
        <pre>
          <code>{snippet.code}</code>
        </pre>
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
