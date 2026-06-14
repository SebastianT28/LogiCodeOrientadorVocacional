'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  '🔍 Evaluando intereses y motivaciones...',
  '🧬 Analizando rasgos de personalidad...',
  '💡 Identificando fortalezas...',
  '📊 Calculando afinidad por carreras...',
  '✅ Generando tu perfil vocacional...',
];

export default function LoadingView() {
  const [doneSteps, setDoneSteps] = useState<number[]>([]);

  useEffect(() => {
    STEPS.forEach((_, i) => {
      const timer = setTimeout(() => {
        setDoneSteps((prev) => [...prev, i]);
      }, (i + 1) * 600);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center gap-6 p-8 text-center">
      {/* Spinner */}
      <div className="w-16 h-16 rounded-full border-4 border-[#FDF0F0] border-t-[#8B1E1E] animate-spin" />

      <div>
        <p className="font-poppins text-[1.3rem] font-semibold text-[#1C1C1C] mb-2">Analizando tu perfil...</p>
        <p className="text-sm text-[#666] max-w-[300px]">Esto solo tomará un momento. Estamos procesando tus respuestas con cuidado.</p>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2 w-full max-w-[360px]">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 text-sm px-4 py-3 rounded-xl transition-all duration-500 ${doneSteps.includes(i)
                ? 'bg-[#FDF0F0] text-[#8B1E1E] font-medium'
                : 'bg-white text-[#666]'
              }`}
          >
            {doneSteps.includes(i)
              ? <span className="text-base">✓</span>
              : <span className="w-4 h-4 rounded-full border-2 border-[#E0E0E0] inline-block" />
            }
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
