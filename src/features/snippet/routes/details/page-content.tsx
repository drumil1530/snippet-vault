import { getSnippet, SnippetWithLanguageAndTags } from "@/features/snippet/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/ui/button";
import DeleteSnippetButton from "./delete-dialog";
import { Badge } from "@/ui/badge";
import { EllipsisVertical, PenIcon } from "lucide-react";
import { CodeBlock, CodeCopyButton } from "@/features/snippet/components";
import { SearchFilterParams } from "@/features/snippet/constants";
import { getSession } from "@/features/auth/actions/session";
import AppTooltip from "@/components/custom-ui/tooltip";

export default async function SnippetDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();

  const snippet = await getSnippet((await params).id);
  if (!snippet) notFound();

  const tags = snippet.tagsOnSnippets.map((t) => t.tag);

  return (
    <Card className="overflow-hidden py-0 gap-0">
      <CardHeader className="space-y-3 py-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-2xl" title={snippet.title}>
            {snippet.title}
          </CardTitle>

          {session?.user.id === snippet.userId && <SnippetActions snippet={snippet} />}
        </div>

        <Link
          href={appRoutes.users.profile(snippet.user.username)}
          className="w-fit text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          @{snippet.user.username}
        </Link>

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

      {snippet.description && (
        <>
          <Separator />

          <div className="px-5 py-4">
            <h3 className="font-medium mb-2 text-lg">Description</h3>

            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {snippet.description}
            </p>
          </div>
        </>
      )}

      <Separator />

      <CardContent className="p-4">
        <div className=" rounded-xl border overflow-clip">
          <div className="flex justify-between items-center px-3 pt-3">
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
            <CodeCopyButton code={snippet.code} className="static" />
          </div>
          <CodeBlock
            lang={snippet.language.shikiLang}
            className="[&>pre]:whitespace-pre [&>pre]:overflow-x-auto scrollbar-thin"
          >
            {snippet.code}
          </CodeBlock>
        </div>
      </CardContent>
    </Card>
  );
}

function SnippetActions({ snippet }: { snippet: SnippetWithLanguageAndTags }) {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <AppTooltip content="Edit/Delete">
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
        </AppTooltip>

        <DropdownMenuContent align="end" className="w-fit min-w-24 flex flex-col gap-1">
          <Button asChild variant="secondary">
            <Link href={appRoutes.snippets.edit(snippet.id)}>
              <PenIcon /> Edit
            </Link>
          </Button>

          <DeleteSnippetButton id={snippet.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
