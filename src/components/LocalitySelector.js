import React from 'react';

const BogotaLocalities = [
  'Usaquén', 'Chapinero', 'Santa Fe', 'Candelaria', 
  'Teusaquillo', 'Mártires', 'Antonio Nariño', 'Puente Aranda', 
  'La Candelaria', 'Rafael Uribe Uribe', 'Ciudad Bolívar', 
  'Kennedy', 'Fontibón', 'Engativá', 'Suba', 'Barrios Unidos'
];

const LocalitySelector = ({ onSelectLocality }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold text-orange-500 mb-4">Seleccionar Localidad</h2>
      <div className="grid grid-cols-3 gap-2">
        {BogotaLocalities.map((locality) => (
          <button
            key={locality}
            onClick={() => onSelectLocality(locality)}
            className="bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 px-3 py-2 rounded-lg text-sm transition"
          >
            {locality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocalitySelector;