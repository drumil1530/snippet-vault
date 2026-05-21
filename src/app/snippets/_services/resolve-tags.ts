import prisma from "@/lib/prisma-client";
import { appRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export async function resolveCreateSnippetTags(tagsInput: string[]) {
  // get tags that already exists
  const existingTagsMap = await findExistingTags(tagsInput);

  // create tags if they don't exist
  const tagsToCreate = tagsInput.filter((t) => !existingTagsMap.has(t));
  const newTags = await prisma.tag.createManyAndReturn({
    data: tagsToCreate.map((t) => ({ name: t })),
    select: { id: true },
  });

  // get existing and newly created tag ids
  const resolvedTagIds = [...existingTagsMap.values().toArray(), ...newTags.map((t) => t.id)];

  return resolvedTagIds;
}

export async function resolveUpdateSnippetTags(
  input: string[],
  snippetId: string,
): Promise<
  | {
      toAdd: string[];
      toRemove: string[];
    }
  | undefined
> {
  // get existing tags on the snippet
  const snippetTagsMap = await getSnippetTagsMap(snippetId);

  // if input and existing tags are same, then return
  const isSame =
    input.length === snippetTagsMap.size && input.every((tag) => snippetTagsMap.has(tag));
  if (isSame) return;

  // get new tags which are not in the snippet
  const newTagsInput = input.filter((t) => !snippetTagsMap.has(t));

  // get existing tags map from the new tags
  const existingTagsMap = await findExistingTags(newTagsInput);

  // if the tags doesn't exist, create them and get the ids
  const tagsToCreate = newTagsInput.filter((t) => !existingTagsMap.has(t));
  const newTagIds = await prisma.tag.createManyAndReturn({
    data: tagsToCreate.map((t) => ({ name: t })),
    select: { id: true },
  });

  // take ids from existing tags and newly created tags
  const toAdd = [...existingTagsMap.values().toArray(), ...newTagIds.map((t) => t.id)];

  // take ids which are in snippet tags, but not in the input
  const toRemove = snippetTagsMap
    .keys()
    .filter((t) => !input.includes(t))
    .map((t) => snippetTagsMap.get(t)!)
    .toArray();

  return { toAdd, toRemove };
}

async function getSnippetTagsMap(snippetId: string) {
  const snippet = await prisma.snippet.findUnique({
    where: { id: snippetId },
    select: { tagsOnSnippets: { select: { tag: true } } },
  });
  if (!snippet) redirect(appRoutes.home);

  const snippetTagsMap = new Map(snippet.tagsOnSnippets.map((t) => [t.tag.name, t.tag.id]));
  return snippetTagsMap;
}

async function findExistingTags(input: string[]) {
  const existingTags = await prisma.tag.findMany({
    where: { name: { in: input } },
  });

  const existingTagsMap = new Map(existingTags.map((t) => [t.name, t.id]));
  return existingTagsMap;
}
