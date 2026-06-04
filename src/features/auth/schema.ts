import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name must be less than 50 characters long." }),
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(50, { error: "Password must be less 50 characters long." }),
});

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(50, { error: "Password must be less 50 characters long." }),
});
