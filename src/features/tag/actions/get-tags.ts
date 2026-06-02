import prisma from "@/lib/prisma-client";

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}
