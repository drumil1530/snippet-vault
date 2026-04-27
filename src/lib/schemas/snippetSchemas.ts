import { z } from "zod";

export const CODE_LANGUAGES = [
  "Text",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "JSX",
  "TSX",
  "JSON",
  "XML",
] as const;

const CODE_LANGUAGE_VALUES = CODE_LANGUAGES.map((language) =>
  language.toLowerCase(),
);

export const snippetBaseSchema = z.object({
  title: z
    .string()
    .min(10, { error: "Title should be greater than 10 characters." })
    .max(100, { error: "Title should be less than 100 characters." }),
  language: z.enum(CODE_LANGUAGE_VALUES, {
    error: "Please select proper language from dropdown.",
  }),
  code: z.string().min(1, { error: "Code field should not be empty." }),
});
