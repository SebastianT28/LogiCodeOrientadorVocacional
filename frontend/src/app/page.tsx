"use client";

import { useState, useEffect } from "react";
import Chatbot from "@/components/Chatbot";

export default function Page() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const updateHeaderStyles = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", updateHeaderStyles);
        updateHeaderStyles(); // Ejecutar al inicio para validar estado inicial

        return () => window.removeEventListener("scroll", updateHeaderStyles);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <>
            {/* BARRA DE NAVEGACIÓN (HEADER) */}
            <header
                id="main-header"
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    isScrolled ? "bg-white shadow-md text-gray-800" : "bg-transparent text-white"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logotipo UTP */}
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <img
                            src="/logoUTP.png"
                            id="logo-img"
                            alt="Logo UTP"
                            className={`h-10 w-auto object-contain transition-all duration-300 ${
                                isScrolled ? "imagen-negativa" : ""
                            }`}
                        />
                    </a>

                    {/* Menú de Navegación Desktop */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
                        <a href="#inicio" className="hover:text-red-300 transition-colors">Inicio</a>
                        <a href="#areas" className="hover:text-red-300 transition-colors">Áreas</a>
                        <a href="#testimonios" className="hover:text-red-300 transition-colors">Testimonios</a>
                        <a href="#faq" className="hover:text-red-300 transition-colors">Preguntas</a>
                    </nav>

                    {/* Botón de Acción Desktop */}
                    <div className="hidden md:block">
                        <a
                            href="#test"
                            id="header-cta"
                            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md ${
                                isScrolled
                                    ? "bg-utpRed border border-utpRed text-white hover:bg-utpDarkRed hover:text-white"
                                    : "bg-transparent border border-white hover:bg-white hover:text-utpRed text-white"
                            }`}
                        >
                            Comenzar Test
                        </a>
                    </div>

                    {/* Botón Menú Hamburguesa Móvil */}
                    <button
                        id="mobile-menu-btn"
                        className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors"
                        aria-label="Abrir menú"
                        onClick={toggleMenu}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                id="menu-icon"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Menú Desplegable Móvil */}
                <div
                    id="mobile-menu"
                    className={`md:hidden absolute top-20 left-0 w-full bg-charcoal border-t border-white/10 shadow-xl py-6 px-6 flex flex-col space-y-4 transition-all duration-300 transform ${
                        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                >
                    <a href="#inicio" onClick={toggleMenu} className="mobile-link text-white text-base font-semibold hover:text-utpRed transition-colors">Inicio</a>
                    <a href="#areas" onClick={toggleMenu} className="mobile-link text-white text-base font-semibold hover:text-utpRed transition-colors">Áreas de Conocimiento</a>
                    <a href="#testimonios" onClick={toggleMenu} className="mobile-link text-white text-base font-semibold hover:text-utpRed transition-colors">Testimonios</a>
                    <a href="#faq" onClick={toggleMenu} className="mobile-link text-white text-base font-semibold hover:text-utpRed transition-colors">Preguntas Frecuentes</a>
                    <hr className="border-white/10 my-2" />
                    <a href="#test" onClick={toggleMenu} className="mobile-link text-center bg-utpRed hover:bg-utpDarkRed text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all shadow-md">
                        Comenzar Test →
                    </a>
                </div>
            </header>

            {/* SECCIÓN HERO */}
            <section id="inicio" className="relative min-h-screen pt-20 md:pt-0 flex flex-col md:flex-row bg-charcoal">
                {/* Columna Izquierda (Rojo Corporativo) */}
                <div className="w-full md:w-1/2 bg-utpRed flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 text-white relative z-10">
                    <div className="max-w-xl">
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-wider text-outline mb-4 select-none">
                            ORIENTA
                        </h1>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif mb-6">
                            Descubre tu camino profesional con claridad
                        </h2>
                        <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-10 font-light max-w-lg">
                            Un espacio pensado para ti, sin presiones, sin calificaciones. Evalúa carreras, realiza tu test
                            vocacional y escribe tu propio journey profesional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#test" className="inline-flex items-center justify-center bg-utpRed hover:bg-white hover:text-utpRed text-white border border-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg group">
                                Comenzar ahora
                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                            <a href="#areas" className="inline-flex items-center justify-center bg-charcoal hover:bg-black border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md">
                                Ver Carreras
                            </a>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha (Contenedor de Imagen de Laboratorio) */}
                <div className="w-full md:w-1/2 h-80 md:h-auto relative overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 bg-blue-900/10 z-10 pointer-events-none"></div>
                    <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000" alt="Estudiante realizando pruebas en un laboratorio con microscopio" className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 hover:scale-105" />
                </div>
            </section>

            {/* BARRA DE ESTADÍSTICAS */}
            <section className="bg-white py-12 border-b border-gray-100 relative z-20 -mt-1 md:-mt-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-3 bg-red-50 rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-6 w-6 text-utpRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">+40</span>
                            <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide mt-1">Carreras disponibles</span>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-3 bg-red-50 rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-6 w-6 text-utpRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">8,500+</span>
                            <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide mt-1">Estudiantes orientados</span>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-3 bg-red-50 rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-6 w-6 text-utpRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.253.58 1.802l-3.97 2.887a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.887a1 1 0 00-1.176 0l-3.97 2.887c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.97-2.887c-.78-.549-.38-1.802.58-1.802h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">95%</span>
                            <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide mt-1">Satisfacción reportada</span>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-3 bg-red-50 rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-6 w-6 text-utpRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl md:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">15 min</span>
                            <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide mt-1">Duración del test</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN: ÁREAS DE CONOCIMIENTO */}
            <section id="areas" className="py-20 md:py-28 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-xs md:text-sm font-semibold tracking-widest text-utpRed uppercase mb-2">EXPLORA SIN COMPROMISO</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-4">Áreas de conocimiento</h2>
                        <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Descubre las áreas disponibles. Cada una abre un mundo de posibilidades para tu futuro.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" alt="Circuito integrado electrónico de tecnología avanzada" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                Ingeniería & Tecnología
                            </div>
                        </div>
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600" alt="Doctor con estetoscopio trabajando en laptop" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Ciencias de la Salud
                            </div>
                        </div>
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600" alt="Grupo de estudiantes sentados abrazados viendo el atardecer" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                Ciencias Sociales
                            </div>
                        </div>
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600" alt="Profesionales analizando reportes financieros en escritorio" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Negocios & Administración
                            </div>
                        </div>
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600" alt="Pinceles, pinturas acrílicas y herramientas creativas de arte" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Arte & Humanidades
                            </div>
                        </div>
                        <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer hover-zoom hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                            <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600" alt="Fórmula matemática escrita en pizarra o frasco de química" className="w-full h-full object-cover" />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center text-white font-bold text-lg tracking-wide">
                                <svg className="w-5 h-5 mr-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                Ciencias Exactas
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-14">
                        <a href="#carreras" className="inline-flex items-center justify-center bg-utpRed hover:bg-utpDarkRed text-white px-8 py-3.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                            Explorar todas las carreras +
                        </a>
                    </div>
                </div>
            </section>

            {/* SECCIÓN: TESTIMONIOS DE ESTUDIANTES */}
            <section id="testimonios" className="py-24 md:py-32 bg-charcoal relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <h2 className="text-center text-4xl md:text-5xl font-bold text-white font-serif mb-16">
                        Testimonios de Estudiantes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-utpRed shadow-md transition-transform duration-300 group-hover:scale-105">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="Carlos Espinoza - Desarrollador de Software Lead" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-base font-serif">Carlos Espinoza</h3>
                                <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-2.5">
                                    Desarrollador de Software Lead
                                </span>
                                <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed font-light">
                                    "No sabía qué realmente era lo mío para toda la vida. Los resultados del test me dieron el
                                    empujón de confianza que necesitaba para dar el primer paso en la programación."
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-utpRed shadow-md transition-transform duration-300 group-hover:scale-105">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" alt="Valeria Mendoza - Médico Pediatra" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-base font-serif">Valeria Mendoza</h3>
                                <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-2.5">
                                    Médico Pediatra
                                </span>
                                <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed font-light">
                                    "Estaba entre Ingeniería y Medicina, totalmente confundida. El test vocacional me ayudó a
                                    entender que mi verdadera vocación está en el servicio humano y la pediatría. Hoy me levanto
                                    feliz de hacer lo que amo."
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-utpRed shadow-md transition-transform duration-300 group-hover:scale-105">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Alejandro Torres - Abogado (Derecho Ambiental)" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-base font-serif">Alejandro Torres</h3>
                                <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-2.5">
                                    Abogado (Derecho Ambiental)
                                </span>
                                <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed font-light">
                                    "Gracias al test pude descubrir mi pasión por defender el medio ambiente. Ahora soy
                                    consultor legal y ayudo a proteger los recursos naturales. Es una guía para alcanzar tu
                                    verdadero propósito."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN: PREGUNTAS FRECUENTES */}
            <section id="faq" className="py-24 md:py-32 bg-slateLight">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-xs md:text-sm font-semibold tracking-widest text-utpRed uppercase mb-2">¿TIENES DUDAS?</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Preguntas frecuentes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                question: "¿El test vocacional me obliga a elegir una universidad?",
                                answer: "No, en absoluto. El test tiene un propósito puramente orientativo para ayudarte a identificar tus fortalezas, áreas de interés y afinidades académicas. Eres completamente libre de elegir dónde, cuándo y qué estudiar en base a tus resultados."
                            },
                            {
                                question: "¿Cuánto tiempo toma el test?",
                                answer: "El test vocacional está optimizado para tomar aproximadamente 15 minutos en completarse. Consiste en preguntas rápidas, interactivas e intuitivas sobre tus preferencias profesionales, pasatiempos y materias escolares preferidas."
                            },
                            {
                                question: "¿La plataforma tiene algún costo?",
                                answer: "No, la herramienta de test y exploración de carreras de UTP ORIENTA es de libre acceso y 100% gratuita para alumnos de colegios, padres de familia y cualquier persona en búsqueda de su rumbo académico."
                            },
                            {
                                question: "¿Cómo funciona el journal vocacional?",
                                answer: "El journal vocacional actúa como un cuaderno digital integrado. A medida que realizas lecturas, exploras las áreas de conocimiento y haces el test, puedes escribir tus pensamientos, marcar carreras como favoritas y guardar un registro personalizado de tu proceso de decisión."
                            },
                            {
                                question: "¿Puedo ver más de una carrera antes de decidir?",
                                answer: "Totalmente. Puedes navegar por la biblioteca completa de carreras, comparar planes de estudio, ver la proyección laboral y los sueldos estimados para tantas disciplinas como desees antes de tomar una determinación."
                            },
                            {
                                question: "¿Qué tan confiables son los resultados del test?",
                                answer: "Los resultados de UTP ORIENTA se basan en un algoritmo psicométrico que cruza tus intereses con perfiles laborales validados por asesores educativos y psicólogos. Si bien no determina tu decisión final de forma inamovible, brinda un punto de partida sumamente confiable y estructurado."
                            }
                        ].map((faq, index) => (
                            <div key={index} className={`accordion-item border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-all duration-300 ${openFaqIndex === index ? 'active' : ''}`}>
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="accordion-header w-full px-6 py-5 flex justify-between items-center text-left text-gray-800 font-semibold hover:text-utpRed focus:outline-none transition-colors group"
                                >
                                    <span className="text-sm md:text-base pr-4">{faq.question}</span>
                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-utpRed transition-transform duration-300 flex-shrink-0 accordion-chevron ${openFaqIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className="accordion-content overflow-hidden bg-gray-50/50"
                                    style={{ maxHeight: openFaqIndex === index ? '300px' : '0px' }}
                                >
                                    <p className="px-6 pb-5 pt-2 text-gray-600 text-xs md:text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER (PIE DE PÁGINA) */}
            <footer className="bg-utpRed text-white py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold font-sans tracking-wide">Nuestras Redes</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a YouTube">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a LinkedIn">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                            </svg>
                        </a>
                        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a WhatsApp">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-3.488l.393.233c1.524.905 3.292 1.383 5.104 1.385 5.817 0 10.55-4.721 10.554-10.53.002-2.813-1.086-5.457-3.064-7.438A10.467 10.467 0 0 0 12.008 1.43c-5.82 0-10.555 4.722-10.56 10.53-.002 1.91.499 3.777 1.449 5.405l.255.441-.954 3.485 3.565-.935zM17.15 14.39c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.15-.64.15-.19.3-.73.91-.89 1.1-.16.19-.32.22-.6.08-1.16-.58-1.92-1.02-2.67-2.31-.2-.34.2-.31.56-1.03.06-.11.03-.22-.01-.32-.05-.1-.45-1.08-.62-1.48-.17-.4-.35-.35-.48-.35-.12 0-.27-.01-.42-.01-.15 0-.39.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2 1.93 2.35.11.01 2.2 3.37 5.33 4.73.74.32 1.33.52 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.06-.11-.23-.21-.51-.35z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a Instagram">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-utpRed transition-all duration-300" aria-label="Ir a TikTok">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.39-.4-.3-.76-.64-1.09-1.02v6.62c-.05 1.78-.65 3.59-1.95 4.79-1.39 1.3-3.44 1.94-5.34 1.74-2.11-.23-4.14-1.52-5.06-3.46-1.12-2.3-.64-5.36 1.25-7.14 1.43-1.37 3.53-1.9 5.43-1.45v4.14c-1.06-.32-2.3-.13-3.13.62-.77.7-.99 1.83-.63 2.78.36.93 1.35 1.55 2.33 1.48.97-.07 1.8-.81 1.93-1.78.02-.19.01-.39.01-.58V.02z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
            
            {/* CHATBOT IA */}
            <Chatbot />
        </>
    );
}
