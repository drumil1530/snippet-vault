"use server";

import { getFormData } from "@/utils/forms";
import prisma from "../prisma-client";
import { State } from "../types/utilities";
import { snippetBaseSchema } from "../schemas/snippetSchemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/routes";
import { SnippetForm } from "@/components/forms/snippets/base-form";
import {
  SnippetWhereInput,
  SortOrder,
} from "@/generated/prisma/internal/prismaNamespaceBrowser";

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

export async function createNewSnippet(
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    await prisma.snippet.create({ data: result.data });

    redirect(appRoutes.snippets.list);
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}

export async function updateNewSnippet(
  id: string,
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    await prisma.snippet.update({ where: { id }, data: result.data });

    redirect(appRoutes.snippets.details(id));
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}

export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({ where: { id } });

  redirect(appRoutes.snippets.list);
}
