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
import { buttonVariants } from "../../ui/button";
import { appRoutes } from "@/utils/routes";
import { Separator } from "@/components/ui/separator";

export default async function SnippetsList({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number.parseInt(String(searchParams["page"] || "1"));
  const sortBy = String(searchParams["sortby"] || "desc");
  const snippets = await getAllSnippets(page, sortBy);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {snippets.map((snippet) => (
          <Card key={snippet.id} className="gap-3">
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
            <CardFooter className="gap-1">
              <Link
                href={appRoutes.snippets.details(snippet.id)}
                className={buttonVariants({ variant: "outline" })}
              >
                See detailed...
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <SnippetPagination
        page={page}
        sortBy={sortBy}
        length={Math.ceil(snippets.length / 6)}
      />
    </>
  );
}

export function SnippetPagination({
  page,
  sortBy,
  length,
}: {
  page: number;
  sortBy: string;
  length: number;
}) {
  const previousPage = {
    pathname: appRoutes.snippets.list,
    query: { page: page - 1, sortBy },
  };
  const nextPage = {
    pathname: appRoutes.snippets.list,
    query: { page: page + 1, sortBy },
  };

  return (
    <Pagination className="mb-2 mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? previousPage : "#"}
            aria-disabled={page <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive aria-disabled="true">
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={page < length ? nextPage : "#"}
            aria-disabled={page >= length}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
