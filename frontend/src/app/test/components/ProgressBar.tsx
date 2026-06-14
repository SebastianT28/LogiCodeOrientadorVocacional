import { CATEGORIES } from '../data/testData';

interface ProgressBarProps {
    currentQ: number;
    totalQ: number;
}

export default function ProgressBar({ currentQ, totalQ }: ProgressBarProps) {
    const pct = ((currentQ) / totalQ * 100).toFixed(1);
    const validPct = Math.max(1, parseFloat(pct));

    return (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(139,30,30,0.08)]">
            <div className="flex justify-between items-center mb-2.5">
                <div className="text-[0.85rem] text-gray-500 font-medium">Tu progreso</div>
                <div className="font-poppins text-[0.9rem] font-bold text-utpRed">
                    {currentQ + 1} de {totalQ}
                </div>
            </div>
            
            <div className="h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-utpRed to-[#B83232] rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${validPct}%` }}
                ></div>
            </div>
            
            <div className="flex gap-1 mt-1.5">
                {CATEGORIES.map((c, i) => {
                    const start = i * 10;
                    const end = start + 10;
                    let bgColor = 'bg-[#E8E8E8]';
                    if (currentQ >= end) {
                        bgColor = 'bg-utpRed';
                    } else if (currentQ >= start) {
                        bgColor = 'bg-[#B83232]';
                    }
                    
                    return (
                        <div 
                            key={c.id} 
                            className={`flex-1 h-[3px] rounded-sm transition-colors duration-300 ${bgColor}`}
                            title={c.label}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
