import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      
      <!-- Top level navigation -->
      <Navbar />
      
      <!-- Main Content Outlet Area -->
      <main style={{ minHeight: 'calc(100vh - 400px)', paddingTop: '130px' }}>
        <Outlet />
      </main>
      
      <!-- B2B WhatsApp floating support -->
      <WhatsAppButton />
      
      <!-- Footer -->
      <Footer />
    </>
  );
};

export default MainLayout;
