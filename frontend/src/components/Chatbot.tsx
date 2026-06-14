"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [sesionId, setSesionId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen]);

    useEffect(() => {
        const initSession = async () => {
            let token = localStorage.getItem("orienta_token");
            if (!token) {
                token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
                localStorage.setItem("orienta_token", token);
            }

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const res = await fetch(`${apiUrl}/api/chatbot/sesion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tokenNavegador: token })
                });

                if (res.ok) {
                    const sesion = await res.json();
                    setSesionId(sesion.id);

                    const historyRes = await fetch(`${apiUrl}/api/chatbot/sesion/${sesion.id}/mensajes`);
                    if (historyRes.ok) {
                        const mensajes = await historyRes.json();
                        if (mensajes && mensajes.length > 0) {
                            const formattedHistory: ChatMessage[] = [];
                            mensajes.forEach((m: any) => {
                                formattedHistory.push({ sender: 'user', text: m.contenidoUsuario });
                                formattedHistory.push({ sender: 'bot', text: m.respuestaBot });
                            });
                            setChatHistory(formattedHistory);
                        } else {
                            setChatHistory([{ sender: "bot", text: "Hola, soy Nora. Puedo ayudarte a explorar carreras y orientarte vocacionalmente. ¿En qué te puedo ayudar?" }]);
                        }
                    }
                }
            } catch (error) {
                console.error("Error al iniciar sesión de chatbot:", error);
                setChatHistory([{ sender: "bot", text: "Hola, soy Nora. Puedo ayudarte a explorar carreras y orientarte vocacionalmente. ¿En qué te puedo ayudar?" }]);
            }
        };

        initSession();
    }, []);

    const handleSend = async () => {
        if (!message.trim() || loading) return;
        
        const userMessage = message.trim();
        setMessage("");
        setChatHistory(prev => [...prev, { sender: "user", text: userMessage }]);
        setLoading(true);

        try {
            const geminiHistory = chatHistory.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                text: msg.text
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history: geminiHistory })
            });

            const data = await res.json();
            const botReply = data.reply || "Disculpa, tuve un error.";

            setChatHistory(prev => [...prev, { sender: "bot", text: botReply }]);

            if (sesionId) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                await fetch(`${apiUrl}/api/chatbot/sesion/${sesionId}/mensajes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mensajeUsuario: userMessage, respuestaBot: botReply })
                });
            }

        } catch (error) {
            console.error("Error en el chat:", error);
            setChatHistory(prev => [...prev, { sender: "bot", text: "Disculpa, hubo un problema de conexión. Intenta de nuevo." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="w-[300px] sm:w-[320px] h-[500px] max-h-[80vh] bg-[#F4F5F7] rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 border border-gray-200 transition-all duration-300 transform origin-bottom-right">
                    <div className="bg-[#202020] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-utpRed rounded-full flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a2 2 0 0 1 2 2v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2V9a2 2 0 0 1 2-2h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zM6 9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6zm3 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm tracking-wide">Nora</h3>
                                <p className="text-utpRed text-xs font-semibold">En línea</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-utpRed text-white rounded-2xl rounded-br-none' : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="max-w-[85%] px-4 py-3 text-sm shadow-sm bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Escribe tu pregunta..."
                            className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-utpRed text-gray-700"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading}
                            className="w-11 h-11 bg-utpRed rounded-xl flex items-center justify-center text-white hover:bg-utpDarkRed transition-colors shadow-md flex-shrink-0 disabled:opacity-50"
                            aria-label="Enviar mensaje"
                        >
                            <svg className="w-5 h-5 transform -translate-x-[1px] translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

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
