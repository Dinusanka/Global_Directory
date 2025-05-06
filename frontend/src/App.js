import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import SearchPage from './pages/serchPage';
import CountriesPage from './pages/countriesPage';
import FavoritesPage from './pages/favoritesPage';
import NotFound from './pages/notFount';
import CountryDetailPage from './pages/CountryDetailPage';

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage countries={countries} />} />
        <Route path="/countries" element={<CountriesPage countries={countries} toggleFavorite={toggleFavorite} />} />
      
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/country/:code" element={<CountryDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
