import { getAllSnippets } from "@/lib/actions/snippetActions";
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

export default async function SnippetsList({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number.parseInt(String(searchParams["page"] || "1"));
  const sortBy = String(searchParams["sortby"] || "desc");
  const title = String(searchParams["title"] || "");

  const { snippets, length } = await getAllSnippets(page, sortBy, title);

  return (
    <>
      {length > 0 ? (
        <>
          <SnippetListRender snippets={snippets} />
          <SnippetPagination
            page={page}
            sortBy={sortBy}
            length={length}
            title={title}
          />
        </>
      ) : (
        <p className="text-xl">
          No snippets found containing the title: {title}
        </p>
      )}
    </>
  );
}

function SnippetListRender({
  snippets,
}: {
  snippets: {
    title: string;
    id: string;
    code: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {
  return (
    <div className="flex flex-wrap *:min-w-3xs md:*:min-w-1/4 gap-2">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="gap-3 grow">
          <CardHeader>
            <CardTitle>{snippet.title}</CardTitle>
            <CardDescription>{snippet.language}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="h-30 max-h-30 truncate">
            <pre>
              <code>{snippet.code}</code>
            </pre>
          </CardContent>
          <CardFooter className="gap-1 p-1 justify-end">
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

function SnippetPagination({
  page,
  sortBy,
  length,
  title,
}: {
  page: number;
  sortBy: string;
  length: number;
  title: string;
}) {
  const queryInputs: Record<string, string> = { sortBy };

  if (title) queryInputs["title"] = title;

  const previousPage = (pageNumber: number) =>
    ({
      pathname: appRoutes.snippets.list,
      query: { page: page - pageNumber, ...queryInputs },
    }) satisfies UrlObject;

  const nextPage = (pageNumber: number) =>
    ({
      pathname: appRoutes.snippets.list,
      query: { page: page + pageNumber, ...queryInputs },
    }) satisfies UrlObject;

  return (
    <Pagination className="mb-2 mt-4">
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious
              href={page > 1 ? previousPage(1) : "#"}
              aria-disabled={page <= 1}
            />
          ) : (
            <Button variant="ghost" disabled>
              <ChevronLeftIcon data-icon="inline-start" />
              <span className="hidden sm:block">Previous</span>
            </Button>
          )}
        </PaginationItem>
        <PaginationItem>
          {/* Third last Page link when page last */}
          {page - 2 > 0 && page === length && (
            <PaginationLink href={previousPage(2)}>{page - 2}</PaginationLink>
          )}

          {/* Previous Page link when page is not first */}
          {page > 1 && (
            <PaginationLink href={previousPage(1)}>{page - 1}</PaginationLink>
          )}

          {/* Current Page link */}
          <PaginationLink href="#" isActive aria-disabled="true">
            {page}
          </PaginationLink>

          {/* Next Page link when page is not last */}
          {page < length && (
            <PaginationLink href={nextPage(1)}>{page + 1}</PaginationLink>
          )}

          {/* Third Page link when page first */}
          {page + 2 < length && page === 1 && (
            <PaginationLink href={nextPage(2)}>{page + 2}</PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          {page < length ? (
            <PaginationNext
              href={page < length ? nextPage(1) : "#"}
              aria-disabled={page >= length}
            />
          ) : (
            <Button variant="ghost" disabled>
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon data-icon="inline-end" />
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
