"use server";

import {
  SnippetInclude,
  SnippetOrderByWithRelationInput,
  SnippetWhereInput,
} from "@/generated/prisma/models";
import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";
import z from "zod";
import { searchFiltersSchema } from "@/features/snippet/schemas";

type SearchFilters = z.infer<typeof searchFiltersSchema>;

async function resolveSearchFilters(filters: SearchFilters, userId?: string) {
  const { page, sortBy, items, query, language, tags } = filters;

  const whereInput = {
    ...(userId && { userId }),
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

  const orderBy = {
    newest: { updatedAt: "desc" as const },
    oldest: { updatedAt: "asc" as const },
  }[sortBy] satisfies SnippetOrderByWithRelationInput;

  return { whereInput, page, items, orderBy, length };
}

export async function getAllSnippets(filters: SearchFilters) {
  const { whereInput, page, items, orderBy, length } = await resolveSearchFilters(filters);

  const snippets = await prisma.snippet.findMany({
    take: items,
    skip: (page - 1) * items,
    orderBy: [orderBy, { id: "desc" }],
    where: whereInput,
    include: {
      ...snippetInclude,
      user: {
        select: { username: true },
      },
    },
  });

  return { snippets, length };
}

export async function getSnippet(id: string) {
  return prisma.snippet.findUnique({
    where: { id },
    include: {
      ...snippetInclude,
      user: {
        select: { username: true },
      },
    },
  });
}

export async function getOwnedSnippet(userId: string, id: string) {
  return prisma.snippet.findUnique({
    where: { id, userId },
    include: {
      ...snippetInclude,
      user: {
        select: { username: true },
      },
    },
  });
}

export async function getRecentUserSnippets(userId: string) {
  return prisma.snippet.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      language: {
        select: { name: true },
      },
      tagsOnSnippets: {
        select: {
          tag: { select: { name: true } },
        },
      },
    },
    take: 5,
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
  });
}

export async function getUserSnippets(userId: string, filters: SearchFilters) {
  const { whereInput, page, items, orderBy, length } = await resolveSearchFilters(filters, userId);

  const snippets = await prisma.snippet.findMany({
    where: whereInput,

    include: snippetInclude,
    take: items,
    skip: (page - 1) * items,
    orderBy: [orderBy, { id: "desc" }],
  });

  return { snippets, length };
}

export async function getSnippetMetadata(id: string) {
  return prisma.snippet.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      language: {
        select: { name: true },
      },
    },
  });
}

const snippetInclude = {
  language: true,
  tagsOnSnippets: {
    select: { tag: true },
  },
} satisfies SnippetInclude;

export type SnippetWithData = Omit<NonNullable<Awaited<ReturnType<typeof getSnippet>>>, "user"> & {
  user?: {
    username: string;
  };
};
