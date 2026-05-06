"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/utilities";
import { getFormData } from "@/utils/forms";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SnippetForm } from "../_components/base-form";
import { snippetBaseSchema } from "../_components/schemas";

export async function updateSnippet(
  id: string,
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, languageId, code } = result.data;
    const tagsOnSnippet = await getTagsOnSnippetToAddAndRemove(result.data.tags, id);

    await prisma.snippet.update({
      where: { id },
      data: {
        languageId,
        title,
        code,
        tagsOnSnippets: {
          ...(tagsOnSnippet && {
            createMany: {
              data: tagsOnSnippet.toAdd.map((tagId) => ({ tagId })),
              skipDuplicates: true,
            },
            deleteMany: tagsOnSnippet.toRemove.map((tagId) => ({ tagId })),
          }),
        },
      },
    });

    redirect(appRoutes.snippets.details(id));
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}

async function getTagsOnSnippetToAddAndRemove(
  tagsInput: string[],
  snippetId: string,
): Promise<
  | {
      toAdd: string[];
      toRemove: string[];
    }
  | undefined
> {
  const snippet = await prisma.snippet.findUnique({
    where: { id: snippetId },
    select: { tagsOnSnippets: { select: { tag: true } } },
  });
  if (!snippet) redirect(appRoutes.home);

  const snippetTagName = snippet.tagsOnSnippets.map((t) => t.tag.name);
  const isSame =
    tagsInput.length === snippetTagName.length &&
    tagsInput.every((tag) => snippetTagName.includes(tag));

  if (isSame) return;

  const newTagsInput = tagsInput.filter((t) => !snippetTagName.includes(t));

  const existingTags = await prisma.tag.findMany({
    where: { name: { in: newTagsInput } },
  });

  const existingTagNames = existingTags.map((t) => t.name);
  const tagsToCreate = newTagsInput.filter((t) => !existingTagNames.includes(t));

  const newTagIds = await prisma.tag.createManyAndReturn({
    data: tagsToCreate.map((t) => ({ name: t })),
    select: { id: true },
  });

  const tagMap = new Map(snippet.tagsOnSnippets.map((t) => [t.tag.name, t.tag.id]));
  const toAdd = [...existingTags.map((t) => t.id), ...newTagIds.map((t) => t.id)];
  const toRemove = snippetTagName
    .filter((t) => !tagsInput.includes(t) && tagMap.has(t))
    .map((t) => tagMap.get(t)!);

  return { toAdd, toRemove };
}
