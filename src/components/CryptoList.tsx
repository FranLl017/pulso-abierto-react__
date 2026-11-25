import type { Crypto } from "../types/crypto";
import CryptoCard from "./CryptoCard";

interface CryptoListProps {
  cryptos: Crypto[];
  onSelect: (crypto: Crypto) => void;
}

function CryptoList({ cryptos, onSelect }: CryptoListProps) {
  if (cryptos.length === 0) {
    return (
      <p role="status">
        No hay criptomonedas disponibles para mostrar.
      </p>
    );
  }

  return (
    <div className="crypto-list">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default CryptoList;