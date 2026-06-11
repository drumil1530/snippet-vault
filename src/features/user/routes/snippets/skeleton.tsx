import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { appRoutes } from "@/lib/routes";
import { Skeleton } from "@/ui/skeleton";

export function BreadCrumbSkeleton() {
  return (
    <AppBreadcrumb
      links={[
        { href: appRoutes.home, label: "Home" },
        { label: <Skeleton className="w-20 h-5" /> },
      ]}
      page="Snippets"
    />
  );
}
