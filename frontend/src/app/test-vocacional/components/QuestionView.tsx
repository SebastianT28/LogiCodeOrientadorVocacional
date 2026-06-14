'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { QUESTIONS, CATEGORIES, type Question, type ScenarioOption } from '../data';

interface QuestionViewProps {
  currentQ: number;
  answers: Record<number, number | string>;
  onAnswer: (qi: number, value: number | string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function QuestionView({ currentQ, answers, onAnswer, onNext, onPrev }: QuestionViewProps) {
  const q: Question = QUESTIONS[currentQ];
  const cat = CATEGORIES.find((c) => c.id === q.cat)!;
  const total = QUESTIONS.length;
  const pct = Math.max(1, (currentQ / total) * 100);
  const hasAnswer = answers[currentQ] !== undefined;

  // Ranking drag-and-drop state
  const [rankOrder, setRankOrder] = useState<number[]>(() =>
    q.type === 'ranking' ? (q.opts as string[]).map((_, i) => i) : []
  );
  const dragSrcIdx = useRef<number | null>(null);

  // Reset rank order when question changes (handled by parent via key)

  const handleDragStart = (idx: number) => {
    dragSrcIdx.current = idx;
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (targetIdx: number) => {
    if (dragSrcIdx.current === null || dragSrcIdx.current === targetIdx) return;
    const newOrder = [...rankOrder];
    const [removed] = newOrder.splice(dragSrcIdx.current, 1);
    newOrder.splice(targetIdx, 0, removed);
    setRankOrder(newOrder);
    // Encode order as comma-separated original indices
    onAnswer(currentQ, newOrder.join(','));
    dragSrcIdx.current = null;
  };

  // Section dots
  const sections = CATEGORIES.map((_, i) => {
    const start = i * 10;
    const end = start + 10;
    if (currentQ >= end) return 'done';
    if (currentQ >= start) return 'active';
    return 'idle';
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* NAV */}
      <nav className="bg-white border-b border-[#E0E0E0] px-8 h-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#8B1E1E] rounded-[10px] flex items-center justify-center text-lg">🎓</div>
          <span className="font-poppins font-semibold text-[1.05rem] text-[#1C1C1C]">Orientación Vocacional</span>
        </Link>
        <span className="bg-[#FDF0F0] text-[#8B1E1E] text-xs font-semibold px-3 py-1 rounded-full tracking-wide">Test Oficial</span>
      </nav>

      {/* CONTENT */}
      <div className="max-w-[760px] mx-auto px-6 py-12 flex flex-col gap-8 min-h-[calc(100vh-64px)]">

        {/* PROGRESS BAR */}
        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-[#E0E0E0]">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-sm text-[#666] font-medium">Tu progreso</span>
            <span className="font-poppins text-sm font-bold text-[#8B1E1E]">{currentQ + 1} de {total}</span>
          </div>
          <div className="h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8B1E1E] to-[#B83232] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex gap-1 mt-2">
            {sections.map((s, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-full transition-colors duration-300 ${s === 'done' ? 'bg-[#8B1E1E]' : s === 'active' ? 'bg-[#B83232]' : 'bg-[#E8E8E8]'}`}
                title={CATEGORIES[i].label}
              />
            ))}
          </div>
        </div>

        {/* QUESTION CARD */}
        <div
          key={currentQ}
          className="bg-white rounded-3xl p-8 shadow-sm border border-[#E0E0E0] flex-1 animate-[slideIn_0.35s_ease]"
          style={{ animation: 'slideIn 0.35s ease' }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FDF0F0] text-[#8B1E1E] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            {cat.icon} {cat.label}
          </div>
          <p className="text-xs font-bold text-[#CCCCCC] tracking-widest uppercase mb-3">
            Pregunta {currentQ + 1} de {total}
          </p>
          <p className="font-poppins text-lg font-semibold text-[#1C1C1C] leading-snug mb-8">{q.text}</p>

          {/* LIKERT */}
          {q.type === 'likert' && (
            <div>
              <div className="flex justify-between text-xs text-[#666] font-medium mb-3 px-1">
                <span>Nada de acuerdo</span><span>Muy de acuerdo</span>
              </div>
              <div className="flex gap-2.5 justify-center">
                {[1, 2, 3, 4, 5].map((v) => {
                  const labels = ['Nada', 'Poco', 'Neutral', 'Bastante', 'Mucho'];
                  const selected = answers[currentQ] === v;
                  return (
                    <button
                      key={v}
                      onClick={() => onAnswer(currentQ, v)}
                      className="flex flex-col items-center gap-1.5 flex-1 max-w-[90px] group cursor-pointer"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center font-bold text-base transition-all duration-300
                        ${selected
                          ? 'bg-[#8B1E1E] border-[#8B1E1E] text-white scale-110 shadow-[0_4px_16px_rgba(139,30,30,0.3)]'
                          : 'bg-[#F5F5F5] border-[#E0E0E0] text-[#666] group-hover:border-[#8B1E1E] group-hover:bg-[#FDF0F0] group-hover:text-[#8B1E1E] group-hover:scale-105'
                        }`}>
                        {v}
                      </div>
                      <span className="text-[10px] text-[#666] text-center leading-tight">{labels[v - 1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCENARIO */}
          {q.type === 'scenario' && (
            <div className="flex flex-col gap-2.5">
              {(q.opts as ScenarioOption[]).map((opt) => {
                const selected = answers[currentQ] === opt.l;
                return (
                  <button
                    key={opt.l}
                    onClick={() => onAnswer(currentQ, opt.l)}
                    className={`flex items-start gap-3 px-5 py-4 rounded-2xl border-2 text-left text-sm leading-relaxed font-normal transition-all duration-300 cursor-pointer
                      ${selected
                        ? 'border-[#8B1E1E] bg-[#FDF0F0] text-[#5C1111] font-medium translate-x-0'
                        : 'border-[#E0E0E0] bg-[#F5F5F5] text-[#1C1C1C] hover:border-[#8B1E1E] hover:bg-[#FDF0F0] hover:translate-x-1'
                      }`}
                  >
                    <span className={`min-w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300
                      ${selected ? 'bg-[#8B1E1E] border-[#8B1E1E] text-white' : 'bg-white border-[#E0E0E0] text-[#666]'}`}>
                      {opt.l}
                    </span>
                    {opt.t}
                  </button>
                );
              })}
            </div>
          )}

          {/* RANKING */}
          {q.type === 'ranking' && (
            <div>
              <div className="flex flex-col gap-2">
                {rankOrder.map((originalIdx, displayIdx) => (
                  <div
                    key={originalIdx}
                    draggable
                    onDragStart={() => handleDragStart(displayIdx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(displayIdx)}
                    className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 py-3 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-[#8B1E1E] hover:shadow-sm select-none text-sm font-medium text-[#1C1C1C]"
                  >
                    <span className="min-w-7 h-7 bg-[#8B1E1E] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {displayIdx + 1}
                    </span>
                    {(q.opts as string[])[originalIdx]}
                    <svg className="w-4 h-4 text-[#CCCCCC] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#666] mt-3">Arrastra para reordenar según tu preferencia personal</p>
            </div>
          )}
        </div>

        {/* NAV BUTTONS */}
        <div className="flex items-center justify-between gap-4 pb-4">
          <button
            onClick={onPrev}
            className={`flex items-center gap-2 border-[1.5px] border-[#E0E0E0] px-6 py-3 rounded-full font-poppins text-sm font-semibold text-[#666] transition-all duration-300 hover:border-[#8B1E1E] hover:text-[#8B1E1E] ${currentQ === 0 ? 'invisible' : ''}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          <button
            onClick={onNext}
            disabled={!hasAnswer && q.type !== 'ranking'}
            className="ml-auto flex items-center gap-2 bg-[#8B1E1E] hover:bg-[#5C1111] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-white px-7 py-3 rounded-full font-poppins text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            {currentQ === total - 1 ? 'Ver resultados' : 'Siguiente'}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
