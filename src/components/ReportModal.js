import React, { useState } from 'react';

const ReportModal = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-orange-500 text-2xl font-bold mb-4">Nuevo Reporte</h2>
        <select 
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Selecciona tipo de incidente</option>
          <option value="robo">Robo</option>
          <option value="hurto">Hurto</option>
          <option value="amenaza">Amenaza</option>
        </select>
        <textarea 
          placeholder="Describe el incidente"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4 h-32"
        />
        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button 
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Enviar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;