"use server";

import prisma from "@/lib/prisma-client";
import { State } from "@/lib/types/utilities";
import { getFormData } from "@/utils/forms";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SnippetForm } from "../_components/base-form";
import { snippetBaseSchema } from "../_components/schemas";

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
