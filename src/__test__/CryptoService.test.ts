
import { describe, it, expect, vi, afterEach } from "vitest";
import { cargarCriptomonedas } from "../services/CryptoService";

describe("Servicio de criptomonedas", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("devuelve los datos cuando la respuesta es exitosa", async () => {
    const datos = {
      bitcoin: { usd: 90000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => datos,
      })
    );

    const resultado = await cargarCriptomonedas();

    expect(resultado).toHaveLength(3);
    expect(resultado[0]).toEqual({
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 90000,
    });
  });

  it("muestra un error cuando la respuesta HTTP falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    await expect(cargarCriptomonedas()).rejects.toThrow(
      "Error al obtener los precios."
    );
  });
});
