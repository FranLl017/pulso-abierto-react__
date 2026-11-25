
import { useEffect, useState, useCallback } from "react";

import QueryControls from "../components/QueryControls";
import StatusMessage from "../components/StatusMessage";
import CryptoList from "../components/CryptoList";

import { cargarCriptomonedas } from "../services/CryptoService";
import type { Crypto, CryptoFilter } from "../types/crypto";

function HomePage() {
  // Datos de las criptomonedas
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  // Estados de la consulta
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Búsqueda y filtro
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CryptoFilter>("all");

  // Criptomoneda seleccionada
  const [selectedCrypto, setSelectedCrypto] =
    useState<Crypto | null>(null);

  // Consultar los precios
  const consultarPrecios = useCallback(async () => {
    try {
      const resultados = await cargarCriptomonedas();

      setCryptos(resultados);
      setError("");
    } catch {
      setError("No se pudieron cargar los precios.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Iniciar la consulta al cargar la página
  useEffect(() => {
    Promise.resolve().then(() => {
      void consultarPrecios();
    });
  }, [consultarPrecios]);

  // Reintentar la consulta
  async function reintentarConsulta() {
    setLoading(true);
    setError("");
    await consultarPrecios();
  }

  // Aplicar búsqueda y filtro
  function aplicarBusqueda(
    nuevaQuery: string,
    nuevoFiltro: CryptoFilter
  ) {
    setQuery(nuevaQuery);
    setFilter(nuevoFiltro);
  }

  // Filtrar criptomonedas
  const cryptosFiltradas = cryptos.filter((crypto) => {
    const coincideBusqueda = crypto.name
      .toLowerCase()
      .includes(query.toLowerCase());

    const coincideFiltro =
      filter === "all" || crypto.id === filter;

    return coincideBusqueda && coincideFiltro;
  });

  const cantidadResultados = cryptosFiltradas.length;

  return (
    <main className="container">
      <header className="header">
        <h1>Pulso Abierto</h1>
        <p>
          Consultá los precios actuales de las criptomonedas.
        </p>
      </header>

      <section className="crypto-section">
        <h2>Mercado de criptomonedas</h2>

        <QueryControls onSearch={aplicarBusqueda} />

        {/* Carga, error y ausencia de datos */}
        {loading ? (
          <StatusMessage
            loading={true}
            error=""
            isEmpty={false}
            onRetry={reintentarConsulta}
          />
        ) : error ? (
          <StatusMessage
            loading={false}
            error={error}
            isEmpty={false}
            onRetry={reintentarConsulta}
          />
        ) : cryptos.length === 0 ? (
          <StatusMessage
            loading={false}
            error=""
            isEmpty={true}
            onRetry={reintentarConsulta}
          />
        ) : (
          <>
            <p className="results-count">
              Resultados encontrados: {cantidadResultados}
            </p>

            <CryptoList
              cryptos={cryptosFiltradas}
              onSelect={setSelectedCrypto}
            />
          </>
        )}

        {/* Criptomoneda seleccionada */}
        {selectedCrypto && (
          <div className="selected-crypto" role="status">
            <p>
              Seleccionaste: {selectedCrypto.name}
            </p>

            <p>
              Precio: USD $
              {selectedCrypto.price.toLocaleString("en-US")}
            </p>

            <button onClick={() => setSelectedCrypto(null)}>
              Quitar selección
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>Datos proporcionados por CoinGecko.</p>
      </footer>
    </main>
  );
}

export default HomePage;
