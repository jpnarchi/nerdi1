import React from 'react';

const Unknown = () => {
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-xl">
      <div className="flex items-center justify-center mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-orange-500"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      <h2 className="text-center text-xl font-bold text-orange-500 mb-4">
        Información No Disponible
      </h2>
      <p className="text-center text-gray-300">
        Esta sección aún está en desarrollo. Pronto tendrás más información.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
          Volver al Mapa
        </button>
        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-100 transition">
          Contactar Soporte
        </button>
      </div>
    </div>
  );
};

export default Unknown;

// DONE