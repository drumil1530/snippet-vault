import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/breadcrumb";
import { appRoutes } from "@/utils/routes";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import SnippetDetailsPageSkeleton from "@/features/snippet/routes/details/skeleton";
import SnippetDetail from "@/features/snippet/routes/details/page-content";

export const metadata: Metadata = {
  title: "Snippet Details",
  description: "Snippet details page.",
};

export default async function SnippetDetailPage(props: PageProps<"/snippets/[id]">) {
  return (
    <section className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={appRoutes.home}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Snippet Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense fallback={<SnippetDetailsPageSkeleton />}>
        <SnippetDetail params={props.params} />
      </Suspense>
    </section>
  );
}
