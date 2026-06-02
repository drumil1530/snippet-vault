import { Breadcrumb, BreadcrumbList, BreadcrumbSeparator } from "@/ui/breadcrumb";
import { Skeleton } from "@/ui/skeleton";

export function BreadcrumbSkeleton() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Skeleton className="w-9.5 h-5 rounded-2xl" />
        <BreadcrumbSeparator />
        <Skeleton className="w-11 h-5 rounded-2xl" />
        <BreadcrumbSeparator />
        <Skeleton className="w-24.5 h-5 rounded-2xl" />
      </BreadcrumbList>
    </Breadcrumb>
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
