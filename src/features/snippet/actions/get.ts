"use server";

import { SnippetInclude, SnippetWhereInput } from "@/generated/prisma/models";
import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import z from "zod";
import { searchFiltersSchema } from "@/features/snippet/schemas";

export async function getAllSnippets(filters: z.infer<typeof searchFiltersSchema>) {
  const { page, sortBy, items, query, language, tags } = filters;

  const whereInput = {
    ...(query && {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { code: { contains: query, mode: "insensitive" } },
      ],
    }),
    ...(language && {
      language: { name: { equals: language, mode: "insensitive" } },
    }),
    ...(tags && {
      tagsOnSnippets: {
        some: {
          tag: { name: { in: tags } },
        },
      },
    }),
  } satisfies SnippetWhereInput;

  const length = Math.ceil((await prisma.snippet.count({ where: whereInput })) / items);

  if (length > 1 && (page < 1 || page > length)) redirect(appRoutes.home);

  const snippets = await prisma.snippet.findMany({
    take: items,
    skip: (page - 1) * items,
    orderBy: [{ updatedAt: sortBy }, { id: "desc" }],
    where: whereInput,
    include: snipppetInclude,
  });

  return { snippets, length };
}

export async function getSnippet(id: string) {
  return prisma.snippet.findUnique({
    where: { id },
    include: snipppetInclude,
  });
}

const snipppetInclude = {
  language: true,
  tagsOnSnippets: {
    omit: { tagId: true, snippetId: true },
    include: { tag: true },
  },
} satisfies SnippetInclude;

export type SnippetWithLanguageAndTags = NonNullable<Awaited<ReturnType<typeof getSnippet>>>;
