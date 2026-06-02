"use server";

import { cleanupUnusedTags } from "@/features/tag/services/cleanup-tags";
import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { revalidatePath } from "next/cache";

export async function deleteSnippet(id: string) {
  await prisma.$transaction([prisma.snippet.delete({ where: { id } }), cleanupUnusedTags()]);
  revalidatePath(appRoutes.home);
}
