import { Suspense } from "react";
import { SnippetWithData } from "../actions";
import { appRoutes } from "@/lib/routes";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { SearchFilterParams } from "../constants";
import { CodeBlockSkeleton, CodeBlock } from "./code-block";
import { CodeCopyButton } from "./code-copy-button";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Separator } from "@/ui/separator";
import { Button } from "@/ui/button";

interface SnippetCardProps {
  snippet: SnippetWithData;
  route: string;
}

export default function SnippetCard({ snippet, route }: SnippetCardProps) {
  return (
    <Card
      key={snippet.id}
      className="gap-0 p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/25"
    >
      <CardHeader className="flex flex-col gap-2 py-3">
        <CardTitle className="truncate text-lg font-semibold leading-tight" title={snippet.title}>
          <Link
            href={appRoutes.snippets.item(snippet.id).details}
            className="underline underline-offset-3 decoration-current/0 hover:decoration-current transition-all"
          >
            {snippet.title}
          </Link>
        </CardTitle>
        <div className="flex items-center max-w-full overflow-scroll no-scrollbar">
          <Badge variant="secondary" className="font-mono">
            <Link
              href={{
                pathname: route,
                query: { [SearchFilterParams.LANGUAGE]: snippet.language.slug },
              }}
            >
              {snippet.language.name}
            </Link>
          </Badge>
          {snippet.tagsOnSnippets.length > 0 && (
            <div className="flex gap-1 mx-1">
              <Separator orientation="vertical" />
              {snippet.tagsOnSnippets.slice(0, 3).map((t) => (
                <Badge variant="outline" key={t.tag.id} className="text-xs">
                  <Link
                    href={{
                      pathname: route,
                      query: { [SearchFilterParams.TAGS]: t.tag.name },
                    }}
                  >
                    {t.tag.name}
                  </Link>
                </Badge>
              ))}
              {snippet.tagsOnSnippets.length > 3 && (
                <Badge variant="outline">+{snippet.tagsOnSnippets.length - 3}</Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="h-44 p-0 relative">
        <Suspense fallback={<CodeBlockSkeleton />}>
          <CodeBlock
            lang={snippet.language.shikiLang}
            className="[&_code]:line-clamp-8 [&>pre]:pe-10"
          >
            {snippet.code.slice(0, 180)}
          </CodeBlock>
        </Suspense>
        <CodeCopyButton code={snippet.code} className="right-4" />
        <div className="w-full absolute bottom-0 left-0 bg-linear-to-b from-card/0 to-card h-18" />
      </CardContent>
      <div
        className={`flex items-center ${snippet.user ? "justify-between" : "justify-end"} py-3 px-4`}
      >
        {snippet.user && (
          <Link
            href={appRoutes.users(snippet.user.username).profile}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            @{snippet.user.username}
          </Link>
        )}

        <Button asChild variant="outline">
          <Link href={appRoutes.snippets.item(snippet.id).details}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}
