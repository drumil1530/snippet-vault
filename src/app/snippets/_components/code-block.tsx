import { codeToHtml } from "shiki";

interface Props {
  children: string;
  lang: string;
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
      className="h-full max-h-full overflow-hidden [&>pre]:whitespace-pre-wrap [&>pre]:px-4 [&>pre]:py-3"
    />
  );
}
