import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (country) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.cca3 === country.cca3);
      if (exists) {
        return prev.filter((fav) => fav.cca3 !== country.cca3);
      } else {
        return [...prev, country];
      }
    });
  };

  const isFavorite = (country) => {
    return favorites.some((fav) => fav.cca3 === country.cca3);
  };

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
