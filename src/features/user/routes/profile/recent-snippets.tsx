import { getRecentUserSnippets } from "@/features/snippet/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { appRoutes } from "@/lib/routes";

export default async function RecentSnippets({ userId }: { userId: string }) {
  const snippets = await getRecentUserSnippets(userId);

  if (snippets.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">No snippets published yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="gap-2">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-lg">
                <Link
                  href={appRoutes.snippets.item(snippet.id).details}
                  className="hover:underline"
                >
                  {snippet.title}
                </Link>
              </CardTitle>

              <Badge variant="secondary">{snippet.language.name}</Badge>
            </div>

            <p className="text-xs text-muted-foreground">
              Updated {snippet.updatedAt.toLocaleDateString()}
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {snippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
            )}

            {snippet.tagsOnSnippets.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tagsOnSnippets.slice(0, 5).map(({ tag }) => (
                  <Badge key={tag.name} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
                {snippet.tagsOnSnippets.length > 5 && (
                  <Badge variant="outline">+{snippet.tagsOnSnippets.length - 5}</Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
