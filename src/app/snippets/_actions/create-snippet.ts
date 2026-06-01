"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/utilities";
import { getFormData } from "@/utils/forms";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import z from "zod";
import { SnippetForm, snippetBaseSchema } from "../_components";
import { resolveCreateSnippetTags } from "../_services/resolve-tags";

export async function createSnippet(
  _prevState: State<SnippetForm>,
  formData: FormData,
): Promise<State<SnippetForm>> {
  const parsedData = getFormData(formData);

  const result = snippetBaseSchema.safeParse(parsedData);

  if (result.success) {
    const { title, code, languageId } = result.data;
    const resolvedTagIds = await resolveCreateSnippetTags(result.data.tags);

    await prisma.snippet.create({
      data: {
        title,
        code,
        languageId,
        tagsOnSnippets: {
          createMany: { data: resolvedTagIds.map((tagId) => ({ tagId })) },
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
