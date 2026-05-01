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
      <header className="flex justify-between gap-2 h-10 has-data-open:h-30 md:has-data-open:h-22 transition-[height] duration-100 relative">
        <h2 className="text-3xl font-heading text-nowrap font-medium">Explore Snippets</h2>
        <div className="absolute right-0 top-1 w-full">
          <SnippetSearch languages={languages} />
        </div>
      </header>
      <div className="py-2">
        <Suspense fallback={<SnippetsListSkeleton />}>
          <SnippetsList searchParams={searchParams} languages={languages} />
        </Suspense>
      </div>
    </section>
  );
}
