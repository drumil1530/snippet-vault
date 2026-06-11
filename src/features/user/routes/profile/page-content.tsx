import { notFound } from "next/navigation";
import { getPublicUser } from "../../actions";
import { Card, CardContent } from "@/ui/card";
import { Separator } from "@/ui/separator";

import { CalendarDays, ChevronRight, FileCode2, UserCircle } from "lucide-react";
import RecentSnippets from "./recent-snippets";
import { Suspense } from "react";
import { SnippetPreviewListSkeleton } from "./skeleton";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/ui/button";

interface ProfilePageDataProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePageData({ params }: ProfilePageDataProps) {
  const { username } = await params;

  const user = await getPublicUser(username);

  if (!user) notFound();

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          {/* Avatar Placeholder */}
          <div className="size-20 rounded-full bg-muted text-center align-middle">
            <UserCircle className="size-20 stroke-2" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{user.name || user.username}</h1>

            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              Joined{" "}
              {user.createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}
            </div>

            <div className="flex items-center gap-2">
              <FileCode2 className="size-4" />
              {user._count.snippets} snippets
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Recent Snippets</h2>

            <p className="text-muted-foreground">Latest snippets published by @{user.username}</p>
          </div>

          {user._count.snippets > 0 && (
            <Button asChild variant="outline">
              <Link href={appRoutes.users(username).snippets}>
                View all {user._count.snippets} snippets <ChevronRight />
              </Link>
            </Button>
          )}
        </div>

        <Suspense fallback={<SnippetPreviewListSkeleton />}>
          <RecentSnippets userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}
