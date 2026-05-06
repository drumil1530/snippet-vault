"use server";

import prisma from "@/lib/prisma-client";

export async function deleteSnippet(id: string) {
  await prisma.snippet.delete({ where: { id } });
}
