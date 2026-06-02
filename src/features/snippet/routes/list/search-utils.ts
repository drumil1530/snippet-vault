import { ComboboxItem } from "@/lib/types/shadcn/combobox";
import { ReadonlyURLSearchParams } from "next/navigation";
import { SearchFilterParams } from "@/features/snippet/constants";
import { setOrDeleteParam } from "@/utils/search-params";
import { searchFiltersSchema } from "../../schemas";

export type SearchFilters = {
  query: string;
  language: ComboboxItem | null;
  tags: string[];
};

export function parseSearchFilters(
  searchParams: ReadonlyURLSearchParams,
  languages: ComboboxItem[],
): SearchFilters {
  const { query, language, tags } = searchFiltersSchema.parse({
    query: searchParams.get(SearchFilterParams.QUERY) ?? undefined,
    language: searchParams.get(SearchFilterParams.LANGUAGE) ?? undefined,
    tags: searchParams.get(SearchFilterParams.TAGS) ?? undefined,
  });
  const selectedLanguage = languages.find((i) => i.value === language) ?? null;

  return {
    query: query || "",
    language: selectedLanguage,
    tags: tags || [],
  };
}

export function buildSearchParams(filters: SearchFilters, params: URLSearchParams) {
  setOrDeleteParam(params, SearchFilterParams.QUERY, filters.query);
  setOrDeleteParam(params, SearchFilterParams.LANGUAGE, filters.language?.value);
  setOrDeleteParam(params, SearchFilterParams.TAGS, filters.tags.join(","));
  setOrDeleteParam(params, SearchFilterParams.PAGE);

  return params;
}
