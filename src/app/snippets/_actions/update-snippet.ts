"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/utilities";
import { getFormData } from "@/utils/forms";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SnippetForm, snippetBaseSchema } from "../_components";
import { resolveUpdateSnippetTags } from "../_services/resolve-tags";
import { revalidatePath } from "next/cache";
import { cleanupUnusedTags } from "@/app/tags/services/cleanup-tags";

export async function updateSnippet(
  id: string,
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, languageId, code } = result.data;
    const resolvedTags = await resolveUpdateSnippetTags(result.data.tags, id);

    await prisma.$transaction([
      prisma.snippet.update({
        where: { id },
        data: {
          languageId,
          title,
          code,
          tagsOnSnippets: {
            createMany: {
              data: resolvedTags?.toAdd.map((tagId) => ({ tagId })) || [],
              skipDuplicates: true,
            },
            deleteMany: resolvedTags?.toRemove.map((tagId) => ({ tagId })),
          },
        },
      }),
      cleanupUnusedTags(),
    ]);

    revalidatePath(appRoutes.snippets.details(id));
    redirect(appRoutes.snippets.details(id));
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}
