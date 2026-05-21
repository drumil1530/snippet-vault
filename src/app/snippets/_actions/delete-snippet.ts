"use server";

import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { revalidatePath } from "next/cache";

export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({ where: { id } });
  revalidatePath(appRoutes.home);
}
