import React from 'react';

const Header = ({ onReviewLocalities }) => {
  return (
    <header className="bg-black shadow-lg border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 rounded-full p-2 w-12 h-12 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
              />
            </svg>
          </div>
          <h1 
            className="text-3xl font-extrabold text-white tracking-tight uppercase"
            style={{fontFamily: 'Arial Black, sans-serif'}}
          >
            <span className="text-orange-500">Securitte</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <button 
            onClick={onReviewLocalities}
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Revisar por Zonas
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// DONE