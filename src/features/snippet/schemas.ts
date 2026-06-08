import z from "zod";

export const snippetBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { error: "Title should be greater than 10 characters." })
    .max(100, { error: "Title should be less than 100 characters." }),
  languageId: z.cuid({
    error: "Please select proper language from dropdown.",
  }),
  code: z.string().trim().min(1, { error: "Code field should not be empty." }),
  description: z
    .string()
    .trim()
    .max(500, { error: "Description should be less than 500 characters long." })
    .optional(),
  tags: z
    .string()
    .trim()
    .transform((data) =>
      data.length > 0
        ? [
            ...new Set(
              data
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            ),
          ]
        : [],
    ),
});

export const searchFiltersSchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  sortBy: z.literal(["newest", "oldest"]).optional().default("newest"),
  items: z
    .literal(["3", "6", "9", "12"])
    .optional()
    .default("6")
    .transform((d) => Number(d)),
  query: z.string().toLowerCase().optional(),
  language: z.string().toLowerCase().optional(),
  tags: z
    .string()
    .toLowerCase()
    .transform((d) => (d.length > 0 ? d.split(",") : []))
    .optional(),
});
