import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const MESSAGES = [
    "Interpretando tus respuestas...",
    "Comparando más de 40 perfiles profesionales...",
    "Detectando tus fortalezas predominantes...",
    "Buscando carreras compatibles...",
    "Preparando recomendaciones personalizadas..."
];

const SKILLS = [
    "Creatividad", "Liderazgo", "Tecnología", "Comunicación", "Investigación", "Innovación"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [msgIndex, setMsgIndex] = useState(0);
    const [dots, setDots] = useState<{ id: number, x: number, y: number, label: string }[]>([]);

    useEffect(() => {
        // Generar puntos iniciales (estrellas/habilidades)
        const newDots = SKILLS.map((skill, i) => ({
            id: i,
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 70 + 15, // 15% to 85%
            label: skill
        }));
        setDots(newDots);
    }, []);

    useEffect(() => {
        // Rotar mensajes
        const msgInterval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % MESSAGES.length);
        }, 1500);

        // Completar después de 8 segundos (6 a 8 seg requeridos)
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 7500);

        return () => {
            clearInterval(msgInterval);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="w-full min-h-screen bg-[#0F111A] relative overflow-hidden flex flex-col items-center justify-center p-8">
            {/* Constelación interactiva */}
            <div className="absolute inset-0 z-0 opacity-60">
                {dots.map((dot, i) => (
                    <motion.div
                        key={dot.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.4, duration: 1 }}
                        className="absolute flex flex-col items-center cursor-pointer"
                        style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                        whileHover={{ scale: 1.5 }}
                    >
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#FFFFFF]" />
                        <span className="text-white text-[10px] mt-2 tracking-widest uppercase opacity-70">
                            {dot.label}
                        </span>
                    </motion.div>
                ))}

                {/* Líneas conectoras (SVG) */}
                <svg className="w-full h-full absolute inset-0 pointer-events-none">
                    {dots.map((dot, i) => {
                        if (i === dots.length - 1) return null;
                        const nextDot = dots[i + 1];
                        return (
                            <motion.line
                                key={`line-${i}`}
                                x1={`${dot.x}%`}
                                y1={`${dot.y}%`}
                                x2={`${nextDot.x}%`}
                                y2={`${nextDot.y}%`}
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: i * 0.4 + 0.5, duration: 1.5 }}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Contenido Central */}
            <div className="relative z-10 text-center flex flex-col items-center">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center mb-8 relative"
                >
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="w-16 h-16 border-t-2 border-[#C8102E] rounded-full absolute"
                    />
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        className="w-8 h-8 bg-[#C8102E] rounded-full shadow-[0_0_20px_#C8102E]"
                    />
                </motion.div>

                <h2 className="font-poppins text-2xl md:text-3xl font-bold text-white mb-4">
                    Estamos analizando tu perfil vocacional...
                </h2>
                
                <p className="text-[#A0AEC0] text-sm md:text-base max-w-[600px] mb-8 leading-relaxed">
                    Estamos identificando tus intereses, habilidades, motivaciones y preferencias profesionales para brindarte recomendaciones personalizadas.
                </p>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 py-3 px-6 rounded-full overflow-hidden min-w-[300px]">
                    <motion.div
                        key={msgIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white text-sm font-medium tracking-wide"
                    >
                        {MESSAGES[msgIndex]}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
