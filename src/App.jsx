import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import CreateCV from '@/pages/CreateCV';
import BuyCredits from '@/pages/BuyCredits';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      document.documentElement.lang = lng;
    };
    i18n.on('languageChanged', handleLanguageChange);
    handleLanguageChange(i18n.language); 
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-cv" 
                  element={
                    <ProtectedRoute>
                      <CreateCV />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/buy-credits" 
                  element={
                    <ProtectedRoute>
                      <BuyCredits />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
