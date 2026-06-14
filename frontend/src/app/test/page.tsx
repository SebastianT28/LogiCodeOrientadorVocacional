"use client";

import { useState, useEffect } from 'react';
import { QUESTIONS } from './data/testData';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import LoadingScreen from './components/LoadingScreen';
import TestResults from './components/TestResults';
import CandidatoFormModal from '@/components/CandidatoFormModal';
import LandingView from './components/LandingView';

type Phase = 'landing' | 'test' | 'loading' | 'results';

export default function TestPage() {
    const [phase, setPhase] = useState<Phase>('landing');
    const [showModal, setShowModal] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [gamificationMsg, setGamificationMsg] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string | number>>({});
    const [scores, setScores] = useState<Record<string, number>>({
        ing: 0, neg: 0, der: 0, sal: 0, arq: 0, com: 0, edu: 0
    });

    const handleRestart = () => {
        setPhase('landing');
        setCurrentQ(0);
        setAnswers({});
        setScores({ ing: 0, neg: 0, der: 0, sal: 0, arq: 0, com: 0, edu: 0 });
    };

    const handleStartTestClick = () => {
        setShowModal(true);
    };

    const handleModalSuccess = (id: string) => {
        localStorage.setItem('candidatoId', id);
        setShowModal(false);
        setPhase('test');
    };

    const handleAnswer = (answer: string | number) => {
        setAnswers(prev => ({ ...prev, [currentQ]: answer }));
    };

    const computeScore = (qi: number) => {
        const q = QUESTIONS[qi];
        const ans = answers[qi];

        const newScores = { ...scores };

        if (q.type === 'likert') {
            const val = (typeof ans === 'number' ? ans : 3);
            const mapping: Record<number, string> = {
                0: 'ing',   // Sistemas y procesos
                1: 'arq',   // Artístico y visual
                2: 'sal',   // Biología y medicina
                4: 'com',   // Fenómenos sociales
                5: 'ing',   // Matemáticas y física
                6: 'com',   // Comunicación
                7: 'sal',   // Escuchar con empatía
                10: 'neg',  // Trabajo en equipo/Liderazgo
                11: 'ing',  // Metódico
                13: 'der',  // Estructura y rutinas
                14: 'arq',  // Imágenes y diseños
                15: 'sal',  // Impacto en vida y bienestar
                17: 'der',  // Justicia y ética
                19: 'edu',  // Aprendizaje continuo
                20: 'neg',  // Plazos ajustados y presión
                22: 'neg',  // Emprender negocio
                24: 'edu',  // Publicar conocimiento
                25: 'der',  // Oficina estructurada
                28: 'sal'   // Contacto con pacientes/clientes
            };
            const area = mapping[qi];
            if (area) newScores[area] += val;
        } else if (q.type === 'scenario') {
            if (ans && q.scores && typeof ans === 'string') {
                const area = q.scores[ans];
                if (area) newScores[area] += 4;
            }
        } else if (q.type === 'ranking') {
            if (q.maps) {
                q.maps.forEach((area, idx) => {
                    newScores[area] += (q.maps!.length - idx);
                });
            }
        }

        setScores(newScores);
    };

    const handleNext = () => {
        computeScore(currentQ);
        if (currentQ < QUESTIONS.length - 1) {
            if ((currentQ + 1) % 5 === 0) {
                const msgs = [
                    "¡Sección de Intereses completada, gran trabajo! Ahora que conocemos qué te apasiona, descubramos tus mayores talentos...",
                    "¡Excelente! Tus habilidades nos dicen mucho de ti. Pasemos a conocer más sobre tu personalidad...",
                    "¡Vas muy bien! Cada respuesta nos acerca a tu perfil ideal. Veamos qué valores guían tus decisiones...",
                    "¡Genial! Entender tus valores es clave. Ahora descubramos qué es lo que realmente te motiva...",
                    "¡Ya casi terminamos! Solo falta explorar qué tipo de entorno laboral es el ideal para ti..."
                ];
                const sectionIndex = Math.floor((currentQ + 1) / 5) - 1;
                if (sectionIndex >= 0 && sectionIndex < msgs.length) {
                    setGamificationMsg(msgs[sectionIndex]);
                } else {
                    setCurrentQ(currentQ + 1);
                }
            } else {
                setCurrentQ(currentQ + 1);
            }
            window.scrollTo(0, 0);
        } else {
            setPhase('loading');
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (currentQ > 0) {
            setCurrentQ(currentQ - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            {phase === 'landing' && (
                <>
                    <LandingView onStart={handleStartTestClick} />
                    {showModal && (
                        <CandidatoFormModal 
                            onClose={() => setShowModal(false)}
                            onSuccess={handleModalSuccess}
                        />
                    )}
                </>
            )}

            {phase === 'test' && (
                <div className="max-w-[760px] mx-auto py-12 px-6 min-h-[calc(100vh-64px)] flex flex-col gap-8">
                    {gamificationMsg ? (
                        <div className="flex flex-col items-center justify-center text-center py-20 animate-[fadeIn_0.5s_ease]">
                            <div className="w-20 h-20 bg-[#FDF0F0] text-utpRed rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                                ⭐
                            </div>
                            <h3 className="font-poppins text-3xl font-bold text-[#1C1C1C] mb-4">¡Gran progreso!</h3>
                            <p className="text-gray-600 text-[1.1rem] leading-relaxed max-w-lg mb-10">
                                {gamificationMsg}
                            </p>
                            <button
                                onClick={() => {
                                    setGamificationMsg(null);
                                    setCurrentQ(currentQ + 1);
                                    window.scrollTo(0, 0);
                                }}
                                className="bg-utpRed text-white py-3.5 px-8 rounded-full font-poppins font-semibold transition-all duration-300 hover:bg-utpDarkRed hover:-translate-y-1 shadow-md"
                            >
                                Continuar
                            </button>
                        </div>
                    ) : (
                        <>
                            <ProgressBar currentQ={currentQ} totalQ={QUESTIONS.length} />

                            <QuestionCard
                                question={QUESTIONS[currentQ]}
                                currentQ={currentQ}
                                totalQ={QUESTIONS.length}
                                currentAnswer={answers[currentQ]}
                                onAnswer={handleAnswer}
                            />

                            <div className="flex justify-between items-center gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        if (currentQ > 0) handlePrev();
                                        else window.location.href = '/';
                                    }}
                                    className={`
                                        flex items-center gap-2 bg-transparent border-2 border-[#E0E0E0] py-3 px-6 rounded-full font-poppins text-[0.9rem] font-semibold text-gray-500 transition-all duration-300 hover:border-utpRed hover:text-utpRed
                                    `}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                    {currentQ === 0 ? 'Regresar' : 'Anterior'}
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={answers[currentQ] === undefined && QUESTIONS[currentQ].type !== 'ranking'}
                                    className="flex items-center gap-2 bg-utpRed text-white border-none py-3 px-7 rounded-full font-poppins text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 ml-auto disabled:bg-[#CCCCCC] disabled:cursor-not-allowed hover:not(:disabled):bg-utpDarkRed hover:not(:disabled):-translate-y-0.5"
                                >
                                    Siguiente
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {phase === 'loading' && <LoadingScreen onComplete={() => setPhase('results')} />}

            {phase === 'results' && <TestResults scores={scores} onRestart={handleRestart} />}
        </div>
    );
}
