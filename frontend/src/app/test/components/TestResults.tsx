import { useEffect, useState } from 'react';
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
    Home,
    Trophy,
    MapPin,
    ShieldCheck,
    ShieldAlert,
    Shield,
    Download,
    History,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { generateVocationalPDF } from '../utils/generatePDF';

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

interface HistoryItem {
    id: string;
    date: string;
    scores: Record<string, number>;
    topKey: string;
    top5: { key: string, pct: number }[];
    confidence: {
        level: string;
        text: string;
    };
}

export default function TestResults({ scores, onRestart }: TestResultsProps) {
    const [view, setView] = useState<'current' | 'history' | 'compare'>('current');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [compareId, setCompareId] = useState<string | null>(null);

    const calculateStats = (inputScores: Record<string, number>) => {
        const total = Object.values(inputScores).reduce((a, b) => a + b, 0) || 1;
        const pcts: Record<string, number> = {};
        Object.keys(inputScores).forEach(k => {
            pcts[k] = Math.round((inputScores[k] / total) * 100);
        });

        const sorted = Object.entries(pcts).sort((a, b) => b[1] - a[1]);
        const topKey = sorted[0][0];
        const top5 = sorted.slice(0, 5);

        const values = Object.values(inputScores);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const max = Math.max(...values);
        const confidenceScore = max - avg;

        let confidenceLevel = "Exploratoria";
        let confidenceText = "Se identificaron intereses compartidos entre varias áreas académicas. Te sugerimos explorar ampliamente estas opciones.";
        let ConfidenceIcon = ShieldAlert;

        if (confidenceScore >= 12) {
            confidenceLevel = "Alta";
            confidenceText = "Tus respuestas fueron consistentes durante todo el proceso, mostrando una inclinación muy clara.";
            ConfidenceIcon = ShieldCheck;
        } else if (confidenceScore >= 6) {
            confidenceLevel = "Media";
            confidenceText = "Tus respuestas mostraron tendencias claras, con algunos intereses en áreas complementarias.";
            ConfidenceIcon = Shield;
        }

        return { pcts, sorted, topKey, top5, confidenceLevel, confidenceText, ConfidenceIcon };
    };

    const currentStats = calculateStats(scores);
    const profile = PROFILES[currentStats.topKey];

    useEffect(() => {
        // Save current result to history
        const savedHistory = localStorage.getItem('vocationalHistory');
        let parsedHistory: HistoryItem[] = savedHistory ? JSON.parse(savedHistory) : [];

        // Prevent duplicate saves on strict mode double render by checking latest entry
        const isDuplicate = parsedHistory.length > 0 &&
            JSON.stringify(parsedHistory[0].scores) === JSON.stringify(scores);

        if (!isDuplicate) {
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                scores,
                topKey: currentStats.topKey,
                top5: currentStats.top5.map(([k, p]) => ({ key: k, pct: p })),
                confidence: {
                    level: currentStats.confidenceLevel,
                    text: currentStats.confidenceText
                }
            };
            parsedHistory = [newItem, ...parsedHistory];
            localStorage.setItem('vocationalHistory', JSON.stringify(parsedHistory));
        }
        setHistory(parsedHistory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownloadPDF = () => {
        generateVocationalPDF({
            profileName: profile.name,
            profileDesc: profile.desc,
            strengths: profile.tags,
            top5: currentStats.top5.map(([key, pct]) => ({
                name: CAREERS[key].careers[0].name,
                faculty: CAREERS[key].name,
                pct
            })),
            date: new Date().toLocaleDateString('es-PE')
        });
    };

    const handleDownloadHistoryPDF = (item: HistoryItem) => {
        const itemProfile = PROFILES[item.topKey];
        generateVocationalPDF({
            profileName: itemProfile.name,
            profileDesc: itemProfile.desc,
            strengths: itemProfile.tags,
            top5: item.top5.map(c => ({
                name: CAREERS[c.key].careers[0].name,
                faculty: CAREERS[c.key].name,
                pct: c.pct
            })),
            date: item.date
        });
    };

    const radarData = {
        labels: ['Ingeniería', 'Negocios', 'Derecho', 'Salud', 'Arquitectura', 'Comunicación', 'Educación'],
        datasets: [
            {
                label: 'Tu perfil',
                data: ['ing', 'neg', 'der', 'sal', 'arq', 'com', 'edu'].map(k => currentStats.pcts[k] || 0),
                backgroundColor: 'rgba(200,16,46,0.15)',
                borderColor: '#C8102E',
                borderWidth: 2.5,
                pointBackgroundColor: '#C8102E',
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

    const areaNames: Record<string, string> = {
        ing: 'Ingeniería', neg: 'Negocios', der: 'Derecho', sal: 'Salud',
        arq: 'Arquitectura', com: 'Comunicación', edu: 'Educación'
    };

    const barData = {
        labels: currentStats.sorted.map(([k]) => areaNames[k]),
        datasets: [
            {
                label: 'Afinidad %',
                data: currentStats.sorted.map(([, v]) => v),
                backgroundColor: currentStats.sorted.map((_, i) => i === 0 ? '#C8102E' : i < 3 ? '#A30D24' : '#DDA0A0'),
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
                max: Math.max(...currentStats.sorted.map(([, v]) => v)) + 10
            },
            y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
    };

    const fullAreaNames: Record<string, string> = {
        ing: 'Ingeniería', neg: 'Negocios', der: 'Derecho y CC. HH.', sal: 'Ciencias de la Salud',
        arq: 'Arquitectura y Diseño', com: 'Comunicaciones', edu: 'Educación'
    };

    if (view === 'compare' && compareId) {
        const compareItem = history.find(h => h.id === compareId);
        if (!compareItem) return null;

        const profileA = profile; // Current
        const profileB = PROFILES[compareItem.topKey];

        return (
            <div className="w-full max-w-[1100px] mx-auto py-8 px-6 animate-[fadeIn_0.5s_ease]">
                <button
                    onClick={() => setView('history')}
                    className="flex items-center gap-2 text-utpRed font-semibold mb-6 hover:-translate-x-1 transition-transform"
                >
                    <ArrowLeft className="w-5 h-5" /> Volver al historial
                </button>

                <h1 className="text-[2rem] font-bold font-poppins mb-8 flex items-center gap-3">
                    <History className="w-8 h-8 text-utpRed" /> Comparación de Perfiles
                </h1>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Intento Actual */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-utpRed/20 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-utpRed"></div>
                        <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Intento Actual</h2>
                        <div className="text-2xl font-bold font-poppins text-[#1C1C1C] mb-4">{profileA.name}</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {profileA.tags.slice(0, 3).map(t => (
                                <span key={t} className="text-xs bg-[#FDF0F0] text-utpRed px-2 py-1 rounded-md font-medium">{t}</span>
                            ))}
                        </div>
                        <h3 className="font-bold mb-3">Top 3 Carreras</h3>
                        <div className="flex flex-col gap-2">
                            {currentStats.top5.slice(0, 3).map(([k, p]) => (
                                <div key={k} className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg">
                                    <span className="font-medium text-gray-700">{CAREERS[k].careers[0].name}</span>
                                    <span className="text-utpRed font-bold">{p}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Intento Anterior */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300"></div>
                        <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Intento del {compareItem.date}</h2>
                        <div className="text-2xl font-bold font-poppins text-[#1C1C1C] mb-4">{profileB.name}</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {profileB.tags.slice(0, 3).map(t => (
                                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{t}</span>
                            ))}
                        </div>
                        <h3 className="font-bold mb-3">Top 3 Carreras</h3>
                        <div className="flex flex-col gap-2">
                            {compareItem.top5.slice(0, 3).map(c => (
                                <div key={c.key} className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg">
                                    <span className="font-medium text-gray-700">{CAREERS[c.key].careers[0].name}</span>
                                    <span className="text-gray-600 font-bold">{c.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[#FDF0F0] p-6 rounded-2xl text-utpDarkRed text-center max-w-2xl mx-auto">
                    {currentStats.topKey === compareItem.topKey ?
                        "¡Tu perfil se mantiene consistente! Tus intereses están bien definidos hacia " + profileA.name + "." :
                        "Tus intereses han evolucionado. Es normal que diferentes momentos de evaluación destaquen diferentes aspectos de tu personalidad."
                    }
                </div>
            </div>
        );
    }

    if (view === 'history') {
        return (
            <div className="w-full max-w-[1100px] mx-auto py-8 px-6 animate-[fadeIn_0.5s_ease]">
                <button
                    onClick={() => setView('current')}
                    className="flex items-center gap-2 text-utpRed font-semibold mb-6 hover:-translate-x-1 transition-transform"
                >
                    <ArrowLeft className="w-5 h-5" /> Volver a mis resultados
                </button>

                <h1 className="text-[2rem] font-bold font-poppins mb-6">Mis Resultados Anteriores</h1>

                <div className="flex flex-col gap-4">
                    {history.map((item, idx) => {
                        const itemProfile = PROFILES[item.topKey];
                        const isCurrent = JSON.stringify(item.scores) === JSON.stringify(scores);
                        return (
                            <div key={item.id} className="bg-white rounded-2xl p-6 border border-[#E0E0E0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                                <div>
                                    <div className="text-gray-500 text-sm mb-1">{item.date} {isCurrent && <span className="ml-2 text-xs bg-[#FDF0F0] text-utpRed px-2 py-0.5 rounded-full font-bold">Último / Actual</span>}</div>
                                    <div className="text-xl font-bold font-poppins text-[#1C1C1C] mb-2">{itemProfile.name}</div>
                                    <div className="flex gap-2 flex-wrap">
                                        {item.top5.slice(0, 3).map((c) => (
                                            <span key={c.key} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                                                {CAREERS[c.key].careers[0].name} ({c.pct}%)
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    {!isCurrent && (
                                        <button
                                            onClick={() => {
                                                setCompareId(item.id);
                                                setView('compare');
                                            }}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-utpRed text-utpRed hover:bg-[#FDF0F0] py-2 px-4 rounded-lg font-semibold transition-colors"
                                        >
                                            <History className="w-4 h-4" /> Comparar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDownloadHistoryPDF(item)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F5F5F5] hover:bg-[#EAEAEA] text-[#1C1C1C] py-2 px-4 rounded-lg font-semibold transition-colors"
                                    >
                                        <Download className="w-4 h-4" /> PDF
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {history.length === 0 && (
                        <div className="text-gray-500 py-10 text-center">No hay resultados guardados todavía.</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1100px] mx-auto py-8 px-6 animate-[fadeIn_0.5s_ease]">
            {/* Header Result */}
            <div className="bg-gradient-to-br from-utpDarkRed to-utpRed rounded-[24px] p-10 text-white mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-16 left-[30%] w-[280px] h-[280px] bg-white/5 rounded-full"></div>

                <div className="relative z-10">
                    <p className="text-[0.78rem] font-bold tracking-[0.12em] uppercase opacity-70 mb-2">
                        Tu perfil vocacional principal
                    </p>
                    <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-4 font-poppins">
                        {profile?.name}
                    </h1>
                    <p className="text-[0.97rem] opacity-90 leading-[1.7] max-w-[600px]">
                        {profile?.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {profile?.tags.map(tag => (
                            <span key={tag} className="bg-white/20 border border-white/30 py-1.5 px-3.5 rounded-full text-[0.8rem] font-medium backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-6 md:mt-0 flex flex-col gap-3">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center justify-center gap-2 bg-white text-utpRed py-3 px-6 rounded-full font-bold transition-all hover:bg-gray-100 shadow-md"
                    >
                        <Download className="w-4 h-4" /> Descargar PDF
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 py-3 px-6 rounded-full font-bold transition-all hover:bg-white/20"
                    >
                        <History className="w-4 h-4" /> Mis Resultados
                    </button>
                </div>
            </div>

            {/* Confidence & Insight Box Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#FDF0F0] border border-[#8B1E1E1F] rounded-2xl p-6 flex flex-col justify-center">
                    <div className="font-poppins text-[0.9rem] font-bold text-utpDarkRed mb-2 flex items-center gap-2">
                        <currentStats.ConfidenceIcon className="w-5 h-5" /> Nivel de Confianza: {currentStats.confidenceLevel}
                    </div>
                    <p className="text-[0.9rem] text-utpDarkRed leading-[1.7] opacity-90">
                        {currentStats.confidenceText}
                    </p>
                </div>

                <div className="bg-[#FDF0F0] border border-[#8B1E1E1F] rounded-2xl p-6">
                    <div className="font-poppins text-[0.9rem] font-bold text-utpDarkRed mb-2 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" /> Interpretación personalizada
                    </div>
                    <p className="text-[0.9rem] text-utpDarkRed leading-[1.7] opacity-90">
                        {profile?.insight}
                    </p>
                </div>
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

            <h2 className="font-poppins text-[1.3rem] font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-utpRed" /> Top 5 carreras recomendadas
            </h2>
            <div className="flex flex-col gap-3 mb-8">
                {currentStats.top5.map(([key, pct], idx) => {
                    const faculty = CAREERS[key];
                    if (!faculty) return null;
                    const career = faculty.careers[0];
                    const rankColors = ['bg-utpRed', 'bg-[#A30D24]', 'bg-[#B83232]', 'bg-[#CC4444]', 'bg-[#DD6666]'];

                    return (
                        <div key={key} className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0] transition-all duration-300 hover:border-utpRed group">
                            <div className={`min-w-[36px] h-[36px] ${rankColors[idx] || 'bg-gray-400'} text-white rounded-full flex items-center justify-center font-poppins font-bold text-[0.9rem]`}>
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <div className="font-poppins text-[1.05rem] font-semibold text-[#1C1C1C] mb-1">
                                    {career.name}
                                </div>
                                <div className="text-[0.85rem] text-gray-500 flex items-center gap-3">
                                    <span className="flex items-center gap-1">{faculty.emoji} {faculty.name}</span>
                                    <span className="flex items-center gap-1 text-utpRed bg-[#FDF0F0] px-2 py-0.5 rounded-md">
                                        <MapPin className="w-3 h-3" /> {career.sede}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 sm:hidden h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden w-24">
                                        <div className="h-full bg-utpRed rounded-full" style={{ width: `${pct}%` }}></div>
                                    </div>
                                    <div className="font-poppins font-bold text-[1.1rem] text-utpRed bg-[#FDF0F0] px-3 py-1.5 rounded-lg whitespace-nowrap">
                                        {pct}% Afinidad
                                    </div>
                                </div>
                                <Link
                                    href={`/carreras/carrera/${career.id}`}
                                    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-utpRed bg-white border border-utpRed py-1.5 px-4 rounded-lg transition-all hover:bg-utpRed hover:text-white group/btn"
                                >
                                    Conocer más <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                                </Link>
                            </div>
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
                    {currentStats.sorted.map(([key, pct]) => {
                        const faculty = CAREERS[key];
                        if (!faculty) return null;
                        return (
                            <div key={key} className="flex items-center gap-3">
                                <div className="text-[0.82rem] font-medium text-gray-500 min-w-[120px] sm:min-w-[160px] truncate flex items-center gap-1.5">
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
