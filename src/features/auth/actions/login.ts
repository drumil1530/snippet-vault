"use server";

import { auth } from "@/lib/auth";
import { State } from "@/lib/types/action-state";
import { getParsedFormData } from "@/utils/forms";
import { LoginForm } from "@/features/auth/routes/login/form";
import { loginSchema } from "../schema";
import z from "zod";
import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";

export async function login(
  _prevState: State<LoginForm>,
  formData: FormData,
): Promise<State<LoginForm>> {
  const parsedData = getParsedFormData(formData);
  const result = loginSchema.safeParse(parsedData);

  if (result.success) {
    try {
      await auth.api.signInEmail({
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
