import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { z } from "zod";

export const snippetBaseSchema = z.object({
  title: z
    .string()
    .min(10, { error: "Title should be greater than 10 characters." })
    .max(100, { error: "Title should be less than 100 characters." }),
  languageId: z.cuid({
    error: "Please select proper language from dropdown.",
  }),
  code: z.string().min(1, { error: "Code field should not be empty." }),
  tags: z.string().transform((data) => (data.length > 1 ? [...new Set(data.split(","))] : [])),
});

export const searchFiltersSchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  sortBy: z.literal<SortOrder[]>(["asc", "desc"]).optional().default("desc"),
  items: z
    .literal(["3", "6", "9", "12"])
    .optional()
    .default("6")
    .transform((d) => Number(d)),
  query: z.string().toLowerCase().optional(),
  language: z.string().toLowerCase().optional(),
});
