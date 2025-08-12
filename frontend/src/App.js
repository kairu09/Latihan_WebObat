import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KatalogObat from './pages/KatalogObat';
import DetailObat from './pages/DetailObat';
import AdminObat from './pages/AdminObat';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    setIsAdminLoggedIn(adminStatus === 'true');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katalog-obat" element={<KatalogObat />} />
        <Route path="/katalog-obat/:id" element={<DetailObat />} />
        <Route 
          path="/admin/login" 
          element={<AdminLogin onLogin={setIsAdminLoggedIn} />} 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAuthenticated={isAdminLoggedIn}>
              <AdminObat onLogout={setIsAdminLoggedIn} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;