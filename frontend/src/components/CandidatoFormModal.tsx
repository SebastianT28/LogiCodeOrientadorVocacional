'use client';

import { useState } from 'react';

interface CandidatoFormModalProps {
  onClose: () => void;
  onSuccess: (id: string) => void;
}

export default function CandidatoFormModal({ onClose, onSuccess }: CandidatoFormModalProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    sedeInteres: 'Lima',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nombres || !formData.apellidos || !formData.correo || !formData.telefono) {
      setErrorMsg('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/leads/candidato`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.text();
        setErrorMsg(`Error al registrar: ${errorData}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      onSuccess(data.id);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-poppins text-[#1C1C1C]">Regístrate para comenzar</h2>
          <p className="text-gray-500 text-sm mt-1">
            Déjanos tus datos para enviarte los resultados y ayudarte en tu orientación vocacional.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm border border-red-100 flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] outline-none"
                placeholder="Tus nombres"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] outline-none"
                placeholder="Tus apellidos"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] outline-none"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] outline-none"
              placeholder="Ej. 999 888 777"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sede de Interés</label>
            <select
              name="sedeInteres"
              value={formData.sedeInteres}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#8B1E1E] focus:border-[#8B1E1E] outline-none bg-white"
            >
              <option value="Lima">Lima</option>
              <option value="Arequipa">Arequipa</option>
              <option value="Chiclayo">Chiclayo</option>
              <option value="Piura">Piura</option>
              <option value="Huancayo">Huancayo</option>
              <option value="Ica">Ica</option>
              <option value="Chimbote">Chimbote</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B1E1E] hover:bg-[#5C1111] text-white font-semibold py-3 rounded-xl mt-2 transition-all duration-300 disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Empezar mi test'
            )}
          </button>
        </form>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
