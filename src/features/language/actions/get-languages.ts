"use server";

import prisma from "@/lib/prisma-client";
import { cacheLife, cacheTag } from "next/cache";

export async function getAllLanguages() {
  "use cache";
  cacheLife("days");
  cacheTag("languages");

  const languages = await prisma.language.findMany({
    orderBy: [{ snippets: { _count: "desc" } }, { name: "asc" }],
  });

  return languages;
}
