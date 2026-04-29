import SnippetsList from "@/components/page-ui/snippets/list-page";
import SnippetSearch from "@/components/page-ui/snippets/snippet-search";
import { SnippetsListSkeleton } from "@/components/skeletons/snippet/list-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllLanguages } from "@/lib/actions/languageActions";
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
        <CardHeader className="flex justify-between">
          <CardTitle className="text-2xl font-heading">
            Explore Snippets
          </CardTitle>
          <SnippetSearch languages={languages} />
        </CardHeader>
        <CardContent className="pb-2">
          <Suspense fallback={<SnippetsListSkeleton />}>
            <SnippetsList searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
