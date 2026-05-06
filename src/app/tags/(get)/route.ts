import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("query");

  if (query !== null) {
    const tags = await prisma.tag.findMany({
      where: { ...(query.trim() && { name: { contains: query, mode: "insensitive" } }) },
      select: { name: true },
      take: 10,
    });

    return NextResponse.json(tags.map((t) => t.name));
  }

  return NextResponse.json([]);
}
