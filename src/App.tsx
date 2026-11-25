
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CryptoDetailPage from "./pages/CryptoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/criptomonedas/:id"
        element={<CryptoDetailPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
