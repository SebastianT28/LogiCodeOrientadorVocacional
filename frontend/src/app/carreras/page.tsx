"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Categoria {
    id: number;
    nombre: string;
    imagen: string;
    svgPath: string;
}

interface Carrera {
    id: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    sucursales: string[];
}

export default function CarrerasPage() {
    const [selectedCategory, setSelectedCategory] = useState<number | "Todas">("Todas");
    const [selectedSucursal, setSelectedSucursal] = useState<string>("Todas");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        Promise.all([
            fetch(`${apiUrl}/api/categorias`).then(r => r.json()),
            fetch(`${apiUrl}/api/carreras`).then(r => r.json()),
        ]).then(([cats, cars]) => {
            setCategorias(cats);
            setCarreras(cars);
        }).catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Filter careers by both category and sucursal
    const filteredCareers = carreras.filter(carrera => {
        const matchesCategory = selectedCategory === "Todas" || carrera.categoriaId === selectedCategory;
        const matchesSucursal = selectedSucursal === "Todas" || carrera.sucursales.includes(selectedSucursal);
        return matchesCategory && matchesSucursal;
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slateLight">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-utpRed border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm font-medium">Cargando carreras...</p>
                </div>
            </div>
        );
    }

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
                            href="/test"
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
                        <Link href="/test" onClick={toggleMenu} className="text-center bg-utpRed hover:bg-utpDarkRed text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all shadow-md">
                            Comenzar Test →
                        </Link>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {/* Hero Banner */}
                <section className="relative bg-charcoal py-20 overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <p className="text-xs md:text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">CATÁLOGO COMPLETO</p>
                        <h1 className="text-4xl md:text-6xl font-black text-white font-serif mb-6 leading-tight">
                            Explora nuestras Carreras
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                            Filtra por área de interés o sede y encuentra el programa académico que mejor se adapte a tu perfil y aspiraciones.
                        </p>
                    </div>
                </section>

                {/* Filter and Grid Section */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
                    {/* Filters Bar */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-10 flex flex-col gap-6">
                        {/* Category filter */}
                        <div>
                            <div className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                                Filtrar por Área de Interés:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory("Todas")}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${selectedCategory === "Todas"
                                        ? "bg-utpRed text-white shadow-md shadow-red-500/20"
                                        : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    Todas las áreas
                                </button>
                                {categorias.map((cat) => {
                                    const isActive = selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${isActive
                                                ? "bg-utpRed text-white shadow-md shadow-red-500/20"
                                                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            <svg className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={cat.svgPath} />
                                            </svg>
                                            {cat.nombre}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Branch filter */}
                        <div>
                            <div className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                                Filtrar por Sede (Sucursal):
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["Todas", "Lima", "Arequipa"].map((sucursal) => {
                                    const isActive = selectedSucursal === sucursal;
                                    return (
                                        <button
                                            key={sucursal}
                                            onClick={() => setSelectedSucursal(sucursal)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${isActive
                                                ? "bg-utpRed text-white shadow-md shadow-red-500/20"
                                                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {sucursal === "Todas" ? "Todas las sedes" : `Sede ${sucursal}`}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Careers Grid */}
                    {filteredCareers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCareers.map((carrera) => {
                                const categoryInfo = categorias.find(cat => cat.id === carrera.categoriaId);
                                return (
                                    <div
                                        key={carrera.id}
                                        id={`career-card-${carrera.id}`}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200/80 transition-all duration-300 flex flex-col h-full"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            <img
                                                id={`career-img-${carrera.id}`}
                                                src={carrera.imagen}
                                                alt={carrera.nombre}
                                                className="w-full h-full object-cover transform scale-100 transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Sede tags */}
                                            <div className="absolute top-4 right-4 flex gap-1.5 flex-wrap">
                                                {carrera.sucursales.map((suc) => (
                                                    <span
                                                        key={suc}
                                                        className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                                    >
                                                        Sede {suc}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* Category Tag on Image */}
                                            {categoryInfo && (
                                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5 text-utpRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={categoryInfo.svgPath} />
                                                    </svg>
                                                    {categoryInfo.nombre}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-gray-900 font-serif mb-2.5 group-hover:text-utpRed transition-colors">
                                                {carrera.nombre}
                                            </h3>
                                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 font-light flex-grow">
                                                {carrera.descripcion}
                                            </p>
                                            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                    Duración: 5 años
                                                </span>
                                                <Link
                                                    href={`/carreras/carrera/${carrera.id}`}
                                                    className="inline-flex items-center text-xs font-bold text-utpRed hover:text-utpDarkRed transition-colors cursor-pointer group/btn"
                                                >
                                                    Conocer más
                                                    <svg className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="bg-white rounded-3xl py-20 px-6 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                            <div className="p-4 bg-red-50 rounded-full text-utpRed mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h4>
                            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
                                Intenta seleccionar otra sede u otra área de conocimiento.
                            </p>
                            <button
                                onClick={() => { setSelectedCategory("Todas"); setSelectedSucursal("Todas"); }}
                                className="bg-utpRed hover:bg-utpDarkRed text-white text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-md"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
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
