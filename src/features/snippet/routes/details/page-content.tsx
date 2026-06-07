import { getSnippet, SnippetWithLanguageAndTags } from "@/features/snippet/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import Link from "next/link";
import { appRoutes } from "@/utils/routes";
import { buttonVariants } from "@/ui/button";
import DeleteSnippetButton from "./delete-dialog";
import { Badge } from "@/ui/badge";
import { EllipsisVertical, PenIcon } from "lucide-react";
import { CodeBlock, CodeCopyButton } from "@/features/snippet/components";
import { SearchFilterParams } from "@/features/snippet/constants";
import { getSession } from "@/features/auth/actions/session";

export default async function SnippetDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();

  const snippet = await getSnippet((await params).id);
  if (!snippet) notFound();

  const tags = snippet.tagsOnSnippets.map((t) => t.tag);

  return (
    <Card className="overflow-hidden py-0 gap-0">
      <CardHeader className="space-y-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl" title={snippet.title}>
              {snippet.title}
            </CardTitle>

            <Badge variant="secondary" className="w-fit font-mono">
              <Link
                href={{
                  pathname: appRoutes.home,
                  query: { [SearchFilterParams.LANGUAGE]: snippet.language.slug },
                }}
              >
                {snippet.language.name}
              </Link>
            </Badge>
          </div>

          {session && <SnippetActions snippet={snippet} />}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge variant="outline" key={tag.id}>
                <Link
                  href={{
                    pathname: appRoutes.home,
                    query: { [SearchFilterParams.TAGS]: tag.name },
                  }}
                >
                  {tag.name}
                </Link>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="relative p-4">
        <CodeBlock
          lang={snippet.language.shikiLang}
          className="rounded-xl border overflow-hidden [&>pre]:overflow-x-auto"
        >
          {snippet.code}
        </CodeBlock>

        <CodeCopyButton code={snippet.code} className="top-5 right-5" />
      </CardContent>
    </Card>
  );
}

function SnippetActions({ snippet }: { snippet: SnippetWithLanguageAndTags }) {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "secondary",
            size: "icon",
          })}
        >
          <EllipsisVertical className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-fit min-w-24 flex flex-col gap-1">
          <Link
            href={appRoutes.snippets.edit(snippet.id)}
            className={buttonVariants({ variant: "secondary" })}
          >
            <PenIcon />
            Edit
          </Link>

          <DeleteSnippetButton id={snippet.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
