import prisma from "@/lib/prisma-client";

export function cleanupUnusedTags() {
  return prisma.tag.deleteMany({
    where: {
      tagsOnSnippets: {
        none: {},
      },
    },
  });
}
