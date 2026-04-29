"use server";

import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SnippetWhereInput } from "@/generated/prisma/models";
import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export type SnippetWithLanguage = NonNullable<
  Awaited<ReturnType<typeof getSnippet>>
>;

export type SnippetFilters = {
  page: number;
  sortBy: SortOrder;
  items: number;
  title?: string;
  language?: string;
};

export async function getAllSnippets(filters: SnippetFilters) {
  const { page, sortBy, items, title, language } = filters;

  const whereInput = {
    ...(title && { title: { contains: title, mode: "insensitive" } }),
    ...(language && {
      language: { name: { equals: language, mode: "insensitive" } },
    }),
  } satisfies SnippetWhereInput;

  const length = Math.ceil(
    (await prisma.snippet.count({ where: whereInput })) / items,
  );

  if (length > 1 && (page < 1 || page > length))
    redirect(appRoutes.snippets.list);

  const snippets = await prisma.snippet.findMany({
    take: items,
    skip: (page - 1) * items || 0,
    orderBy: {
      updatedAt: sortBy,
    },
    where: whereInput,
    include: { language: true },
  });

  return { snippets, length };
}

export async function getSnippet(id: string) {
  const snippet = await prisma.snippet.findUnique({
    where: { id },
    include: { language: true },
  });

  return snippet;
}
