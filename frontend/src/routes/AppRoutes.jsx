import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AboutPage from '../pages/AboutPage';
import FounderPage from '../pages/FounderPage';
import ProductsPage from '../pages/ProductsPage';
import InfrastructurePage from '../pages/InfrastructurePage';
import ContactPage from '../pages/ContactPage';
import CareersPage from '../pages/CareersPage';
import AdminPage from '../pages/AdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone admin route outside of header/footer layout */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Primary website routes with Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        
        {/* Catch-all: redirect to Home */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
