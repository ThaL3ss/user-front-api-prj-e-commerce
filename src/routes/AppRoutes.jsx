import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<Home />} />

      <Route
        path="/catalogo"
        element={<h1>Catálogo em desenvolvimento...</h1>}
      />
    </Routes>
  );
}