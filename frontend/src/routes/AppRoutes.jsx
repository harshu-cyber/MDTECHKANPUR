import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import InfrastructurePage from '../pages/InfrastructurePage';
import ContactPage from '../pages/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Catch-all: redirect to Home */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
