import { useState, useEffect } from 'react';
import { Search, Dna, Lightbulb, BarChart3, CheckCircle } from 'lucide-react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const STEPS = [
    { text: 'Evaluando intereses y motivaciones...', icon: Search },
    { text: 'Analizando rasgos de personalidad...', icon: Dna },
    { text: 'Identificando fortalezas...', icon: Lightbulb },
    { text: 'Calculando afinidad por carreras...', icon: BarChart3 },
    { text: 'Generando tu perfil vocacional...', icon: CheckCircle }
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [currentStep, setCurrentStep] = useState(-1);

    useEffect(() => {
        // Ejecutar los pasos progresivamente
        const timers: NodeJS.Timeout[] = [];
        
        STEPS.forEach((_, i) => {
            const timer = setTimeout(() => {
                setCurrentStep(i);
            }, (i + 1) * 600);
            timers.push(timer);
        });

        // Completar después de todos los pasos
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3800);
        timers.push(completeTimer);

        return () => {
            timers.forEach(t => clearTimeout(t));
        };
    }, [onComplete]);

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-6 p-8 text-center animate-[fadeIn_0.5s_ease]">
            <div className="w-16 h-16 border-4 border-[#FDF0F0] border-t-utpRed rounded-full animate-[spin_0.9s_linear_infinite]"></div>
            
            <div>
                <h2 className="font-poppins text-[1.3rem] font-semibold text-[#1C1C1C] mb-2">
                    Analizando tu perfil...
                </h2>
                <p className="text-[0.88rem] text-gray-500 max-w-[300px] mx-auto">
                    Esto solo tomará un momento. Estamos procesando tus respuestas con cuidado.
                </p>
            </div>
            
            <div className="flex flex-col gap-2 w-full max-w-[340px] mt-4">
                {STEPS.map((step, idx) => {
                    const isDone = currentStep >= idx;
                    const Icon = step.icon;
                    return (
                        <div 
                            key={idx}
                            className={`
                                flex items-center gap-3 text-[0.85rem] py-2.5 px-4 rounded-lg bg-white transition-all duration-300 shadow-sm
                                ${isDone ? 'text-utpRed bg-[#FDF0F0] font-medium border border-[#FDF0F0]' : 'text-gray-400 border border-transparent'}
                            `}
                        >
                            <span className={`flex justify-center transition-transform duration-300 ${isDone ? 'scale-110' : ''}`}>
                                <Icon className="w-4 h-4" />
                            </span>
                            {step.text}
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
