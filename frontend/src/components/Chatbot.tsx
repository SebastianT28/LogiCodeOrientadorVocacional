"use client";

import { useState } from "react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { sender: "bot", text: "Hola, soy OrientaBot. Puedo ayudarte a explorar carreras y orientarte vocacionalmente. ¿En qué te puedo ayudar?" }
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        
        // Agregar mensaje del usuario
        setChatHistory(prev => [...prev, { sender: "user", text: message }]);
        setMessage("");

        // Simular respuesta del bot (luego lo conectarás con tu IA real)
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: "bot", text: "Estoy procesando tu consulta para darte la mejor orientación..." }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Ventana de Chat */}
            {isOpen && (
                <div className="w-[300px] sm:w-[320px] bg-[#F4F5F7] rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 border border-gray-200 transition-all duration-300 transform origin-bottom-right">
                    
                    {/* Header */}
                    <div className="bg-[#202020] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-utpRed rounded-full flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a2 2 0 0 1 2 2v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2V9a2 2 0 0 1 2-2h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zM6 9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6zm3 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm tracking-wide">OrientaBot</h3>
                                <p className="text-utpRed text-xs font-semibold">En línea</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cuerpo de Mensajes */}
                    <div className="flex-1 p-4 h-[420px] overflow-y-auto flex flex-col gap-4">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-utpRed text-white rounded-2xl rounded-br-none' : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Input */}
                    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Escribe tu pregunta..."
                            className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-utpRed text-gray-700"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            onClick={handleSend}
                            className="w-11 h-11 bg-utpRed rounded-xl flex items-center justify-center text-white hover:bg-utpDarkRed transition-colors shadow-md flex-shrink-0"
                            aria-label="Enviar mensaje"
                        >
                            {/* Ícono de enviar centrado visualmente */}
                            <svg className="w-5 h-5 transform -translate-x-[1px] translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Botón Flotante Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 bg-utpRed text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                aria-label="Alternar Chatbot"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a2 2 0 0 1 2 2v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2V9a2 2 0 0 1 2-2h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zM6 9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6zm3 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
