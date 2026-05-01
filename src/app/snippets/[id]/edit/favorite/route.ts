import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, ctx: RouteContext<"/snippets/[id]/edit/favorite">) {
  const data = await req.json();
  const { id } = await ctx.params;

  if (typeof data === "boolean") {
    const { isFavorite } = await prisma.snippet.update({
      where: { id },
      data: { isFavorite: data },
      select: { isFavorite: true },
    });
    return NextResponse.json(isFavorite);
  }

  return NextResponse;
}
