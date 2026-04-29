"use server";

import { LanguageWhereInput } from "@/generated/prisma/models";
import prisma from "../prisma-client";

export async function getAllLanguages() {
  const languages = await prisma.language.findMany({
    orderBy: { name: "asc" },
  });

  return languages;
}

export async function getLanguageByIdOrName(
  idOrName: string,
  type: "id" | "name" = "id",
) {
  const whereInput = (
    type === "id" ? { id: idOrName } : { name: idOrName }
  ) satisfies LanguageWhereInput;

  const languages = await prisma.language.findUnique({
    where: whereInput,
  });

  return languages;
}
