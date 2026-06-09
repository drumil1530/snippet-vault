import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import Link from "next/link";
import { Button } from "@/ui/button";
import { appRoutes } from "@/lib/routes";
import { Separator } from "@/ui/separator";
import { UrlObject } from "node:url";
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ParsedUrlQueryInput } from "node:querystring";
import { Language } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/ui/badge";
import z from "zod";
import { getAllSnippets, SnippetWithLanguageAndTags } from "@/features/snippet/actions";
import { CodeBlock, CodeBlockSkeleton, CodeCopyButton } from "@/features/snippet/components";
import { searchFiltersSchema } from "@/features/snippet/schemas";
import { SearchFilterParams } from "@/features/snippet/constants";

interface SnippetListProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  languages: Language[];
}

export default async function SnippetsList({ searchParams, languages }: SnippetListProps) {
  const result = searchFiltersSchema.safeParse(await searchParams);
  if (!result.success) redirect(appRoutes.home);

  const filters = result.data;

  const languagesMap = new Map(languages.map((lang) => [lang.slug, lang.name]));

  if (filters.language && !languagesMap.has(filters.language)) redirect(appRoutes.home);

  const { snippets, length } = await getAllSnippets(filters);

  return (
    <>
      {length > 0 ? (
        <>
          <RenderSnippetList snippets={snippets} />
          <div className="flex justify-center items-center mt-4 mb-2">
            <SnippetPagination
              page={filters.page}
              sortBy={filters.sortBy}
              length={length}
              items={filters.items}
              query={filters.query}
              language={filters.language}
            />
          </div>
        </>
      ) : (
        <p className="text-xl">No Snippet Found!</p>
      )}
    </>
  );
}

function RenderSnippetList({ snippets }: { snippets: SnippetWithLanguageAndTags[] }) {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
      {snippets.map((snippet) => (
        <Card
          key={snippet.id}
          className="gap-0 p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/25"
        >
          <CardHeader className="flex flex-col gap-2 py-3">
            <CardTitle
              className="truncate text-lg font-semibold leading-tight"
              title={snippet.title}
            >
              <Link
                href={appRoutes.snippets.details(snippet.id)}
                className="underline underline-offset-3 decoration-current/0 hover:decoration-current transition-all"
              >
                {snippet.title}
              </Link>
            </CardTitle>
            <div className="flex items-center max-w-full overflow-scroll no-scrollbar">
              <Badge variant="secondary" className="font-mono">
                <Link
                  href={{
                    pathname: appRoutes.home,
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
                          pathname: appRoutes.home,
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
              <CodeBlock lang={snippet.language.shikiLang} className="[&_code]:line-clamp-8">
                {snippet.code.slice(0, 180)}
              </CodeBlock>
            </Suspense>
            <CodeCopyButton code={snippet.code} className="right-4" />
            <div className="w-full absolute bottom-0 left-0 bg-linear-to-b from-card/0 to-card h-18" />
          </CardContent>
          <div className="flex items-center justify-between py-3 px-4">
            <Link
              href={appRoutes.users.profile(snippet.user.username)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              @{snippet.user.username}
            </Link>

            <Button asChild variant="outline">
              <Link href={appRoutes.snippets.details(snippet.id)}>View Details</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SnippetPagination(filters: z.infer<typeof searchFiltersSchema> & { length: number }) {
  const { page, sortBy, items, query, language, length } = filters;

  const queryInputs = {
    ...(sortBy !== "newest" && { sortBy }),
    ...(query && { query }),
    ...(language && { language }),
    ...(items !== 6 && { items }),
  } satisfies ParsedUrlQueryInput;

  const goToPage = (pageNumber: number) =>
    ({
      pathname: appRoutes.home,
      query: { page: pageNumber, ...queryInputs },
    }) satisfies UrlObject;

  const PreviousPageLink =
    page > 1 ? (
      <PaginationPrevious href={page > 1 ? goToPage(page - 1) : "#"} />
    ) : (
      <Button variant="ghost" disabled>
        <ChevronLeftIcon data-icon="inline-start" />
        <span className="hidden sm:block">Previous</span>
      </Button>
    );

  const NextPageLink =
    page < length ? (
      <PaginationNext href={page < length ? goToPage(page + 1) : "#"} />
    ) : (
      <Button variant="ghost" disabled>
        <span className="hidden sm:block">Next</span>
        <ChevronRightIcon data-icon="inline-end" />
      </Button>
    );

  const FirstPageLink =
    page > 1 ? (
      <PaginationLink href={goToPage(1)} aria-label="Go to first page">
        <ChevronFirstIcon className="size-4" />
      </PaginationLink>
    ) : (
      <Button variant="ghost" size="icon" disabled>
        <ChevronFirstIcon className="size-4" />
      </Button>
    );

  const LastPageLink =
    page < length ? (
      <PaginationLink href={goToPage(length)} aria-label="Go to last page">
        <ChevronLastIcon className="size-4" />
      </PaginationLink>
    ) : (
      <Button variant="ghost" size="icon" disabled>
        <ChevronLastIcon className="size-4" />
      </Button>
    );

  return (
    <Pagination className="w-auto m-0">
      <PaginationContent>
        <PaginationItem className="flex items-center">
          {FirstPageLink}
          {PreviousPageLink}
        </PaginationItem>
        <PaginationItem>
          {/* Third last Page link when on last page */}
          {page - 2 > 0 && page === length && (
            <PaginationLink href={goToPage(page - 2)}>{page - 2}</PaginationLink>
          )}

          {/* Previous Page link when page is not first */}
          {page > 1 && <PaginationLink href={goToPage(page - 1)}>{page - 1}</PaginationLink>}

          {/* Current Page link */}
          <PaginationLink href="#" isActive aria-disabled="true">
            {page}
          </PaginationLink>

          {/* Next Page link when page is not last */}
          {page < length && <PaginationLink href={goToPage(page + 1)}>{page + 1}</PaginationLink>}

          {/* Third Page link when on page first */}
          {page + 2 <= length && page === 1 && (
            <PaginationLink href={goToPage(page + 2)}>{page + 2}</PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem className="flex items-center">
          {NextPageLink}
          {LastPageLink}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
