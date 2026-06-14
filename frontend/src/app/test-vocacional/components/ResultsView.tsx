'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { CAREERS, PROFILES, AREA_NAMES, type Scores, type AreaKey } from '../data';

ChartJS.register(
  RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
);

interface ResultsViewProps {
  scores: Scores;
  onRestart: () => void;
  onGoHome: () => void;
}

export default function ResultsView({ scores, onRestart, onGoHome }: ResultsViewProps) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  const pcts = (Object.keys(scores) as AreaKey[]).reduce((acc, k) => {
    acc[k] = Math.round((scores[k] / total) * 100);
    return acc;
  }, {} as Record<AreaKey, number>);

  const sorted = (Object.entries(pcts) as [AreaKey, number][]).sort((a, b) => b[1] - a[1]);
  const topKey = sorted[0][0];
  const profile = PROFILES[topKey];

  // Radar
  const radarKeys: AreaKey[] = ['ing', 'neg', 'der', 'sal', 'arq', 'com', 'edu'];
  const radarData = {
    labels: radarKeys.map((k) => AREA_NAMES[k]),
    datasets: [{
      label: 'Tu perfil',
      data: radarKeys.map((k) => pcts[k] || 0),
      backgroundColor: 'rgba(139,30,30,0.15)',
      borderColor: '#8B1E1E',
      borderWidth: 2.5,
      pointBackgroundColor: '#8B1E1E',
      pointRadius: 4,
    }],
  };

  // Bar
  const barColors = sorted.map(([, v], i) => i === 0 ? '#8B1E1E' : i < 3 ? '#B83232' : '#DDA0A0');
  const barData = {
    labels: sorted.map(([k]) => AREA_NAMES[k]),
    datasets: [{
      label: 'Afinidad %',
      data: sorted.map(([, v]) => v),
      backgroundColor: barColors,
      borderRadius: 6,
    }],
  };

  const rankColors = ['bg-[#8B1E1E]', 'bg-[#B83232]', 'bg-[#CC4444]', 'bg-[#DD6666]', 'bg-[#E88888]'];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* NAV */}
      <nav className="bg-white border-b border-[#E0E0E0] px-8 h-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={onGoHome} className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#8B1E1E] rounded-[10px] flex items-center justify-center text-lg">🎓</div>
          <span className="font-poppins font-semibold text-[1.05rem] text-[#1C1C1C]">Orientación Vocacional</span>
        </button>
        <span className="bg-[#FDF0F0] text-[#8B1E1E] text-xs font-semibold px-3 py-1 rounded-full tracking-wide">Test Oficial</span>
      </nav>

      <div className="max-w-[1100px] mx-auto px-6 py-8">
        {/* RESULTS HEADER */}
        <div className="relative bg-gradient-to-br from-[#5C1111] to-[#8B1E1E] rounded-3xl p-10 text-white mb-8 overflow-hidden">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] bg-white/5 rounded-full" />
          <div className="absolute bottom-[-60px] left-[30%] w-[280px] h-[280px] bg-white/4 rounded-full" />
          <p className="text-xs font-bold tracking-[0.12em] uppercase opacity-70 mb-2 relative z-10">Tu perfil vocacional principal</p>
          <h1 className="font-poppins text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-4 relative z-10">{profile.name}</h1>
          <p className="text-[0.97rem] opacity-85 leading-relaxed max-w-[600px] relative z-10">{profile.desc}</p>
          <div className="flex flex-wrap gap-2 mt-6 relative z-10">
            {profile.tags.map((tag) => (
              <span key={tag} className="bg-white/18 border border-white/30 px-3.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* INSIGHT */}
        <div className="bg-[#FDF0F0] border border-[rgba(139,30,30,0.12)] rounded-2xl p-6 mb-8">
          <p className="font-poppins text-sm font-bold text-[#5C1111] mb-3 flex items-center gap-2">💬 Interpretación personalizada</p>
          <p className="text-sm text-[#5C1111] leading-relaxed opacity-90">{profile.insight}</p>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 mb-8 flex gap-3">
          <span className="text-xl mt-0.5">ℹ️</span>
          <p className="text-xs text-[#666] leading-relaxed">
            Este test es una <strong>herramienta de orientación y autoconocimiento</strong>, no una decisión definitiva. Los resultados reflejan tendencias basadas en tus respuestas actuales. Te recomendamos complementar esta información con la orientación de un consejero vocacional.
          </p>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0E0E0]">
            <div className="flex items-center gap-2 font-poppins font-bold text-[#1C1C1C] text-sm mb-4">
              <div className="w-7 h-7 bg-[#FDF0F0] rounded-lg flex items-center justify-center text-sm">🕸️</div>
              Radar de competencias
            </div>
            <div className="h-[280px]">
              <Radar
                data={radarData}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    r: {
                      beginAtZero: true, max: 35,
                      ticks: { display: false },
                      grid: { color: 'rgba(0,0,0,0.06)' },
                      pointLabels: { font: { size: 10, family: 'Inter' }, color: '#666' },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0E0E0]">
            <div className="flex items-center gap-2 font-poppins font-bold text-[#1C1C1C] text-sm mb-4">
              <div className="w-7 h-7 bg-[#FDF0F0] rounded-lg flex items-center justify-center text-sm">📊</div>
              Afinidad por área
            </div>
            <div className="h-[280px]">
              <Bar
                data={barData}
                options={{
                  indexAxis: 'y' as const,
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, callback: (v) => v + '%' } },
                    y: { grid: { display: false }, ticks: { font: { size: 11 } } },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* TOP 5 CAREERS */}
        <h2 className="font-poppins font-bold text-[1.3rem] text-[#1C1C1C] mb-4">🎯 Top 5 carreras recomendadas</h2>
        <div className="flex flex-col gap-3 mb-8">
          {sorted.slice(0, 5).map(([key, pct], idx) => {
            const faculty = CAREERS[key];
            const career = faculty.careers[0];
            return (
              <div key={key} className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 shadow-sm border border-[#E0E0E0] transition-all duration-300 hover:translate-x-1.5 hover:border-[#8B1E1E]">
                <div className={`min-w-9 h-9 ${rankColors[idx]} text-white rounded-full flex items-center justify-center font-poppins font-bold text-sm flex-shrink-0`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-poppins font-semibold text-[#1C1C1C] text-base mb-0.5">{career.name}</div>
                  <div className="text-sm text-[#666]">{faculty.emoji} {faculty.name}</div>
                </div>
                <div className="flex items-center gap-2.5 min-w-[130px]">
                  <div className="flex-1 h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8B1E1E] to-[#B83232] rounded-full transition-all duration-1500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-poppins font-bold text-[#8B1E1E] text-sm min-w-[38px] text-right">{pct}%</span>
                </div>
                <span className="bg-[#FDF0F0] text-[#8B1E1E] text-[0.7rem] font-bold px-2.5 py-1 rounded-full hidden sm:inline">
                  {career.sede}
                </span>
              </div>
            );
          })}
        </div>

        {/* FACULTY DISTRIBUTION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0E0E0] mb-8">
          <div className="flex items-center gap-2 font-poppins font-bold text-[#1C1C1C] text-sm mb-5">
            <div className="w-7 h-7 bg-[#FDF0F0] rounded-lg flex items-center justify-center text-sm">🏛️</div>
            Distribución por facultades
          </div>
          <div className="flex flex-col gap-3">
            {sorted.map(([key, pct]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-sm text-[#666] font-medium min-w-[160px] truncate text-xs md:text-sm">
                  {CAREERS[key].emoji} {AREA_NAMES[key]}
                </span>
                <div className="flex-1 h-2.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5C1111] to-[#B83232] rounded-full transition-all duration-1500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#8B1E1E] min-w-[36px] text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-center gap-4 flex-wrap pb-12">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 bg-white border-2 border-[#8B1E1E] text-[#8B1E1E] px-6 py-3 rounded-full font-poppins font-semibold text-sm transition-all duration-300 hover:bg-[#8B1E1E] hover:text-white"
          >
            🔄 Repetir el test
          </button>
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white px-6 py-3 rounded-full font-poppins font-semibold text-sm transition-all duration-300 hover:bg-[#5C1111]"
          >
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
