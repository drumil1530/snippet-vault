import { appRoutes } from "@/lib/routes";
import { Language } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { getAllSnippets, SnippetWithData } from "@/features/snippet/actions";
import { searchFiltersSchema } from "@/features/snippet/schemas";
import SnippetCard from "@/features/snippet/components/snippet-card";
import { SnippetPagination } from "./list-pagination";

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
            <SnippetPagination filters={filters} length={length} route={appRoutes.home} />
          </div>
        </>
      ) : (
        <p className="text-xl">No Snippet Found!</p>
      )}
    </>
  );
}

function RenderSnippetList({ snippets }: { snippets: SnippetWithData[] }) {
  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} route={appRoutes.home} />
      ))}
    </div>
  );
}
