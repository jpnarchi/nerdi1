import React, { useState } from 'react';

const incidentData = [
  {
    id: 1,
    lat: 4.7110,
    lng: -74.0721,
    type: 'Robo',
    count: 5,
    details: [
      { description: 'Robo de celular en transporte público', severity: 'Alto' },
      { description: 'Hurto en zona comercial', severity: 'Medio' }
    ]
  },
  {
    id: 2,
    lat: 4.6097,
    lng: -74.0817,
    type: 'Hurto',
    count: 3,
    details: [
      { description: 'Carterista en estación de Transmilenio', severity: 'Alto' }
    ]
  }
];

const AdvancedMapView = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div className="w-full h-[70vh] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="w-full h-full bg-map-placeholder opacity-20"></div>
        {incidentData.map(incident => (
          <div 
            key={incident.id}
            className="absolute transform transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            onClick={() => handleIncidentClick(incident)}
          >
            <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              {incident.count}
            </div>
          </div>
        ))}
      </div>

      {selectedIncident && (
        <div className="absolute bottom-4 left-4 bg-white p-6 rounded-xl shadow-2xl border-l-4 border-orange-500 w-80 transform transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-orange-500 font-bold text-xl">
              Detalles de Incidentes
            </h3>
            <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-sm">
              {selectedIncident.type}
            </span>
          </div>
          <div className="space-y-3">
            {selectedIncident.details.map((detail, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-gray-700">{detail.description}</p>
                <div className="flex items-center mt-2">
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-xs font-bold 
                      ${detail.severity === 'Alto' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-500'}
                    `}
                  >
                    Severidad: {detail.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedMapView;