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
import { appRoutes } from "@/utils/routes";
import { Separator } from "@/ui/separator";
import { UrlObject } from "node:url";
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ParsedUrlQueryInput } from "node:querystring";
import { Language } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/ui/badge";
import z from "zod";
import { getAllSnippets, SnippetWithLanguage } from "@/app/snippets/_actions";
import {
  CodeBlock,
  CodeBlockSkeleton,
  CodeCopyButton,
  searchFiltersSchema,
} from "@/app/snippets/_components";

type SnippetListProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  languages: Language[];
};

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
        <p className="text-xl">
          {filters.query && !filters.language && `No snippets found containing: ${filters.query}`}

          {filters.language &&
            !filters.query &&
            `No snippets found for the language: ${languagesMap.get(filters.language)}`}

          {filters.query &&
            filters.language &&
            `No snippets found for the language (${languagesMap.get(filters.language)}) having "${filters.query}"`}
        </p>
      )}
    </>
  );
}

function RenderSnippetList({ snippets }: { snippets: SnippetWithLanguage[] }) {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="gap-0 hover:ring-foreground/25 relative p-0">
          <CardHeader className="py-4 gap-3">
            <div className="flex justify-between items-center">
              <CardTitle className="truncate max-w-3/4" title={snippet.title}>
                {snippet.title}
              </CardTitle>
              <Badge variant="secondary" className="font-mono">
                {snippet.language.name}
              </Badge>
            </div>
            {/* {snippet.tagsOnSnippets.length > 0 && (
              <div className="flex gap-1">
                {snippet.tagsOnSnippets.map((t) => (
                  <Badge variant="outline" key={t.tag.id}>
                    {t.tag.name}
                  </Badge>
                ))}
              </div>
            )} */}
          </CardHeader>
          <Separator />
          <CardContent className="h-48 p-0 relative">
            <Suspense fallback={<CodeBlockSkeleton />}>
              <CodeBlock lang={snippet.language.shikiLang} className="[&_code]:line-clamp-8">
                {snippet.code.slice(0, 180)}
              </CodeBlock>
            </Suspense>
            <CodeCopyButton code={snippet.code} />
            <div className="w-full absolute bottom-0 left-0 bg-linear-to-b from-card/0 to-card h-18" />
          </CardContent>
          <Link
            href={appRoutes.snippets.details(snippet.id)}
            className="absolute inset-0 h-full hover:bg-muted/20"
            title={snippet.title}
          ></Link>
        </Card>
      ))}
    </div>
  );
}

function SnippetPagination(filters: z.infer<typeof searchFiltersSchema> & { length: number }) {
  const { page, sortBy, items, query, language, length } = filters;

  const queryInputs = {
    ...(sortBy !== "desc" && { sortBy }),
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
