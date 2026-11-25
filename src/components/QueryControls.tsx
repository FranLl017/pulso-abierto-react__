
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";

import type { CryptoFilter } from "../types/crypto";

// Esquema de validación
const searchSchema = z.object({
  query: z.string().trim().min(2, "Ingresá al menos 2 caracteres."),
  filter: z.enum(["all", "bitcoin", "ethereum", "solana"], {
    error: "Seleccioná una opción válida.",
  }),
});

interface QueryControlsProps {
  onSearch: (query: string, filter: CryptoFilter) => void;
}

function QueryControls({ onSearch }: QueryControlsProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CryptoFilter>("all");

  const [queryError, setQueryError] = useState("");
  const [filterError, setFilterError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validar los datos ingresados
    const result = searchSchema.safeParse({
      query,
      filter,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setQueryError(errors.query?.[0] || "");
      setFilterError(errors.filter?.[0] || "");

      return;
    }

    // Si los datos son válidos, aplicar la búsqueda
    setQueryError("");
    setFilterError("");

    onSearch(result.data.query, result.data.filter);
  }

  return (
    <form className="search-controls" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="crypto-search">
          Buscar criptomoneda
        </label>

        <input
          id="crypto-search"
          type="text"
          placeholder="Ejemplo: Bitcoin..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-invalid={queryError !== ""}
          aria-describedby={queryError ? "query-error" : undefined}
        />

        {queryError && (
          <p id="query-error" role="alert">
            {queryError}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="crypto-filter">
          Filtrar por criptomoneda
        </label>

        <select
          id="crypto-filter"
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as CryptoFilter)
          }
          aria-invalid={filterError !== ""}
          aria-describedby={filterError ? "filter-error" : undefined}
        >
          <option value="all">Todas</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>

        {filterError && (
          <p id="filter-error" role="alert">
            {filterError}
          </p>
        )}
      </div>

      <button type="submit">
        Aplicar búsqueda
      </button>
    </form>
  );
}

export default QueryControls;
