import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import IncidentReportModal from './components/IncidentReportModal';
import LocalitySelector from './components/LocalitySelector';

function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLocalitySelectorOpen, setIsLocalitySelectorOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState(null);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('securitteReports') || '[]');
    setIncidents(storedReports);
  }, []);

  const handleReportSubmit = (newReport) => {
    const updatedIncidents = [...incidents, newReport];
    setIncidents(updatedIncidents);
    localStorage.setItem('securitteReports', JSON.stringify(updatedIncidents));
  };

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality);
    setIsLocalitySelectorOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        onReviewLocalities={() => setIsLocalitySelectorOpen(true)} 
      />
      <main className="container mx-auto px-4 py-6">
        {isLocalitySelectorOpen && (
          <LocalitySelector onSelectLocality={handleLocalitySelect} />
        )}
        
        <MapComponent 
          incidents={selectedLocality 
            ? incidents.filter(incident => incident.locality === selectedLocality) 
            : incidents
          } 
        />
        
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span>Reportar Zona Insegura</span>
          </button>
        </div>
        
        <IncidentReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)}
          onReportSubmit={handleReportSubmit}
        />
      </main>
    </div>
  );
}

export default App;

// DONE