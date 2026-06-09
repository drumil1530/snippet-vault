"use server";

import prisma from "@/lib/prisma-client";

export async function getPublicUser(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      createdAt: true,
      image: true,
      _count: { select: { snippets: true } },
    },
  });
}
