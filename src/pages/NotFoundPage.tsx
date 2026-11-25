
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="container">
      <section className="crypto-section not-found">
        <h1>404 - Página no encontrada</h1>

        <p>
          La dirección que intentaste visitar no existe.
        </p>

        <Link className="detail-link" to="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
