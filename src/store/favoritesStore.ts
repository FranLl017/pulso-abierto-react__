
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoritos: string[];
  alternarFavorito: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoritos: [],

      alternarFavorito: (id) =>
        set((state) => ({
          favoritos: state.favoritos.includes(id)
            ? state.favoritos.filter((favorito) => favorito !== id)
            : [...state.favoritos, id],
        })),
    }),
    {
      name: "pulso-abierto-favoritos",
    }
  )
);
