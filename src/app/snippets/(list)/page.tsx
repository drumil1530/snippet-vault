import { getAllLanguages } from "@/features/language/actions/get-languages";
import SnippetsList from "@/features/snippet/routes/list/page-content";
import SnippetSearch from "@/features/snippet/routes/list/search";
import { SnippetsListSkeleton } from "@/features/snippet/routes/list/skeleton";
import { Button } from "@/ui/button";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore Snippets",
  description: "Browse and discover code snippets shared in Snippet Vault.",
};

export default async function SnippetsPage(props: PageProps<"/snippets">) {
  const { searchParams } = props;
  const languages = await getAllLanguages();

  return (
    <section>
      <h2 className="text-3xl font-heading text-nowrap font-medium" title="Explore Snippets">
        Explore Snippets
      </h2>

      <div className="w-full -mt-8.5 mb-2">
        <Suspense fallback={<Button value="Loading" variant="outline" />}>
          <SnippetSearch languages={languages} />
        </Suspense>
      </div>
      <div className="py-2">
        <Suspense fallback={<SnippetsListSkeleton />}>
          <SnippetsList searchParams={searchParams} languages={languages} />
        </Suspense>
      </div>
    </section>
  );
}
