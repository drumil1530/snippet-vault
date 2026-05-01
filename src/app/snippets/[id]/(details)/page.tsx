import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/ui/breadcrumb";
import { appRoutes } from "@/utils/routes";
import SnippetDetail from "./details";
import SnippetDetailsPageSkeleton from "./skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippet Details",
  description: "Snippet details page.",
};

export default async function SnippetDetailPage(props: PageProps<"/snippets/[id]">) {
  const { id } = await props.params;

  return (
    <section>
      <Breadcrumb className="mb-2">
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
      <h2 className="text-3xl font-medium mb-4">Snippet Details</h2>
      <Suspense fallback={<SnippetDetailsPageSkeleton />}>
        <SnippetDetail id={id} />
      </Suspense>
    </section>
  );
}
