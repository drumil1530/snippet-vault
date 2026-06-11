import AppBreadcrumb from "@/components/custom-ui/breadcrumb";
import { appRoutes } from "@/lib/routes";
import { Skeleton } from "@/ui/skeleton";

export function BreadcrumbSkeleton() {
  return (
    <AppBreadcrumb
      links={[
        { href: appRoutes.home, label: "Home" },
        { label: <Skeleton className="w-11 h-5 rounded-2xl" /> },
      ]}
      page="Edit Snippet"
    />
  );
}

export function FormSkeleton() {
  return (
    <div>
      <div className="space-y-[20.5px]">
        <div>
          <Skeleton className="w-10 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-20.5 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-30 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-18 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-10 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </div>
        <div>
          <Skeleton className="w-24 h-4.5 mb-2.25" />
          <Skeleton className="w-full h-60 rounded-lg" />
        </div>
      </div>
      <div>
        <Skeleton className="w-17 h-8 rounded-lg mt-2" />
      </div>
    </div>
  );
}
