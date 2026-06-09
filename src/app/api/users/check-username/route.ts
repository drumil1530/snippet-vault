import { usernameSchema } from "@/features/auth/schema";
import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<UsernameCheckResponse>> {
  const username = new URL(req.url).searchParams.get("username");

  const result = usernameSchema.safeParse(username);

  if (result.success) {
    const exists = await prisma.user.findUnique({
      where: { username: result.data },
      select: { id: true },
    });

    if (exists) return NextResponse.json({ valid: true, available: false });
    else return NextResponse.json({ valid: true, available: true });
  }

  return NextResponse.json({
    valid: false,
    available: false,
    message: result.error.issues[0].message,
  });
}

export type UsernameCheckResponse = {
  available: boolean;
} & ValidationCheck;

type ValidationCheck =
  | {
      valid: true;
    }
  | {
      valid: false;
      message: string;
    };
