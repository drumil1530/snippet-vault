import { Card, CardContent, CardHeader } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";

export default function SnippetDetailsPageSkeleton() {
  return (
    <Card className="overflow-hidden py-0 gap-0 cursor-progress">
      <CardHeader className="space-y-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-56" />

            <Skeleton className="h-5 w-24 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        <div className="space-y-3 rounded-xl border p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </CardContent>
    </Card>
  );
}
