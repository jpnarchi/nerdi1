import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ incidents }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Verificar carga de Leaflet
    const checkLeafletLoaded = () => {
      if (window.L) {
        setMapLoaded(true);
      } else {
        setLoadError(true);
      }
    };

    // Manejar errores de carga
    window.addEventListener('error', (event) => {
      if (event.message.includes('Leaflet')) {
        setLoadError(true);
      }
    });

    // Intentar cargar Leaflet
    if (typeof window.L === 'undefined') {
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      leafletScript.async = true;
      leafletScript.onload = checkLeafletLoaded;
      leafletScript.onerror = () => setLoadError(true);
      document.body.appendChild(leafletScript);
    } else {
      checkLeafletLoaded();
    }

    return () => {
      // Limpiar listeners
      window.removeEventListener('error', () => {});
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || loadError || !mapRef.current) return;

    try {
      const L = window.L;
      
      if (!L) {
        console.error('Leaflet no se ha cargado correctamente');
        setLoadError(true);
        return;
      }

      const map = L.map(mapRef.current).setView([4.7110, -74.0721], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Resto de la lógica de marcadores...
      incidents.forEach(incident => {
        if (incident.coordinates) {
          const markerColor = incident.severity === 'Alto' ? 'red' : 'orange';
          const icon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div class="relative">
                <div style="background-color:${markerColor};width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">
                  ${incident.type[0]}
                </div>
                <div class="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  ${incident.severity === 'Alto' ? '!' : ''}
                </div>
              </div>
            `,
            iconSize: [30, 30]
          });

          const marker = L.marker(incident.coordinates, { icon }).addTo(map);
          
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-orange-500 text-lg">${incident.type}</h3>
              <p class="text-gray-700">${incident.description}</p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-sm ${incident.severity === 'Alto' ? 'text-red-500' : 'text-yellow-500'} font-bold">
                  Severidad: ${incident.severity}
                </span>
                <span class="text-xs text-gray-500">${incident.date}</span>
              </div>
            </div>
          `, {
            maxWidth: 300
          });
        }
      });

      return () => {
        map.remove();
      };
    } catch (error) {
      console.error('Error al cargar el mapa:', error);
      setLoadError(true);
    }
  }, [mapLoaded, incidents, loadError]);

  if (loadError) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-red-100">
        <div className="text-center">
          <p className="text-red-500 font-bold">Error al cargar el mapa</p>
          <p className="text-gray-600">Por favor, recarga la página o verifica tu conexión</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[70vh] rounded-lg shadow-lg border-4 border-orange-500"
    />
  );
};

export default MapComponent;

// DONE