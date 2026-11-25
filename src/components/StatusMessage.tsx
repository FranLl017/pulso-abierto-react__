
interface StatusMessageProps {
  loading: boolean;
  error: string;
  isEmpty: boolean;
  onRetry: () => void;
}

function StatusMessage({
  loading,
  error,
  isEmpty,
  onRetry,
}: StatusMessageProps) {
  if (loading) {
    return (
      <p role="status">
        Cargando precios...
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button onClick={onRetry}>
          Volver a intentar
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <p role="status">
        No hay criptomonedas disponibles.
      </p>
    );
  }

  return null;
}

export default StatusMessage;
