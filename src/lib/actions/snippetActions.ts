"use server";

import { getFormData } from "@/utils/forms";
import prisma from "../prisma-client";
import { State } from "../types/utilities";
import { snippetBaseSchema } from "../schemas/snippetSchemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { CreateForm } from "@/components/forms/snippets/create-form";
import { UpdateForm } from "@/components/forms/snippets/edit-form";
import { appRoutes } from "@/utils/routes";

export async function getAllSnippets(page: number, sortBy: string) {
  const snippets = await prisma.snippet.findMany({
    take: 6,
    skip: (page - 1) * 6 || 0,
    orderBy: {
      updatedAt: sortBy === "asc" ? "asc" : "desc",
    },
  });

  return snippets;
}

export async function getSnippet(id: string) {
  const snippet = await prisma.snippet.findUnique({ where: { id } });

  return snippet;
}

export async function createNewSnippet(
  _prevState: State<CreateForm>,
  formData: FormData,
): Promise<State<CreateForm>> {
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
  _prevState: State<UpdateForm>,
  formData: FormData,
): Promise<State<UpdateForm>> {
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
