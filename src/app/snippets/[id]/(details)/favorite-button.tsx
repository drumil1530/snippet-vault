"use client";

import { appRoutes } from "@/utils/routes";
import { Star } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

type FavoriteButtonProps = {
  id: string;
  isFavorite: boolean;
};

export default function FavoriteButton({ id, isFavorite }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const [debounceValue] = useDebounce(!favorite, 300);

  async function handleClick() {
    setFavorite(debounceValue);

    await fetch(appRoutes.snippets.editFavorite(id), {
      method: "PATCH",
      body: JSON.stringify(debounceValue),
    });
  }

  return (
    <button onClick={handleClick}>
      {favorite ? <Star className="fill-foreground" /> : <Star />}
    </button>
  );
}
