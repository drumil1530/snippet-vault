import { getSnippet } from "@/app/snippets/_actions/get-snippets";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { buttonVariants } from "@/ui/button";
import CodeCopyButton from "@/app/snippets/_components/code-copy-button";
import DeleteSnippetButton from "./delete-dialog";
import CodeBlock from "@/app/snippets/_components/code-block";
import FavoriteButton from "./favorite-button";

export default async function SnippetDetail({ id }: { id: string }) {
  const snippet = await getSnippet(id);

  if (!snippet) notFound();

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center py-2">
        <div>
          <CardTitle>{snippet.title}</CardTitle>
          <CardDescription className="font-mono">{snippet.language.name}</CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <FavoriteButton id={snippet.id} isFavorite={snippet.isFavorite} />
          <Link
            href={appRoutes.snippets.edit(snippet.id)}
            className={buttonVariants({ variant: "secondary" })}
          >
            Edit
          </Link>
          <DeleteSnippetButton id={snippet.id} />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="min-h-42 relative p-0">
        <CodeBlock
          lang={snippet.language.shikiLang}
          className="[&>pre]:whitespace-pre [&>pre]:overflow-x-scroll"
        >
          {snippet.code}
        </CodeBlock>
        <CodeCopyButton code={snippet.code} />
      </CardContent>
    </Card>
  );
}
