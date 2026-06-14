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
                0: 'ing', 1: 'arq', 2: 'sal', 3: 'neg', 4: 'der',
                6: 'com', 7: 'edu', 8: 'ing', 9: 'der',
                10: 'ing', 11: 'com', 12: 'sal',
                14: 'neg', 15: 'arq', 16: 'ing', 17: 'edu',
                20: 'com', 21: 'ing', 22: 'ing',
                24: 'ing', 25: 'com', 26: 'neg', 27: 'neg', 28: 'neg', 29: 'arq',
                30: 'sal', 32: 'der', 33: 'arq', 34: 'ing', 35: 'neg',
                37: 'der', 38: 'neg', 39: 'edu',
                40: 'neg', 41: 'ing',
                43: 'neg', 44: 'der', 45: 'com', 46: 'ing',
                48: 'edu', 49: 'com', 50: 'ing',
                52: 'ing', 53: 'ing', 54: 'edu', 55: 'neg',
                57: 'sal', 58: 'com'
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
            setCurrentQ(currentQ + 1);
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
                </div>
            )}

            {phase === 'loading' && <LoadingScreen onComplete={() => setPhase('results')} />}

            {phase === 'results' && <TestResults scores={scores} onRestart={handleRestart} />}
        </div>
    );
}
