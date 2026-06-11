import {
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon, ChevronFirstIcon, ChevronLastIcon } from "lucide-react";
import { ParsedUrlQueryInput } from "querystring";
import { UrlObject } from "url";
import z from "zod";
import { searchFiltersSchema } from "@/features/snippet/schemas";
import { Button } from "@/ui/button";

interface SnippetPaginationProps {
  filters: z.infer<typeof searchFiltersSchema>;
  length: number;
  route: string;
}

export function SnippetPagination({ filters, length, route }: SnippetPaginationProps) {
  const { page, sortBy, items, query, language } = filters;

  const queryInputs = {
    ...(sortBy !== "newest" && { sortBy }),
    ...(query && { query }),
    ...(language && { language }),
    ...(items !== 6 && { items }),
  } satisfies ParsedUrlQueryInput;

  const goToPage = (pageNumber: number) =>
    ({
      pathname: route,
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
