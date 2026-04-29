import {
  getAllSnippets,
  SnippetFilters,
  SnippetWithLanguage,
} from "@/lib/actions/snippetActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Button, buttonVariants } from "../../ui/button";
import { appRoutes } from "@/utils/routes";
import { Separator } from "@/components/ui/separator";
import { UrlObject } from "node:url";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ItemsButtonDropdown from "../list-page-items-button";
import { ParsedUrlQueryInput } from "node:querystring";

export default async function SnippetsList({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = {
    page: Number.parseInt(searchParams["page"]?.toString() || "1"),
    sortBy: String(searchParams["sortby"]) === "asc" ? "asc" : "desc",
    title: searchParams["title"]?.toString(),
    items: Number.parseInt(searchParams["items"]?.toString() || "6"),
    language: searchParams["language"]?.toString(),
  } satisfies SnippetFilters;

  const { snippets, length } = await getAllSnippets(filters);

  return (
    <>
      {length > 0 ? (
        <>
          <SnippetListRender snippets={snippets} />
          <div className="flex justify-between items-center mt-4 mb-2">
            <ItemsButtonDropdown pageItems={filters.items} />
            <SnippetPagination
              page={filters.page}
              sortBy={filters.sortBy}
              length={length}
              items={filters.items}
              title={filters.title}
              language={filters.language}
            />
          </div>
        </>
      ) : (
        <p className="text-xl">
          {filters.title &&
            !filters.language &&
            `No snippets found containing the title: ${filters.title}`}
          {filters.language &&
            !filters.title &&
            `No snippets found for the language: ${filters.language}`}
          {filters.title &&
            filters.language &&
            `No snippets found for the language (${filters.language}) having title "${filters.title}"`}
        </p>
      )}
    </>
  );
}

function SnippetListRender({ snippets }: { snippets: SnippetWithLanguage[] }) {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="gap-3">
          <CardHeader>
            <CardTitle>{snippet.title}</CardTitle>
            <CardDescription>{snippet.language.name}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="h-32 max-h-32 overflow-hidden">
            <pre className="text-sm leading-tight">
              <code>{snippet.code}</code>
            </pre>
          </CardContent>
          <CardFooter className="p-2 justify-end">
            <Link
              href={appRoutes.snippets.details(snippet.id)}
              className={buttonVariants({ variant: "ghost" })}
            >
              See detailed...
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SnippetPagination(filters: SnippetFilters & { length: number }) {
  const { page, sortBy, items, title, language, length } = filters;

  const queryInputs = {
    ...(sortBy !== "desc" && { sortBy }),
    ...(title && { title }),
    ...(language && { language }),
    ...(items !== 6 && { items }),
  } satisfies ParsedUrlQueryInput;

  const goToPage = (pageNumber: number) =>
    ({
      pathname: appRoutes.snippets.list,
      query: { page: pageNumber, ...queryInputs },
    }) satisfies UrlObject;

  const PreviousPageLink =
    page > 1 ? (
      <PaginationPrevious
        href={page > 1 ? goToPage(page - 1) : "#"}
        aria-disabled={page <= 1}
      />
    ) : (
      <Button variant="ghost" disabled>
        <ChevronLeftIcon data-icon="inline-start" />
        <span className="hidden sm:block">Previous</span>
      </Button>
    );

  const NextPageLink =
    page < length ? (
      <PaginationNext
        href={page < length ? goToPage(page + 1) : "#"}
        aria-disabled={page >= length}
      />
    ) : (
      <Button variant="ghost" disabled>
        <span className="hidden sm:block">Next</span>
        <ChevronRightIcon data-icon="inline-end" />
      </Button>
    );

  return (
    <Pagination className="w-auto m-0">
      <PaginationContent>
        <PaginationItem>{PreviousPageLink}</PaginationItem>
        <PaginationItem>
          {/* Third last Page link when on last page */}
          {page - 2 > 0 && page === length && (
            <PaginationLink href={goToPage(page - 2)}>
              {page - 2}
            </PaginationLink>
          )}

          {/* Previous Page link when page is not first */}
          {page > 1 && (
            <PaginationLink href={goToPage(page - 1)}>
              {page - 1}
            </PaginationLink>
          )}

          {/* Current Page link */}
          <PaginationLink href="#" isActive aria-disabled="true">
            {page}
          </PaginationLink>

          {/* Next Page link when page is not last */}
          {page < length && (
            <PaginationLink href={goToPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          )}

          {/* Third Page link when on page first */}
          {page + 2 <= length && page === 1 && (
            <PaginationLink href={goToPage(page + 2)}>
              {page + 2}
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>{NextPageLink}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
