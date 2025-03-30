import React, { useState } from 'react';

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="w-full h-[70vh] bg-gray-200 relative">
      <div className="absolute inset-0 flex items-center justify-center text-black">
        Mapa de Colombia (Placeholder)
      </div>
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-orange-500 font-bold">Detalles de Ubicación</h3>
          <p>{selectedLocation.name}</p>
        </div>
      )}
    </div>
  );
};

export default MapView;