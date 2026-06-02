import { ComboboxItem } from "@/lib/types/shadcn/combobox";
import { ReadonlyURLSearchParams } from "next/navigation";
import { SearchFilterParams } from "@/features/snippet/constants";
import { setOrDeleteParam } from "@/utils/search-params";

export type SearchFilters = {
  query: string;
  language: ComboboxItem | null;
  tags: string[];
};

export function parseSearchFilters(
  searchParams: ReadonlyURLSearchParams,
  languages: ComboboxItem[],
): SearchFilters {
  const queryParam = searchParams.get(SearchFilterParams.QUERY) || "";
  const languageParam = searchParams.get(SearchFilterParams.LANGUAGE)?.toLowerCase();
  const tagsParam = searchParams.get(SearchFilterParams.TAGS)?.toLowerCase() || "";
  const tagsParamArray = tagsParam.length > 0 ? tagsParam.split(",") : [];
  const selectedLanguage = languages.find((i) => i.value === languageParam) ?? null;

  return {
    query: queryParam,
    language: selectedLanguage,
    tags: tagsParamArray,
  };
}

export function buildSearchParams(filters: SearchFilters, params: URLSearchParams) {
  setOrDeleteParam(params, SearchFilterParams.QUERY, filters.query);
  setOrDeleteParam(params, SearchFilterParams.LANGUAGE, filters.language?.value);
  setOrDeleteParam(params, SearchFilterParams.TAGS, filters.tags.join(","));
  setOrDeleteParam(params, SearchFilterParams.PAGE);

  return params;
}
