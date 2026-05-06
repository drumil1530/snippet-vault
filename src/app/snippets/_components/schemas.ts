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
  tags: z.string().transform((data) => data.split(",")),
});
