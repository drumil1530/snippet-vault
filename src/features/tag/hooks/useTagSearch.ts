import { appRoutes } from "@/utils/routes";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function useTagSearch() {
  async function fetchTags(value: string) {
    try {
      const res = await fetch(appRoutes.tags.search(value));
      const data = await res.json();

      if (Array.isArray(data)) setTags(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [debouncedValue] = useDebounce(input, 300);

  useEffect(() => {
    fetchTags(debouncedValue);
  }, [debouncedValue]);

  return { tags, loading, setLoading, input, setInput };
}
