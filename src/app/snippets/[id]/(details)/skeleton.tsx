import { Card, CardHeader, CardContent } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";

export default function SnippetDetailsPageSkeleton() {
  return (
    <Card className="w-full cursor-progress">
      <CardHeader className="gap-2 flex justify-between items-center">
        <div>
          <Skeleton className="h-6 w-40 mb-1.5" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-7 w-12" />
          <Skeleton className="h-7 w-10" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="h-42 min-h-32">
        <Skeleton className="size-full" />
      </CardContent>
    </Card>
  );
}
