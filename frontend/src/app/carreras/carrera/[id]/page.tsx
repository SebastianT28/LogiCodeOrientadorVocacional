"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import categoriasData from "@/data/categorias.json";
import carrerasData from "@/data/carreras.json";

export default function CarreraDetailPage() {
    const params = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Parse the ID from params
    const careerId = params?.id ? parseInt(params.id as string, 10) : null;

    // Find current career
    const career = carrerasData.find(c => c.id === careerId);

    // Find its category
    const category = career ? categoriasData.find(cat => cat.id === career.categoriaId) : null;

    if (!career || !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slateLight px-4 text-center">
                <h1 className="text-4xl font-extrabold text-charcoal mb-4 font-serif">Carrera no encontrada</h1>
                <p className="text-gray-500 mb-8 max-w-md">La carrera profesional especificada no está registrada en nuestro sistema.</p>
                <Link href="/carreras" className="bg-utpRed hover:bg-utpDarkRed text-white font-semibold px-6 py-3 rounded-full transition-colors">
                    Ver todas las carreras
                </Link>
            </div>
        );
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-slateLight flex flex-col justify-between">
            {/* Header / Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-gray-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/logoUTP.png"
                            id="logo-img"
                            alt="Logo UTP"
                            className="h-10 w-auto object-contain imagen-negativa"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
                        <Link href="/" className="hover:text-utpRed transition-colors">Inicio</Link>
                        <Link href="/#areas" className="hover:text-utpRed transition-colors">Áreas</Link>
                        <Link href="/#testimonios" className="hover:text-utpRed transition-colors">Testimonios</Link>
                        <Link href="/#faq" className="hover:text-utpRed transition-colors">Preguntas</Link>
                    </nav>

                    {/* Action button */}
                    <div className="hidden md:block">
                        <Link
                            href="/#test"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-utpRed border border-utpRed text-white hover:bg-utpDarkRed shadow-md"
                        >
                            Comenzar Test
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-black/5 focus:outline-none transition-colors"
                        onClick={toggleMenu}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4">
                        <Link href="/" onClick={toggleMenu} className="text-gray-800 text-base font-semibold hover:text-utpRed transition-colors">Inicio</Link>
                        <Link href="/#areas" onClick={toggleMenu} className="text-gray-800 text-base font-semibold hover:text-utpRed transition-colors">Áreas de Conocimiento</Link>
                        <Link href="/#testimonios" onClick={toggleMenu} className="text-gray-800 text-base font-semibold hover:text-utpRed transition-colors">Testimonios</Link>
                        <Link href="/#faq" onClick={toggleMenu} className="text-gray-800 text-base font-semibold hover:text-utpRed transition-colors">Preguntas Frecuentes</Link>
                        <hr className="border-gray-100 my-2" />
                        <Link href="/#test" onClick={toggleMenu} className="text-center bg-utpRed hover:bg-utpDarkRed text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all shadow-md">
                            Comenzar Test →
                        </Link>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {/* Career Hero Banner */}
                <section className="relative h-[320px] md:h-[400px] bg-charcoal overflow-hidden flex items-end pb-12">
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30 z-10"></div>
                    <img 
                        src={career.imagen} 
                        alt={career.nombre}
                        className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000" 
                    />
                    <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full text-white">
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
                            <Link href="/" className="hover:text-utpRed transition-colors">Inicio</Link>
                            <span>/</span>
                            <Link href="/carreras" className="hover:text-utpRed transition-colors">Carreras</Link>
                            <span>/</span>
                            <Link href={`/carreras/categoria/${category.id}`} className="hover:text-utpRed transition-colors flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={category.svgPath} />
                                </svg>
                                {category.nombre}
                            </Link>
                        </div>

                        {/* Title & Sede tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {career.sucursales.map((suc) => (
                                <span
                                    key={suc}
                                    className="bg-utpRed text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-red-500/10"
                                >
                                    Sede {suc}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-serif leading-tight tracking-wide mb-4 text-white">
                            {career.nombre}
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl font-light leading-relaxed">
                            {career.descripcion}
                        </p>
                    </div>
                </section>

                {/* Details Section */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left/Main Column: Graduate Profile, Fields, Curriculum */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Graduate Profile */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl md:text-2xl font-bold font-serif text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="p-2 bg-red-50 rounded-xl text-utpRed inline-block">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </span>
                                    Perfil del Egresado
                                </h2>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                                    {career.perfilEgresado}
                                </p>
                            </div>

                            {/* Campo Laboral (Salidas Laborales) */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl md:text-2xl font-bold font-serif text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="p-2 bg-red-50 rounded-xl text-utpRed inline-block">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    Salidas Laborales
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {career.campoLaboral.map((rol, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-slateLight p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                                            <span className="text-utpRed mt-0.5">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span className="text-gray-700 text-xs md:text-sm font-semibold">{rol}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mini Malla Curricular */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold font-serif text-gray-900 flex items-center gap-2">
                                        <span className="p-2 bg-red-50 rounded-xl text-utpRed inline-block">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        Plan de Estudios Destacado
                                    </h2>
                                    <p className="text-gray-500 text-xs md:text-sm font-light mt-1.5">
                                        Malla curricular de referencia distribuida en ciclos clave de formación académica.
                                    </p>
                                </div>
                                <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-gray-100">
                                    {career.mallaCurricular.map((cicloObj, idx) => (
                                        <div key={idx} className="relative pl-12 flex flex-col md:flex-row md:items-start gap-4">
                                            {/* Timeline dot */}
                                            <div className="absolute left-3.5 top-1 w-5.5 h-5.5 rounded-full border-4 border-white bg-utpRed shadow-md flex items-center justify-center"></div>
                                            
                                            {/* Cycle header */}
                                            <div className="flex-shrink-0 md:w-28 text-sm font-bold text-utpRed uppercase tracking-wider pt-0.5">
                                                {cicloObj.ciclo}
                                            </div>

                                            {/* Courses list */}
                                            <div className="flex-grow bg-slateLight rounded-2xl p-4 border border-gray-100 flex flex-wrap gap-2">
                                                {cicloObj.cursos.map((curso, cIdx) => (
                                                    <span 
                                                        key={cIdx} 
                                                        className="bg-white border border-gray-200/60 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-medium hover:border-utpRed hover:text-utpRed transition-colors shadow-xs"
                                                    >
                                                        {curso}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sticky Info & Actions Sidebar */}
                        <div className="space-y-6 lg:sticky lg:top-28">
                            {/* General Stats Box */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col space-y-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2.5">
                                    Detalles del Programa
                                </h3>
                                <div className="flex justify-between items-center py-1.5 border-b border-gray-100/50">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duración:</span>
                                    <span className="text-sm font-bold text-gray-800">5 años (10 Semestres)</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-gray-100/50">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Acreditación:</span>
                                    <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                        SUNEDU
                                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex justify-between items-start py-1.5">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Sedes Disponibles:</span>
                                    <div className="flex flex-col items-end gap-1">
                                        {career.sucursales.map(suc => (
                                            <span key={suc} className="text-sm font-bold text-gray-800">Sede {suc}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Call to action Vocacional */}
                            <div className="bg-utpRed rounded-3xl p-6 text-white text-center shadow-lg shadow-red-500/10 flex flex-col items-center">
                                <div className="p-3.5 bg-white/10 rounded-2xl mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold font-serif mb-2">¿Es esta tu carrera ideal?</h4>
                                <p className="text-white/80 text-xs md:text-sm font-light mb-6 leading-relaxed max-w-xs">
                                    Resuelve tus dudas realizando nuestro test vocacional gratuito en solo 15 minutos.
                                </p>
                                <Link 
                                    href="/#test" 
                                    className="w-full bg-white hover:bg-gray-100 text-utpRed font-bold py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md block"
                                >
                                    Realizar Test Vocacional
                                </Link>
                            </div>

                            {/* Back Button */}
                            <Link 
                                href={`/carreras/categoria/${category.id}`} 
                                className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all text-center block"
                            >
                                Volver a {category.nombre}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
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
        </div>
    );
}
