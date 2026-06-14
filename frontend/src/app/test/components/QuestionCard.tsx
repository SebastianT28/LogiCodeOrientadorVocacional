import { useState, useEffect } from 'react';
import { Question, CATEGORIES } from '../data/testData';

interface QuestionCardProps {
    question: Question;
    currentQ: number;
    totalQ: number;
    currentAnswer: string | number | undefined;
    onAnswer: (answer: string | number) => void;
}

export default function QuestionCard({ question, currentQ, totalQ, currentAnswer, onAnswer }: QuestionCardProps) {
    const category = CATEGORIES.find(c => c.id === question.cat);

    // Estado local para drag and drop en preguntas tipo 'ranking'
    const [rankingItems, setRankingItems] = useState<string[]>([]);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

    // Inicializar ranking al cambiar de pregunta
    useEffect(() => {
        if (question.type === 'ranking' && question.opts) {
            setRankingItems(question.opts as string[]);
            
            const timer = setTimeout(() => {
                onAnswer('ranked');
            }, 100);
            return () => clearTimeout(timer);
        }
        // Usamos question.text o currentQ como dependencia para evitar que se reinicie
        // al actualizarse onAnswer tras el drag & drop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.text]);

    const handleDragStart = (e: React.DragEvent, idx: number) => {
        setDraggedIdx(idx);
        e.dataTransfer.effectAllowed = 'move';
        // Requerido por algunos navegadores (ej. Firefox) para activar el drag
        e.dataTransfer.setData('text/plain', idx.toString());
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necesario para permitir el drop
        e.dataTransfer.dropEffect = 'move';
    };
    
    const handleDrop = (e: React.DragEvent, targetIdx: number) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === targetIdx) return;
        
        const newItems = [...rankingItems];
        const itemToMove = newItems[draggedIdx];
        
        newItems.splice(draggedIdx, 1);
        // Insertarlo en la nueva posición. 
        // Si draggedIdx < targetIdx, el índice real en el array mutado disminuye en 1, 
        // por lo que insertarlo en targetIdx lo coloca justo después.
        newItems.splice(targetIdx, 0, itemToMove);
        
        setRankingItems(newItems);
        setDraggedIdx(null);
        onAnswer('ranked');
    };

    return (
        <div className="bg-white rounded-[24px] p-6 sm:p-10 shadow-[0_2px_12px_rgba(139,30,30,0.08)] border border-[#E0E0E0] animate-[slideIn_0.35s_ease] flex-1">
            <div className="inline-flex items-center gap-2 bg-[#FDF0F0] text-utpRed py-1.5 px-3.5 rounded-full text-[0.8rem] font-semibold mb-4 tracking-[0.03em]">
                {category?.icon} {category?.label}
            </div>
            
            <div className="text-[0.78rem] font-bold text-[#CCCCCC] tracking-[0.08em] uppercase mb-3">
                Pregunta {currentQ + 1} de {totalQ}
            </div>
            
            <div className="font-poppins text-[1.15rem] font-semibold text-[#1C1C1C] leading-[1.4] mb-8">
                {question.text}
            </div>

            {question.type === 'likert' && (
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-[0.75rem] text-gray-500 mb-1 font-medium px-2">
                        <span>Nada de acuerdo</span>
                        <span>Muy de acuerdo</span>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2.5 justify-center">
                        {[1, 2, 3, 4, 5].map((val) => {
                            const isSelected = currentAnswer === val;
                            const labels = ['Nada', 'Poco', 'Neutral', 'Bastante', 'Mucho'];
                            
                            return (
                                <div 
                                    key={val} 
                                    onClick={() => onAnswer(val)}
                                    className="flex flex-col items-center gap-1.5 cursor-pointer flex-1 max-w-[90px] group"
                                >
                                    <div className={`
                                        w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full border-2 flex items-center justify-center font-bold text-[0.85rem] sm:text-[0.95rem] transition-all duration-300
                                        ${isSelected 
                                            ? 'bg-utpRed border-utpRed text-white scale-110 shadow-[0_4px_16px_rgba(139,30,30,0.3)]' 
                                            : 'border-[#E0E0E0] bg-[#F5F5F5] text-gray-500 group-hover:border-utpRed group-hover:bg-[#FDF0F0] group-hover:text-utpRed group-hover:scale-105'
                                        }
                                    `}>
                                        {val}
                                    </div>
                                    <div className="text-[0.65rem] sm:text-[0.7rem] text-gray-500 text-center">
                                        {labels[val - 1]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {question.type === 'scenario' && question.opts && (
                <div className="flex flex-col gap-2.5">
                    {(question.opts as { l: string, t: string }[]).map((opt) => {
                        const isSelected = currentAnswer === opt.l;
                        return (
                            <button
                                key={opt.l}
                                onClick={() => onAnswer(opt.l)}
                                className={`
                                    text-left w-full border-2 rounded-2xl p-4 cursor-pointer flex items-start gap-3 transition-all duration-300 text-[0.92rem] leading-[1.5]
                                    ${isSelected
                                        ? 'border-utpRed bg-utpRed text-white font-medium shadow-[0_4px_16px_rgba(139,30,30,0.3)]'
                                        : 'border-[#E0E0E0] bg-[#F5F5F5] text-[#1C1C1C] hover:border-utpRed hover:bg-[#FDF0F0] hover:translate-x-1'
                                    }
                                `}
                            >
                                <span className={`
                                    min-w-[28px] h-[28px] border-2 rounded-lg flex items-center justify-center font-bold text-[0.8rem] transition-colors duration-300
                                    ${isSelected ? 'border-white bg-transparent text-white' : 'bg-white border-[#E0E0E0] text-gray-500'}
                                `}>
                                    {opt.l}
                                </span>
                                {opt.t}
                            </button>
                        );
                    })}
                </div>
            )}

            {question.type === 'ranking' && (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        {rankingItems.map((item, idx) => (
                            <div
                                key={item}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                className={`
                                    bg-white border-[1.5px] border-[#E0E0E0] rounded-lg py-3 px-4 flex items-center gap-3 cursor-grab transition-all duration-300 text-[0.9rem] font-medium text-[#1C1C1C] select-none hover:border-utpRed hover:shadow-[0_2px_12px_rgba(139,30,30,0.08)]
                                    ${draggedIdx === idx ? 'opacity-50' : ''}
                                `}
                            >
                                <span className="min-w-[28px] h-[28px] bg-utpRed text-white rounded-full flex items-center justify-center text-[0.78rem] font-bold">
                                    {idx + 1}
                                </span>
                                {item}
                            </div>
                        ))}
                    </div>
                    <p className="text-[0.78rem] text-gray-500 text-center mt-1.5">
                        Arrastra para reordenar según tu preferencia personal
                    </p>
                </div>
            )}

            <style jsx>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
