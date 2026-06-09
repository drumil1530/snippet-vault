import { appRoutes } from "@/lib/routes";
import { Suspense } from "react";
import { Metadata } from "next";
import SnippetDetailsPageSkeleton from "@/features/snippet/routes/details/skeleton";
import SnippetDetail from "@/features/snippet/routes/details/page-content";
import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { getSnippetMetadata } from "@/features/snippet/actions";

export async function generateMetadata(props: PageProps<"/snippets/[id]">): Promise<Metadata> {
  const { id } = await props.params;

  const snippet = await getSnippetMetadata(id);

  if (!snippet) {
    return {
      title: "Snippet Not Found",
      description: "The requested snippet does not exist.",
    };
  }

  return {
    title: snippet.title,
    description: snippet.description || `Code snippet in ${snippet.language.name}`,
  };
}

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
