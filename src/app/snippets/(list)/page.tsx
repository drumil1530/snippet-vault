import SnippetsList from "./list";
import SnippetSearch from "./search";
import { SnippetsListSkeleton } from "./skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="px-3">
      <Card className="py-4 rounded-xl border">
        <CardHeader className="flex justify-between items-center flex-col sm:flex-row gap-2">
          <CardTitle className="text-2xl font-heading text-nowrap truncate">
            Explore Snippets
          </CardTitle>
          <SnippetSearch languages={languages} />
        </CardHeader>
        <CardContent className="pb-2">
          <Suspense fallback={<SnippetsListSkeleton />}>
            <SnippetsList searchParams={searchParams} languages={languages} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
