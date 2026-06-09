"use server";

import { auth } from "@/lib/auth";
import { State } from "@/lib/types/action-state";
import { getParsedFormData } from "@/utils/forms";
import { RegisterForm } from "@/features/auth/routes/register/form";
import { registerSchema } from "../schema";
import z from "zod";
import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";

export async function register(
  _prevState: State<RegisterForm>,
  formData: FormData,
): Promise<State<RegisterForm>> {
  const parsedData = getParsedFormData(formData);
  const result = registerSchema.safeParse(parsedData);

  if (result.success) {
    const user = await prisma.user.findUnique({
      where: { username: result.data.username },
      select: { id: true },
    });

    if (user)
      return {
        message: "User with provided username already exists. User another username.",
        data: parsedData,
      };

    try {
      await auth.api.signUpEmail({
        body: result.data,
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return {
          message: error.message,
          data: parsedData,
        };
      } else {
        return {
          message: "Something went wrong!",
          data: parsedData,
        };
      }
    }
  } else {
    return {
      errors: z.treeifyError(result.error),
      data: parsedData,
    };
  }

  redirect(appRoutes.home);
}
