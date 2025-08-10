import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KatalogObat from './pages/KatalogObat';
import DetailObat from './pages/DetailObat';
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katalog-obat" element={<KatalogObat />} />
        <Route path="/katalog-obat/:id" element={<DetailObat />} />
      </Routes>
    </Router>
  );
}

export default App;