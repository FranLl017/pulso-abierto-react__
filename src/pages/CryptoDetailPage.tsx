
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { cargarCriptomonedas } from "../services/CryptoService";
import type { Crypto } from "../types/crypto";
import { useFavoritesStore } from "../store/favoritesStore";

function CryptoDetailPage() {
  const { id } = useParams();

  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const esFavorito = useFavoritesStore(
    (state) => state.favoritos.includes(id ?? "")
  );

  const alternarFavorito = useFavoritesStore(
    (state) => state.alternarFavorito
  );

  useEffect(() => {
    async function consultarDetalle() {
      try {
        setLoading(true);
        setError("");

        const cryptos = await cargarCriptomonedas();

        const resultado = cryptos.find(
          (item) => item.id === id
        );

        if (resultado) {
          setCrypto(resultado);
        } else {
          setCrypto(null);
        }
      } catch {
        setError("No se pudo obtener la información.");
      } finally {
        setLoading(false);
      }
    }

    Promise.resolve().then(() => {
      void consultarDetalle();
    });
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <p role="status">Cargando detalle...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <h1>No se pudo cargar el detalle</h1>

        <p role="alert">{error}</p>

        <Link className="detail-link" to="/">
          Volver al inicio
        </Link>
      </main>
    );
  }

  if (!crypto) {
    return (
      <main className="container">
        <h1>Criptomoneda no encontrada</h1>

        <p>
          No existe una criptomoneda con el identificador
          solicitado.
        </p>

        <Link className="detail-link" to="/">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>{crypto.name}</h1>
        <p>Información de la criptomoneda seleccionada.</p>
      </header>

      <section className="crypto-section detail-section">
        <h2>Detalle de {crypto.name}</h2>

        <div className="detail-information">
          <p>
            <strong>Nombre:</strong> {crypto.name}
          </p>

          <p>
            <strong>Símbolo:</strong> {crypto.symbol}
          </p>

          <p>
            <strong>Identificador:</strong> {crypto.id}
          </p>

          <p>
            <strong>Precio actual:</strong> USD $
            {crypto.price.toLocaleString("en-US")}
          </p>
        </div>

        <button
          onClick={() => alternarFavorito(crypto.id)}
          aria-pressed={esFavorito}
        >
          {esFavorito
            ? "★ Quitar de favoritos"
            : "☆ Agregar a favoritos"}
        </button>

        <Link className="detail-link" to="/">
          Volver al mercado
        </Link>
      </section>

      <footer className="footer">
        <p>Datos proporcionados por CoinGecko.</p>
      </footer>
    </main>
  );
}

export default CryptoDetailPage;
