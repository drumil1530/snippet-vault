"use server";

import { LanguageWhereInput } from "@/generated/prisma/models";
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

export async function getLanguageByIdOrName(idOrName: string, isName = false) {
  const whereInput = (isName ? { name: idOrName } : { id: idOrName }) satisfies LanguageWhereInput;

  const languages = await prisma.language.findUnique({
    where: whereInput,
  });

  return languages;
}
