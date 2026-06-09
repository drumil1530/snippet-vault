import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="size-20 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-8 w-52" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex gap-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-px w-full" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />

        <SnippetPreviewListSkeleton />
      </div>
    </div>
  );
}

export function SnippetPreviewListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <SnippetPreviewSkeleton key={index} />
      ))}
    </div>
  );
}

function SnippetPreviewSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex justify-between gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="h-4 w-32" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </CardContent>
    </Card>
  );
}
