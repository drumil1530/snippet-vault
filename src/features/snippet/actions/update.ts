"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/action-state";
import { getParsedFormData } from "@/utils/forms";
import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";
import z from "zod";
import { revalidatePath } from "next/cache";
import { SnippetForm } from "@/features/snippet/components";
import { snippetBaseSchema } from "@/features/snippet/schemas";
import { resolveUpdateSnippetTags } from "@/features/snippet/services/resolve-tags";
import { cleanupUnusedTags } from "@/features/tag/services/cleanup-tags";
import { getSessionOrRedirect } from "@/utils/session";
import { getSession } from "@/features/auth/actions/session";

export async function updateSnippet(
  id: string,
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getParsedFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, code, description, languageId } = result.data;
    const { user } = getSessionOrRedirect(await getSession());
    const resolvedTags = await resolveUpdateSnippetTags(result.data.tags, id);

    const snippetExists = await prisma.snippet.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });

    if (!snippetExists)
      return {
        data: parsedData,
        message: "Snippet not found or you don't have permission to update it.",
      };

    await prisma.$transaction([
      prisma.snippet.update({
        where: { id },
        data: {
          title,
          code,
          description,
          languageId,
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

    revalidatePath(appRoutes.snippets.item(id).details);
    redirect(appRoutes.snippets.item(id).details);
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }
}
