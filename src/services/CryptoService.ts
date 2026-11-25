
import type { Crypto } from "../types/crypto";

// Tipo de respuesta que devuelve CoinGecko
interface CryptoResponse {
  bitcoin: {
    usd: number;
  };
  ethereum: {
    usd: number;
  };
  solana: {
    usd: number;
  };
}

// Datos básicos de las criptomonedas
const criptomonedas = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
] as const;

// Función para consultar los precios
export async function cargarCriptomonedas(): Promise<Crypto[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
  );

  if (!response.ok) {
    throw new Error("Error al obtener los precios.");
  }

  const data: CryptoResponse = await response.json();

  // Organizar los resultados automáticamente
  return criptomonedas.map((crypto) => ({
    ...crypto,
    price: data[crypto.id].usd,
  }));
}
