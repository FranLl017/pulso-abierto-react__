export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export type CryptoFilter =
  | "all"
  | "bitcoin"
  | "ethereum"
  | "solana";