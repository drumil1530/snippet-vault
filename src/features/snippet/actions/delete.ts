"use server";

import { getSession } from "@/features/auth/actions/session";
import { cleanupUnusedTags } from "@/features/tag/services/cleanup-tags";
import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/lib/routes";
import { getSessionOrRedirect } from "@/utils/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSnippet(id: string) {
  const { user } = getSessionOrRedirect(await getSession());

  const [{ count }] = await prisma.$transaction([
    prisma.snippet.deleteMany({ where: { id, userId: user.id } }),
    cleanupUnusedTags(),
  ]);

  if (count === 0) throw new Error("Snippet not found or you don't have permission to delete it.");

  revalidatePath(appRoutes.home);
  redirect(appRoutes.home);
}
