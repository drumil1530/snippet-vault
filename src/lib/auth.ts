import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma-client";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
