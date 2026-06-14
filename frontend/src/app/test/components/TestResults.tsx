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
import { PROFILES, CAREERS } from '../data/testData';
import { 
    MessageCircle, 
    Info, 
    Hexagon, 
    BarChart3, 
    Landmark, 
    RotateCcw, 
    Home 
} from 'lucide-react';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

interface TestResultsProps {
    scores: Record<string, number>;
    onRestart: () => void;
}

export default function TestResults({ scores, onRestart }: TestResultsProps) {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    
    // Calcular porcentajes
    const pcts: Record<string, number> = {};
    Object.keys(scores).forEach(k => {
        pcts[k] = Math.round((scores[k] / total) * 100);
    });

    // Ordenar de mayor a menor afinidad
    const sorted = Object.entries(pcts).sort((a, b) => b[1] - a[1]);
    const topKey = sorted[0][0];
    const profile = PROFILES[topKey];

    // Datos para Gráfico Radar
    const radarData = {
        labels: ['Ingeniería', 'Negocios', 'Derecho', 'Salud', 'Arquitectura', 'Comunicación', 'Educación'],
        datasets: [
            {
                label: 'Tu perfil',
                data: ['ing', 'neg', 'der', 'sal', 'arq', 'com', 'edu'].map(k => pcts[k] || 0),
                backgroundColor: 'rgba(139,30,30,0.15)',
                borderColor: '#8B1E1E',
                borderWidth: 2.5,
                pointBackgroundColor: '#8B1E1E',
                pointRadius: 4,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            r: {
                beginAtZero: true,
                max: 35,
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.06)' },
                pointLabels: { font: { size: 10, family: 'Inter' }, color: '#666' }
            }
        }
    };

    // Datos para Gráfico de Barras
    const areaNames: Record<string, string> = { 
        ing: 'Ingeniería', neg: 'Negocios', der: 'Derecho', sal: 'Salud', 
        arq: 'Arquitectura', com: 'Comunicación', edu: 'Educación' 
    };
    
    const barData = {
        labels: sorted.map(([k]) => areaNames[k]),
        datasets: [
            {
                label: 'Afinidad %',
                data: sorted.map(([, v]) => v),
                backgroundColor: sorted.map((_, i) => i === 0 ? '#8B1E1E' : i < 3 ? '#B83232' : '#DDA0A0'),
                borderRadius: 6,
            },
        ],
    };

    const barOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { 
                grid: { color: 'rgba(0,0,0,0.04)' }, 
                ticks: { font: { size: 11 }, callback: (v: any) => v + '%' },
                max: Math.max(...sorted.map(([,v]) => v)) + 10 // Dar algo de margen
            },
            y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
    };

    const top5 = sorted.slice(0, 5);
    const fullAreaNames: Record<string, string> = { 
        ing: 'Ingeniería', neg: 'Negocios', der: 'Derecho y CC. HH.', sal: 'Ciencias de la Salud', 
        arq: 'Arquitectura y Diseño', com: 'Comunicaciones', edu: 'Educación' 
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto py-8 px-6 animate-[fadeIn_0.5s_ease]">
            {/* Header Result */}
            <div className="bg-gradient-to-br from-utpDarkRed to-utpRed rounded-[24px] p-10 text-white mb-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-16 left-[30%] w-[280px] h-[280px] bg-white/5 rounded-full"></div>
                
                <p className="text-[0.78rem] font-bold tracking-[0.12em] uppercase opacity-70 mb-2 relative z-10">
                    Tu perfil vocacional principal
                </p>
                <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-4 relative z-10 font-poppins">
                    {profile?.name}
                </h1>
                <p className="text-[0.97rem] opacity-90 leading-[1.7] max-w-[600px] relative z-10">
                    {profile?.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                    {profile?.tags.map(tag => (
                        <span key={tag} className="bg-white/20 border border-white/30 py-1.5 px-3.5 rounded-full text-[0.8rem] font-medium backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Insight Box */}
            <div className="bg-[#FDF0F0] border border-[#8B1E1E1F] rounded-2xl p-6 mb-8">
                <div className="font-poppins text-[0.9rem] font-bold text-utpDarkRed mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Interpretación personalizada
                </div>
                <p className="text-[0.9rem] text-utpDarkRed leading-[1.7] opacity-90">
                    {profile?.insight}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-white border border-[#E0E0E0] rounded-2xl py-5 px-6 mb-8 flex gap-3 items-start">
                <Info className="w-6 h-6 text-utpRed mt-0.5 shrink-0" />
                <p className="text-[0.82rem] text-gray-500 leading-[1.65]">
                    Este test es una <strong>herramienta de orientación y autoconocimiento</strong>, no una decisión definitiva. Los resultados reflejan tendencias basadas en tus respuestas actuales. Te recomendamos complementar esta información con la orientación de un consejero vocacional.
                </p>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0]">
                    <div className="font-poppins text-[0.95rem] font-bold text-[#1C1C1C] mb-5 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FDF0F0] text-utpRed rounded-lg flex items-center justify-center">
                            <Hexagon className="w-5 h-5" />
                        </div>
                        Radar de competencias
                    </div>
                    <div className="relative h-[280px]">
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0]">
                    <div className="font-poppins text-[0.95rem] font-bold text-[#1C1C1C] mb-5 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FDF0F0] text-utpRed rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        Afinidad por área
                    </div>
                    <div className="relative h-[280px]">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>

            <h2 className="font-poppins text-[1.3rem] font-bold text-[#1C1C1C] mb-4">
                🎯 Top 5 carreras recomendadas
            </h2>
            <div className="flex flex-col gap-2.5 mb-8">
                {top5.map(([key, pct], idx) => {
                    const faculty = CAREERS[key];
                    if (!faculty) return null;
                    const career = faculty.careers[0];
                    const rankColors = ['bg-utpRed', 'bg-[#B83232]', 'bg-[#CC4444]', 'bg-[#DD6666]', 'bg-[#E88888]'];
                    
                    return (
                        <div key={key} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0] transition-all duration-300 hover:translate-x-1.5 hover:border-utpRed group">
                            <div className={`min-w-[36px] h-[36px] ${rankColors[idx] || 'bg-gray-400'} text-white rounded-full flex items-center justify-center font-poppins font-bold text-[0.9rem]`}>
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <div className="font-poppins text-[0.97rem] font-semibold text-[#1C1C1C] mb-0.5">
                                    {career.name}
                                </div>
                                <div className="text-[0.8rem] text-gray-500">
                                    {faculty.emoji} {faculty.name}
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2.5 min-w-[120px]">
                                <div className="flex-1 h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-utpRed to-[#B83232] rounded-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                                </div>
                                <div className="font-poppins font-bold text-[0.9rem] text-utpRed min-w-[38px] text-right">
                                    {pct}%
                                </div>
                            </div>
                            <span className="hidden md:inline-block bg-[#FDF0F0] text-utpRed text-[0.7rem] font-bold py-1 px-2.5 rounded-full whitespace-nowrap">
                                {career.sede}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0] mb-12">
                <div className="font-poppins text-[0.95rem] font-bold text-[#1C1C1C] mb-5 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FDF0F0] text-utpRed rounded-lg flex items-center justify-center">
                        <Landmark className="w-5 h-5" />
                    </div>
                    Distribución por facultades
                </div>
                <div className="flex flex-col gap-3">
                    {sorted.map(([key, pct]) => {
                        const faculty = CAREERS[key];
                        if (!faculty) return null;
                        return (
                            <div key={key} className="flex items-center gap-3">
                                <div className="text-[0.82rem] font-medium text-gray-500 min-w-[120px] sm:min-w-[160px] truncate">
                                    {faculty.emoji} {fullAreaNames[key] || faculty.name}
                                </div>
                                <div className="flex-1 h-2.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-utpDarkRed to-[#B83232] rounded-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                                </div>
                                <div className="text-[0.82rem] font-bold text-utpRed min-w-[36px] text-right">
                                    {pct}%
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center gap-4 flex-wrap pb-12">
                <button 
                    onClick={onRestart}
                    className="inline-flex items-center gap-2 bg-white border-2 border-utpRed text-utpRed py-3 px-6 rounded-full font-poppins text-[0.9rem] font-semibold transition-all hover:bg-utpRed hover:text-white"
                >
                    <RotateCcw className="w-4 h-4" /> Repetir el test
                </button>
                <a 
                    href="/"
                    className="inline-flex items-center gap-2 bg-utpRed text-white py-3 px-6 rounded-full font-poppins text-[0.9rem] font-semibold transition-all hover:bg-utpDarkRed hover:-translate-y-0.5"
                >
                    <Home className="w-4 h-4" /> Volver al inicio
                </a>
            </div>
        </div>
    );
}
