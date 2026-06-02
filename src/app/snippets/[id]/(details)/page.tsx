import { appRoutes } from "@/utils/routes";
import { Suspense } from "react";
import { Metadata } from "next";
import SnippetDetailsPageSkeleton from "@/features/snippet/routes/details/skeleton";
import SnippetDetail from "@/features/snippet/routes/details/page-content";
import AppBreadcrumb from "@/components/app/breadcrumb";

export const metadata: Metadata = {
  title: "Snippet Details",
  description: "Snippet details page.",
};

export default async function SnippetDetailPage(props: PageProps<"/snippets/[id]">) {
  return (
    <section className="space-y-4">
      <AppBreadcrumb links={[{ href: appRoutes.home, label: "Home" }]} page="Snippet Details" />

      <Suspense fallback={<SnippetDetailsPageSkeleton />}>
        <SnippetDetail params={props.params} />
      </Suspense>
    </section>
  );
}
