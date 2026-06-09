"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/action-state";
import { getParsedFormData } from "@/utils/forms";
import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";
import z from "zod";
import { SnippetForm } from "@/features/snippet/components";
import { snippetBaseSchema } from "@/features/snippet/schemas";
import { resolveCreateSnippetTags } from "@/features/snippet/services/resolve-tags";
import { getSessionOrRedirect } from "@/utils/session";
import { getSession } from "@/features/auth/actions/session";

export async function createSnippet(
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getParsedFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, code, description, languageId } = result.data;
    const { user } = getSessionOrRedirect(await getSession());

    const resolvedTagIds = await resolveCreateSnippetTags(result.data.tags);

    await prisma.snippet.create({
      data: {
        title,
        code,
        description,
        languageId,
        tagsOnSnippets: {
          createMany: { data: resolvedTagIds.map((tagId) => ({ tagId })) },
        },
        userId: user.id,
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
