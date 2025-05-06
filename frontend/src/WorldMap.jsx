import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
      })
      .catch((error) => {
        console.error("Error loading GeoJSON data", error);
      });
  }, []);

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.name;
    layer.bindPopup(countryName);
    layer.on({
      click: () => fetchCountryData(countryName),
      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.7 }),
      mouseout: (e) => e.target.setStyle({ fillOpacity: 0.5 }),
    });
  };

  const fetchCountryData = async (name) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await response.json();
      setSelectedCountry(data[0]);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Ensure this MapContainer has the right size */}
      <MapContainer
        center={[20, 0]} 
        zoom={2} 
        className="h-full w-3/4"
        style={{ height: '100%', width: '75%' }}  // Ensuring inline height/width for map
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Check if GeoJSON data exists before rendering */}
        {geoData && (
          <GeoJSON data={geoData} onEachFeature={onEachCountry} style={{ fillColor: "#3388ff", weight: 1 }} />
        )}
      </MapContainer>

      {/* Country Details Section */}
      {selectedCountry && (
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-bold">{selectedCountry.name.common}</h2>
          <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} className="w-full my-2" />
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
