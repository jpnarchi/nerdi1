import React, { useState, useRef } from 'react';

const IncidentReportModal = ({ isOpen, onClose, onReportSubmit }) => {
  const [reportData, setReportData] = useState({
    id: Date.now(),
    type: '',
    description: '',
    location: '',
    coordinates: null,
    locality: '',
    suspectDescription: '',
    mediaFiles: [],
    severity: '',
    date: new Date().toISOString().split('T')[0]
  });

  const mapRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setReportData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...validFiles]
    }));
  };

  const handleMapClick = (e) => {
    const L = window.L;
    const map = L.map(mapRef.current);
    const clickedLocation = map.mouseEventToLatLng(e);
    
    setReportData(prev => ({
      ...prev,
      coordinates: [clickedLocation.lat, clickedLocation.lng],
      location: `${clickedLocation.lat.toFixed(4)}, ${clickedLocation.lng.toFixed(4)}`
    }));
  };

  const handleSubmit = () => {
    // Validaciones
    if (!reportData.type || !reportData.description || !reportData.location) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Obtener reportes existentes
    const existingReports = JSON.parse(localStorage.getItem('securitteReports') || '[]');
    
    // Agregar nuevo reporte
    const updatedReports = [...existingReports, reportData];
    
    // Guardar en localStorage
    localStorage.setItem('securitteReports', JSON.stringify(updatedReports));

    // Limpiar formulario
    setReportData({
      id: Date.now(),
      type: '',
      description: '',
      location: '',
      coordinates: null,
      locality: '',
      suspectDescription: '',
      mediaFiles: [],
      severity: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Cerrar modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-black to-gray-800 p-6 rounded-t-2xl">
          <h2 className="text-white text-2xl font-bold text-center flex items-center justify-center">
            Reportar Incidente
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Columna de Formulario */}
          <div className="space-y-4">
            <select 
              value={reportData.type}
              onChange={(e) => setReportData(prev => ({...prev, type: e.target.value}))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition"
              required
            >
              <option value="">Tipo de Incidente</option>
              <option value="Robo">Robo</option>
              <option value="Hurto">Hurto</option>
              <option value="Amenaza">Amenaza</option>
            </select>

            <select 
              value={reportData.severity}
              onChange={(e) => setReportData(prev => ({...prev, severity: e.target.value}))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition"
              required
            >
              <option value="">Nivel de Severidad</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>

            <input 
              type="text"
              placeholder="Ubicación Exacta"
              value={reportData.location}
              onChange={(e) => setReportData(prev => ({...prev, location: e.target.value}))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition"
              required
            />

            <textarea 
              placeholder="Descripción detallada del incidente"
              value={reportData.description}
              onChange={(e) => setReportData(prev => ({...prev, description: e.target.value}))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg h-24 focus:border-orange-500 transition"
              required
            />

            <input 
              type="text"
              placeholder="Descripción de los sospechosos"
              value={reportData.suspectDescription}
              onChange={(e) => setReportData(prev => ({...prev, suspectDescription: e.target.value}))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition"
            />
          </div>

          {/* Columna de Mapa */}
          <div>
            <div 
              ref={mapRef}
              className="w-full h-[400px] bg-gray-200 rounded-lg"
              onClick={handleMapClick}
            >
              {/* Mapa interactivo para selección de ubicación */}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Haz clic en el mapa para seleccionar la ubicación exacta
              </p>
              {reportData.coordinates && (
                <p className="mt-2 text-orange-500">
                  Ubicación seleccionada: {reportData.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Archivos */}
        <div className="p-6 border-t">
          <div className="border-2 border-dashed border-orange-300 p-6 text-center rounded-lg">
            <input 
              type="file" 
              multiple 
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              id="mediaUpload"
            />
            <label 
              htmlFor="mediaUpload" 
              className="cursor-pointer text-orange-500 hover:text-orange-600 flex items-center justify-center"
            >
              Subir Fotos/Videos
            </label>
            {reportData.mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {reportData.mediaFiles.map((media) => (
                  <img 
                    key={media.id} 
                    src={media.preview} 
                    alt="Preview" 
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="p-6 flex justify-between space-x-4">
          <button 
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition transform hover:scale-105"
          >
            Enviar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportModal;