import Link from 'next/link';
import { 
  Brain, BarChart3, MapPin, Handshake, Zap, Compass, 
  Cpu, Briefcase, Scale, HeartPulse, Layers, Radio, BookOpen 
} from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* NAVBAR */}
      <nav className="h-16 border-b border-[#E0E0E0] px-6 flex items-center justify-between bg-white sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-[#8B1E1E] text-white rounded-lg flex items-center justify-center font-bold text-lg font-serif">O</div>
          <span className="font-poppins font-semibold text-[1.05rem] text-[#5C1111]">Orientación Vocacional</span>
        </Link>
        <span className="bg-[#FDF0F0] text-[#8B1E1E] text-xs font-semibold px-3 py-1 rounded-full tracking-wide">Test Oficial</span>
      </nav>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-16 min-h-[calc(100vh-64px)]">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FDF0F0] text-[#8B1E1E] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <span>✦</span> Test de Autoconocimiento
          </div>
          <h1 className="font-poppins text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] text-[#5C1111] mb-5">
            Descubre la carrera<br />que <span className="text-[#8B1E1E]">fue hecha</span><br />para ti
          </h1>
          <p className="text-[#666] text-[1.05rem] leading-relaxed mb-8 max-w-[480px]">
            Un test diseñado con base psicológica para ayudarte a explorar tus intereses, habilidades y valores, y orientarte hacia carreras que realmente conecten contigo.
          </p>
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              '60 preguntas cuidadosas',
              '10 minutos aproximadamente',
              'Resultados personalizados',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#666] font-medium">
                <div className="w-2 h-2 bg-[#8B1E1E] rounded-full" />
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2.5 bg-[#8B1E1E] hover:bg-[#5C1111] text-white px-8 py-4 rounded-full font-poppins font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(139,30,30,0.3)] group"
          >
            Comenzar mi test
            <svg className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right – decorative */}
        <div className="relative h-[480px] hidden md:flex items-center justify-center">
          <div className="w-[380px] h-[380px] bg-gradient-to-br from-[#FDF0F0] to-[#fce4e4] rounded-full flex items-center justify-center relative">
            <div className="w-[200px] h-[200px] bg-white rounded-full flex items-center justify-center text-utpRed shadow-[0_8px_40px_rgba(0,0,0,0.1)] z-[2]">
              <Compass className="w-20 h-20" />
            </div>
          </div>
          {/* Floating cards */}
          <div className="floating-card absolute top-10 -right-2 bg-white rounded-2xl px-4 py-3 shadow-[0_6px_24px_rgba(139,30,30,0.14)] text-sm font-semibold text-[#8B1E1E]"
            style={{ animation: 'float1 4s ease-in-out infinite' }}>🔬 Ciencias de la Salud</div>
          <div className="floating-card absolute bottom-14 -left-5 bg-white rounded-2xl px-4 py-3 shadow-[0_6px_24px_rgba(139,30,30,0.14)] text-sm font-semibold text-[#8B1E1E]"
            style={{ animation: 'float2 4.5s ease-in-out infinite' }}>⚖️ Derecho</div>
          <div className="floating-card absolute bottom-40 -right-8 bg-white rounded-2xl px-4 py-3 shadow-[0_6px_24px_rgba(139,30,30,0.14)] text-sm font-semibold text-[#8B1E1E]"
            style={{ animation: 'float1 3.8s ease-in-out infinite 0.5s' }}>🏗️ Arquitectura</div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-20 px-8">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#8B1E1E] mb-3">¿Por qué hacer este test?</p>
          <h2 className="font-poppins text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#5C1111] leading-tight mb-4">Un acompañamiento real para una decisión importante</h2>
          <p className="text-[#666] text-base">No te decimos qué carrera estudiar. Te ayudamos a descubrir quién eres y qué caminos se alinean con tus fortalezas.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1000px] mx-auto">
          {[
            { icon: <Brain className="w-8 h-8" />, title: 'Basado en psicología', text: 'Evalúa intereses, personalidad, valores y motivaciones con fundamento científico.' },
            { icon: <BarChart3 className="w-8 h-8" />, title: 'Dashboard visual', text: 'Gráficos de radar, barras y ranking de afinidad para que veas tus resultados de forma clara.' },
            { icon: <MapPin className="w-8 h-8" />, title: 'Carreras reales', text: 'Recomendaciones específicas con sedes en Lima y Arequipa.' },
            { icon: <Handshake className="w-8 h-8" />, title: 'Sin presión', text: 'Los resultados son orientaciones, no sentencias. Son un punto de partida.' },
            { icon: <Zap className="w-8 h-8" />, title: 'Rápido y claro', text: 'Solo 10 minutos para obtener un perfil vocacional completo.' },
          ].map((b) => (
            <div key={b.title} className="bg-[#F5F5F5] rounded-2xl p-6 text-center transition-all duration-300 border border-transparent hover:bg-white hover:border-[#FDF0F0] hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FDF0F0] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{b.icon}</div>
              <div className="font-poppins font-semibold text-[#5C1111] text-sm mb-2">{b.title}</div>
              <p className="text-xs text-[#666] leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AREAS */}
      <section className="py-20 px-8 bg-[#F5F5F5]">
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#8B1E1E] mb-3">Facultades evaluadas</p>
          <h2 className="font-poppins text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#5C1111]">7 áreas del conocimiento</h2>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center max-w-[800px] mx-auto">
          {[
            { icon: <Cpu className="w-4 h-4" />, label: 'Ingeniería' },
            { icon: <Briefcase className="w-4 h-4" />, label: 'Negocios' },
            { icon: <Scale className="w-4 h-4" />, label: 'Derecho y Ciencias Humanas' },
            { icon: <HeartPulse className="w-4 h-4" />, label: 'Ciencias de la Salud' },
            { icon: <Layers className="w-4 h-4" />, label: 'Arquitectura y Diseño' },
            { icon: <Radio className="w-4 h-4" />, label: 'Comunicaciones' },
            { icon: <BookOpen className="w-4 h-4" />, label: 'Educación' },
          ].map(({icon, label}) => (
            <div key={label} className="bg-white border border-[#E0E0E0] rounded-full px-5 py-2 text-sm font-medium text-[#666] flex items-center gap-2 transition-all duration-300 hover:bg-[#8B1E1E] hover:text-white hover:border-[#8B1E1E] group">
              <span className="text-utpRed group-hover:text-white transition-colors">{icon}</span> {label}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-[#5C1111] py-20 px-8 text-center">
        <h2 className="font-poppins text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-white mb-4">¿Listo para conocerte mejor?</h2>
        <p className="text-white/75 mb-8 text-base">Más de 10,000 estudiantes ya encontraron su camino. Ahora es tu turno.</p>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2.5 bg-white text-[#5C1111] px-8 py-4 rounded-full font-poppins font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] group"
        >
          Comenzar ahora — es gratis
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      <style jsx>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </div>
  );
}
