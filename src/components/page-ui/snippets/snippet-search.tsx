"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appRoutes } from "@/utils/routes";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";

export default function SnippetSearch() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("title", query);
    else params.delete("title");

    router.push(appRoutes.snippets.list + "?" + params.toString());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <Input
        type="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  );
}
