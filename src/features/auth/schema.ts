import z from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, { error: "Name must be at least 2 characters long." })
  .max(50, { error: "Name must be less than 50 characters long." });

const RESERVED_USERNAMES = [
  "admin",
  "api",
  "new",
  "edit",
  "settings",

  "snippet",
  "snippets",

  "favorite",
  "favorites",

  "user",
  "users",

  "profile",

  "login",
  "logout",
  "register",
];

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { error: "Username must be at least 3 characters long." })
  .max(30, { error: "Username must be less than 30 characters long." })
  .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers and underscores.")
  .refine((username) => !RESERVED_USERNAMES.includes(username), "This username is reserved.");

const emailSchema = z.email().trim();

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "Password must be at least 8 characters long." })
  .max(50, { error: "Password must be less 50 characters long." });

export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
