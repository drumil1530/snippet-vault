import { getSnippet } from "@/app/snippets/_actions/get-snippets";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { buttonVariants } from "@/ui/button";
import CodeCopyButton from "@/app/snippets/_components/code-copy-button";
import DeleteSnippetButton from "./delete-dialog";
import CodeBlock from "@/app/snippets/_components/code-block";
import FavoriteButton from "./favorite-button";
import { Badge } from "@/ui/badge";
import { EllipsisVertical } from "lucide-react";

export default async function SnippetDetail({ id }: { id: string }) {
  const snippet = await getSnippet(id);
  if (!snippet) notFound();

  const tags = snippet.tagsOnSnippets.map((t) => t.tag);

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex justify-between items-center py-2">
        <div>
          <CardTitle>{snippet.title}</CardTitle>
          <CardDescription className="font-mono mb-1">{snippet.language.name}</CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <FavoriteButton id={snippet.id} isFavorite={snippet.isFavorite} />
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <EllipsisVertical className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-center items-stretch gap-1">
              <Link
                href={appRoutes.snippets.edit(snippet.id)}
                className={buttonVariants({ variant: "secondary" })}
              >
                Edit
              </Link>
              <DeleteSnippetButton id={snippet.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {tags.length > 0 && (
        <>
          <Separator />
          <div className="flex gap-1 overflow-x-scroll px-4 py-2">
            {tags.map((tag) => (
              <Badge variant="outline" key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </>
      )}
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
