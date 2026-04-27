import SnippetsList from "@/components/page-ui/snippets/list-page";
import { SnippetsListSkeleton } from "@/components/skeletons/snippet/list-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore Snippets",
  description: "Explore the latest code snippets",
};

export default async function SnippetsPage(props: PageProps<"/snippets">) {
  const searchParams = await props.searchParams;
  return (
    <Card className="py-4 rounded-xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">
          Explore Snippets
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Suspense fallback={<SnippetsListSkeleton />}>
          <SnippetsList searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
