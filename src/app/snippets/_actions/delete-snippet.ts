"use server";

import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({ where: { id } });

  redirect(appRoutes.home);
}
