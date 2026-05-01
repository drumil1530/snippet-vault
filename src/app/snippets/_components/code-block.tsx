import { Skeleton } from "@/ui/skeleton";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { codeToHtml } from "shiki";

interface Props {
  children: string;
  lang: string;
  className?: ClassValue;
}

export default async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: out }}
      className={cn(
        "h-full max-h-full overflow-hidden [&>pre]:whitespace-pre-wrap [&>pre]:px-4 [&>pre]:py-3",
        props.className,
      )}
    />
  );
}

export function CodeBlockSkeleton() {
  return (
    <div className="h-42 w-full px-4 py-3 flex flex-col gap-2 *:h-3">
      <Skeleton className="w-1/6" />
      <Skeleton className="w-2/6" />
      <Skeleton className="w-4/6" />
      <Skeleton className="w-3/6" />
      <Skeleton className="w-2/6" />
      <Skeleton className="w-4/6" />
      <Skeleton className="w-3/6" />
      <Skeleton className="w-1/6" />
    </div>
  );
}
