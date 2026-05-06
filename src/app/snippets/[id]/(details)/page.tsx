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
        <SnippetDetail id={id} />
      </Suspense>
    </section>
  );
}
