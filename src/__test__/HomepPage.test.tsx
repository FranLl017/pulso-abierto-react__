
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { cargarCriptomonedas } from "../services/CryptoService";

vi.mock("../services/CryptoService", () => ({
  cargarCriptomonedas: vi.fn(),
}));

const datosPrueba = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 90000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3000,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 150,
  },
];

describe("Página principal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra los datos después de cargar", async () => {
    vi.mocked(cargarCriptomonedas).mockResolvedValue(datosPrueba);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Cargando precios..."
    );

    expect(
      await screen.findByRole("heading", { name: "Bitcoin" })
    ).toBeInTheDocument();
  });

  it("muestra un error y permite reintentar la consulta", async () => {
    const user = userEvent.setup();

    vi.mocked(cargarCriptomonedas)
      .mockRejectedValueOnce(new Error("Error de conexión"))
      .mockResolvedValueOnce(datosPrueba);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("No se pudieron cargar los precios.");

    await user.click(
      screen.getByRole("button", { name: "Volver a intentar" })
    );

    expect(
      await screen.findByRole("heading", { name: "Bitcoin" })
    ).toBeInTheDocument();

    expect(cargarCriptomonedas).toHaveBeenCalledTimes(2);
  });
});
