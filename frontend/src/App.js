import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/home';
import SearchPage from './pages/serchPage';
import CountriesPage from './pages/countriesPage';
import FavoritesPage from './pages/favoritesPage';
import NotFound from './pages/notFount';
import CountryDetailPage from './pages/CountryDetailPage';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';
import Signup from './auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  const toggleFavorite = (country) => {
    setFavorites((prev) =>
      prev.find((fav) => fav.cca3 === country.cca3)
        ? prev.filter((fav) => fav.cca3 !== country.cca3)
        : [...prev, country]
    );
  };

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchPage countries={countries} />} />
          <Route path="/countries" element={<CountriesPage countries={countries} toggleFavorite={toggleFavorite} />} />
          
          {/* 🔐 Protect favorites route */}
          <Route path="/favorites" element={
            <PrivateRoute>
              <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
            </PrivateRoute>
          } />

          <Route path="/country/:code" element={<CountryDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
         <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
