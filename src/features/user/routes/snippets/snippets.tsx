import SnippetCard from "@/features/snippet/components/snippet-card";
import { UserSnippetsProps } from "./page-content";
import { getUserSnippets } from "@/features/snippet/actions";
import { searchFiltersSchema } from "@/features/snippet/schemas";
import { appRoutes } from "@/lib/routes";
import { notFound, redirect } from "next/navigation";
import { SnippetPagination } from "@/features/snippet/routes/list/list-pagination";
import { checkUserExistance } from "../../actions";
import { Language } from "@/generated/prisma/client";

export default async function UserSnippets({
  props,
  languages,
}: UserSnippetsProps & { languages: Language[] }) {
  const { params, searchParams } = props;
  const result = searchFiltersSchema.safeParse(await searchParams);
  if (!result.success) redirect(appRoutes.home);

  const filters = result.data;

  const languagesMap = new Map(languages.map((lang) => [lang.slug, lang.name]));

  if (filters.language && !languagesMap.has(filters.language)) redirect(appRoutes.home);

  const { username } = await params;
  const user = await checkUserExistance(username);
  if (!user) notFound();

  const { snippets, length } = await getUserSnippets(user.id, filters);

  return (
    <>
      {length > 0 ? (
        <>
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                route={appRoutes.users(username).snippets}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 mb-2">
            <SnippetPagination
              filters={filters}
              length={length}
              route={appRoutes.users(username).snippets}
            />
          </div>
        </>
      ) : (
        <p className="text-xl">No Snippet Found!</p>
      )}
    </>
  );
}
