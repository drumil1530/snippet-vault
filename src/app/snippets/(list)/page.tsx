import SnippetsList from "./list";
import SnippetSearch from "./search";
import { SnippetsListSkeleton } from "./skeleton";
import { getAllLanguages } from "@/app/languages/_actions/get-languages";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore Snippets",
  description: "Explore the latest code snippets",
};

export default async function SnippetsPage(props: PageProps<"/snippets">) {
  const searchParams = await props.searchParams;
  const languages = await getAllLanguages();

  return (
    <section>
      <h2 className="text-3xl font-heading text-nowrap font-medium" title="Explore Snippets">
        Explore Snippets
      </h2>

      <div className="w-full -mt-8.5 mb-2">
        <SnippetSearch languages={languages} />
      </div>
      <div className="py-2">
        <Suspense fallback={<SnippetsListSkeleton />}>
          <SnippetsList searchParams={searchParams} languages={languages} />
        </Suspense>
      </div>
    </section>
  );
}
