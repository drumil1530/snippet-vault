"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/utilities";
import { getFormData } from "@/utils/forms";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SnippetForm } from "../_components/base-form";
import { snippetBaseSchema } from "../_components/schemas";

export async function createSnippet(
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, code, languageId } = result.data;
    const tagsOnSnippet = await getTagsOnSnippet(result.data.tags);

    await prisma.snippet.create({
      data: {
        title,
        code,
        languageId,
        tagsOnSnippets: {
          createMany: { data: tagsOnSnippet.map((tagId) => ({ tagId })) },
        },
      },
    });

    redirect(appRoutes.home);
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}

async function getTagsOnSnippet(tagsInput: string[]) {
  const existingTags = await prisma.tag.findMany({
    where: { name: { in: tagsInput } },
  });

  const existingTagNames = existingTags.map((t) => t.name);
  const tagsToCreate = tagsInput.filter((t) => !existingTagNames.includes(t));

  const newTags = await prisma.tag.createManyAndReturn({
    data: tagsToCreate.map((t) => ({ name: t })),
    select: { id: true },
  });

  const tagIdsOnSnippet = [...existingTags.map((t) => t.id), ...newTags.map((t) => t.id)];

  return tagIdsOnSnippet;
}
