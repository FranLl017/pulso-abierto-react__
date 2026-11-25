
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFavoritesStore } from "../store/favoritesStore";

function FavoritesTest() {
  const esFavorito = useFavoritesStore(
    (state) => state.favoritos.includes("bitcoin")
  );

  const alternarFavorito = useFavoritesStore(
    (state) => state.alternarFavorito
  );

  return (
    <div>
      <p>
        {esFavorito ? "Bitcoin es favorito" : "Bitcoin no es favorito"}
      </p>

      <button onClick={() => alternarFavorito("bitcoin")}>
        {esFavorito ? "Quitar favorito" : "Agregar favorito"}
      </button>
    </div>
  );
}

describe("Pruebas de favoritos", () => {
  beforeEach(() => {
    localStorage.clear();

    useFavoritesStore.setState({
      favoritos: [],
    });
  });

  it("permite agregar y quitar una criptomoneda de favoritos", async () => {
    const user = userEvent.setup();

    render(<FavoritesTest />);

    expect(
      screen.getByText("Bitcoin no es favorito")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Agregar favorito" })
    );

    expect(
      screen.getByText("Bitcoin es favorito")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Quitar favorito" })
    );

    expect(
      screen.getByText("Bitcoin no es favorito")
    ).toBeInTheDocument();
  });
});
