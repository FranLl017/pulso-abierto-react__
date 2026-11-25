
import { Link } from "react-router-dom";
import type { Crypto } from "../types/crypto";
import { useFavoritesStore } from "../store/favoritesStore";

interface CryptoCardProps {
  crypto: Crypto;
  onSelect: (crypto: Crypto) => void;
}

function CryptoCard({ crypto, onSelect }: CryptoCardProps) {
  const esFavorito = useFavoritesStore(
    (state) => state.favoritos.includes(crypto.id)
  );

  const alternarFavorito = useFavoritesStore(
    (state) => state.alternarFavorito
  );

  return (
    <article className="crypto-card">
      <h3>{crypto.name}</h3>

      <p>{crypto.symbol}</p>

      <p className="price">
        USD ${crypto.price.toLocaleString("en-US")}
      </p>

      <Link
        className="detail-link"
        to={`/criptomonedas/${crypto.id}`}
      >
        Ver detalle
      </Link>

      <button onClick={() => onSelect(crypto)}>
        Seleccionar
      </button>

      <button
        onClick={() => alternarFavorito(crypto.id)}
        aria-pressed={esFavorito}
      >
        {esFavorito ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>
    </article>
  );
}

export default CryptoCard;
