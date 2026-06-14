import React from 'react';
import {
  Lightbulb,
  Zap,
  Star,
  Heart,
  Rocket,
  Globe,
  Cpu,
  Briefcase,
  Scale,
  HeartPulse,
  Layers,
  Radio,
  BookOpen
} from 'lucide-react';

// Tipos e Interfaces
export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export interface QuestionOption {
  l?: string; // Letra para escenarios
  t: string;  // Texto
}

export interface Question {
  cat: string;
  type: 'likert' | 'scenario' | 'ranking';
  text: string;
  opts?: QuestionOption[] | string[];
  scores?: Record<string, string>;
  maps?: string[];
}

export interface Career {
  id: string | number;
  name: string;
  sede: string;
}

export interface Faculty {
  name: string;
  emoji: React.ReactNode;
  careers: Career[];
}

export interface Profile {
  name: string;
  desc: string;
  tags: string[];
  insight: string;
}

// Datos constantes exportados
export const CATEGORIES: Category[] = [
  { id: 'intereses', label: 'Intereses', icon: <Lightbulb className="w-4 h-4 inline-block" />, color: '#8B1E1E' },
  { id: 'habilidades', label: 'Habilidades', icon: <Zap className="w-4 h-4 inline-block" />, color: '#B83232' },
  { id: 'personalidad', label: 'Personalidad', icon: <Star className="w-4 h-4 inline-block" />, color: '#CC4444' },
  { id: 'valores', label: 'Valores', icon: <Heart className="w-4 h-4 inline-block" />, color: '#5C1111' },
  { id: 'motivaciones', label: 'Motivaciones', icon: <Rocket className="w-4 h-4 inline-block" />, color: '#8B1E1E' },
  { id: 'entorno', label: 'Entorno Laboral', icon: <Globe className="w-4 h-4 inline-block" />, color: '#B83232' },
];

export const QUESTIONS: Question[] = [
  // INTERESES (Q0-4)
  { cat: 'intereses', type: 'likert', text: 'Me apasiona entender cómo funcionan los sistemas, los procesos y las estructuras de manera profunda.' },
  { cat: 'intereses', type: 'likert', text: 'Disfruto explorar ideas artísticas y crear cosas visualmente atractivas o expresivas.' },
  { cat: 'intereses', type: 'likert', text: 'Me interesa la biología, la medicina y todo lo relacionado con el cuerpo humano y la salud.' },
  {
    cat: 'intereses', type: 'scenario', text: 'Si pudieras elegir cómo pasar un sábado aprendiendo algo nuevo, ¿qué elegirías?',
    opts: [
      { l: 'A', t: 'Construir un robot o programar una aplicación' },
      { l: 'B', t: 'Diseñar un espacio o crear una obra visual' },
      { l: 'C', t: 'Leer sobre psicología o filosofía' },
      { l: 'D', t: 'Analizar un caso de negocio o estudiar finanzas' },
    ], scores: { A: 'ing', B: 'arq', C: 'der', D: 'neg' }
  },
  { cat: 'intereses', type: 'likert', text: 'Los fenómenos sociales, culturales y la comunicación humana me generan mucha curiosidad.' },

  // HABILIDADES (Q5-9)
  { cat: 'habilidades', type: 'likert', text: 'Se me facilita comprender y aplicar conceptos matemáticos o de física sin mucho esfuerzo.' },
  { cat: 'habilidades', type: 'likert', text: 'Tengo facilidad para comunicarme verbalmente y por escrito de forma clara y persuasiva.' },
  { cat: 'habilidades', type: 'likert', text: 'Puedo escuchar con empatía y ayudar a otros a procesar emociones o problemas.' },
  {
    cat: 'habilidades', type: 'ranking', text: 'Ordena estas habilidades de mayor a menor según cuál dominas mejor actualmente:',
    opts: ['Análisis lógico', 'Creatividad', 'Empatía y escucha', 'Liderazgo', 'Investigación'],
    maps: ['ing', 'arq', 'sal', 'neg', 'der']
  },
  {
    cat: 'habilidades', type: 'scenario', text: 'Tu equipo tiene un problema urgente. ¿Cuál es tu rol natural?',
    opts: [
      { l: 'A', t: 'Analizo los datos y propongo una solución técnica' },
      { l: 'B', t: 'Medío entre los involucrados y encuentro el consenso' },
      { l: 'C', t: 'Propongo ideas creativas poco convencionales' },
      { l: 'D', t: 'Organizo las tareas y pongo en marcha el plan' },
    ], scores: { A: 'ing', B: 'der', C: 'arq', D: 'neg' }
  },

  // PERSONALIDAD (Q10-14)
  { cat: 'personalidad', type: 'likert', text: 'Prefiero trabajar en equipo a trabajar solo/a; el intercambio de ideas me energiza.' },
  { cat: 'personalidad', type: 'likert', text: 'Soy detallista y metódico/a: prefiero hacer las cosas bien aunque tome más tiempo.' },
  {
    cat: 'personalidad', type: 'scenario', text: '¿Cómo tomas decisiones importantes?',
    opts: [
      { l: 'A', t: 'Recopilo todos los datos y hago un análisis racional' },
      { l: 'B', t: 'Confío en mi intuición y lo que siento que está bien' },
      { l: 'C', t: 'Consulto a varias personas antes de decidir' },
      { l: 'D', t: 'Evalúo pros y contras pero actúo rápido' },
    ], scores: { A: 'ing', B: 'arq', C: 'edu', D: 'neg' }
  },
  { cat: 'personalidad', type: 'likert', text: 'Valoro la estabilidad y la estructura; me siento más cómodo/a con rutinas claras.' },
  { cat: 'personalidad', type: 'likert', text: 'Soy una persona que se expresa mejor con imágenes, diseños o proyectos visuales que con palabras.' },

  // VALORES (Q15-19)
  { cat: 'valores', type: 'likert', text: 'Quiero que mi trabajo tenga impacto directo en la vida y el bienestar de las personas.' },
  {
    cat: 'valores', type: 'ranking', text: 'Ordena lo que más valoras en tu vida profesional futura:',
    opts: ['Impacto social', 'Estabilidad económica', 'Creatividad', 'Autonomía', 'Reconocimiento'],
    maps: ['sal', 'neg', 'arq', 'ing', 'com']
  },
  { cat: 'valores', type: 'likert', text: 'Para mí, la justicia y la ética son principios no negociables en cualquier trabajo.' },
  {
    cat: 'valores', type: 'scenario', text: '¿Qué tipo de legado quieres dejar con tu trabajo?',
    opts: [
      { l: 'A', t: 'Avances tecnológicos que mejoren la vida de millones' },
      { l: 'B', t: 'Contribución a una sociedad más justa e igualitaria' },
      { l: 'C', t: 'Obras que inspiren y emocionen a las personas' },
      { l: 'D', t: 'Empresas o proyectos que generen empleo y prosperidad' },
    ], scores: { A: 'ing', B: 'der', C: 'arq', D: 'neg' }
  },
  { cat: 'valores', type: 'likert', text: 'El aprendizaje continuo y el crecimiento intelectual son más importantes que el status.' },

  // MOTIVACIONES (Q20-24)
  { cat: 'motivaciones', type: 'likert', text: 'Me emocionan los proyectos con plazos ajustados y alta presión: el estrés me activa positivamente.' },
  {
    cat: 'motivaciones', type: 'scenario', text: 'Imagina que hoy tienes que elegir un proyecto de voluntariado. ¿Cuál escogerías?',
    opts: [
      { l: 'A', t: 'Enseñar tecnología a niños de zonas rurales' },
      { l: 'B', t: 'Brindar atención médica básica a comunidades vulnerables' },
      { l: 'C', t: 'Diseñar espacios comunitarios para el barrio' },
      { l: 'D', t: 'Defender derechos humanos ante una organización civil' },
    ], scores: { A: 'edu', B: 'sal', C: 'arq', D: 'der' }
  },
  { cat: 'motivaciones', type: 'likert', text: 'La posibilidad de emprender mi propio negocio o startup es algo que me atrae profundamente.' },
  {
    cat: 'motivaciones', type: 'ranking', text: 'Ordena estas situaciones de más a menos motivadora para ti:',
    opts: ['Publicar una investigación', 'Lanzar un producto al mercado', 'Ganar un caso legal', 'Curar a un paciente', 'Diseñar un edificio'],
    maps: ['edu', 'neg', 'der', 'sal', 'arq']
  },
  { cat: 'motivaciones', type: 'likert', text: 'Me motiva la idea de ser experto/a reconocido en mi campo y publicar conocimiento.' },

  // ENTORNO LABORAL (Q25-29)
  { cat: 'entorno', type: 'likert', text: 'Prefiero trabajar en oficina estructurada antes que en lugares remotos o con mucha variabilidad de contexto.' },
  {
    cat: 'entorno', type: 'scenario', text: '¿En qué tipo de organización te imaginas trabajando a los 30 años?',
    opts: [
      { l: 'A', t: 'Mi propia empresa o startup tecnológica' },
      { l: 'B', t: 'Hospital, clínica o institución de salud pública' },
      { l: 'C', t: 'Estudio creativo, agencia o firma de diseño' },
      { l: 'D', t: 'Bufete de abogados o institución pública' },
    ], scores: { A: 'neg', B: 'sal', C: 'arq', D: 'der' }
  },
  {
    cat: 'entorno', type: 'ranking', text: 'Ordena estos entornos de trabajo de más a menos ideal para ti:',
    opts: ['Laboratorio o campo técnico', 'Aula o institución educativa', 'Empresa o corporativo', 'Estudio de diseño o arte', 'Tribunal o institución legal'],
    maps: ['ing', 'edu', 'neg', 'arq', 'der']
  },
  { cat: 'entorno', type: 'likert', text: 'El contacto directo con pacientes, clientes o usuarios finales es algo que busco activamente.' },
  {
    cat: 'entorno', type: 'scenario', text: '¿Qué aspecto de tu trabajo futuro consideras más importante?',
    opts: [
      { l: 'A', t: 'Que sea intelectualmente estimulante y me haga pensar' },
      { l: 'B', t: 'Que tenga un impacto visible en la sociedad' },
      { l: 'C', t: 'Que me permita expresarme y ser creativo/a' },
      { l: 'D', t: 'Que me dé estabilidad y buen salario' },
    ], scores: { A: 'ing', B: 'sal', C: 'com', D: 'neg' }
  },
];

export const CAREERS: Record<string, Faculty> = {
  ing: {
    name: 'Ingeniería',
    emoji: <Cpu className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 101, name: 'Ingeniería de Sistemas e Informática', sede: 'Lima · Arequipa' },
      { id: 104, name: 'Ingeniería Industrial', sede: 'Lima · Arequipa' },
      { id: 103, name: 'Ingeniería Civil', sede: 'Lima · Arequipa' },
      { id: 102, name: 'Ingeniería Electrónica', sede: 'Lima' },
      { id: 105, name: 'Ingeniería de Minas', sede: 'Arequipa' },
    ]
  },
  neg: {
    name: 'Negocios',
    emoji: <Briefcase className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 401, name: 'Administración de Empresas', sede: 'Lima · Arequipa' },
      { id: 402, name: 'Contabilidad y Finanzas', sede: 'Lima · Arequipa' },
      { id: 403, name: 'Marketing y Dirección Comercial', sede: 'Lima · Arequipa' },
      { id: 404, name: 'Negocios Internacionales', sede: 'Lima' },
      { id: 405, name: 'Economía', sede: 'Lima · Arequipa' },
    ]
  },
  der: {
    name: 'Derecho y Ciencias Humanas',
    emoji: <Scale className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 301, name: 'Derecho', sede: 'Lima · Arequipa' },
      { id: 203, name: 'Psicología', sede: 'Lima · Arequipa' },
      { id: 304, name: 'Trabajo Social', sede: 'Lima' },
      { id: 305, name: 'Filosofía', sede: 'Lima' },
    ]
  },
  sal: {
    name: 'Ciencias de la Salud',
    emoji: <HeartPulse className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 201, name: 'Medicina Humana', sede: 'Lima · Arequipa' },
      { id: 202, name: 'Enfermería', sede: 'Lima · Arequipa' },
      { id: 204, name: 'Odontología', sede: 'Lima · Arequipa' },
      { id: 205, name: 'Nutrición y Dietética', sede: 'Lima' },
      { id: 206, name: 'Farmacia y Bioquímica', sede: 'Lima · Arequipa' },
    ]
  },
  arq: {
    name: 'Arquitectura y Diseño',
    emoji: <Layers className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 502, name: 'Arquitectura', sede: 'Lima · Arequipa' },
      { id: 501, name: 'Diseño Gráfico Empresarial', sede: 'Lima · Arequipa' },
      { id: 504, name: 'Diseño de Interiores', sede: 'Lima' },
      { id: 505, name: 'Diseño Industrial', sede: 'Lima' },
    ]
  },
  com: {
    name: 'Comunicaciones',
    emoji: <Radio className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 303, name: 'Ciencias de la Comunicación', sede: 'Lima · Arequipa' },
      { id: 306, name: 'Periodismo', sede: 'Lima' },
      { id: 307, name: 'Publicidad y Multimedia', sede: 'Lima · Arequipa' },
      { id: 308, name: 'Comunicación Audiovisual', sede: 'Lima' },
    ]
  },
  edu: {
    name: 'Educación',
    emoji: <BookOpen className="w-4 h-4 inline-block -mt-0.5" />,
    careers: [
      { id: 503, name: 'Educación Inicial', sede: 'Lima · Arequipa' },
      { id: 506, name: 'Educación Primaria', sede: 'Lima · Arequipa' },
      { id: 507, name: 'Educación Secundaria', sede: 'Lima · Arequipa' },
      { id: 508, name: 'Educación Especial', sede: 'Lima' },
    ]
  }
};

export const PROFILES: Record<string, Profile> = {
  ing: {
    name: 'Perfil Técnico-Analítico',
    desc: 'Tu mente funciona como un sistema: precisa, lógica y orientada a soluciones. Disfrutas entender cómo las cosas funcionan por dentro y tienes una inclinación natural por los problemas complejos que requieren razonamiento estructurado.',
    tags: ['Pensamiento lógico', 'Resolución de problemas', 'Innovación tecnológica', 'Trabajo con sistemas'],
    insight: 'Personas con tu perfil encuentran gran satisfacción en carreras donde la lógica y la tecnología se combinan para resolver problemas reales. Tu capacidad analítica es una fortaleza que muchas organizaciones valoran enormemente. Te recomendamos explorar áreas como la ingeniería de software, automatización o investigación aplicada.'
  },
  neg: {
    name: 'Perfil Estratégico-Empresarial',
    desc: 'Ves el mundo como un sistema de recursos, oportunidades y relaciones. Tu perfil muestra una combinación de pensamiento estratégico, orientación a resultados y habilidades interpersonales que son la base del liderazgo empresarial.',
    tags: ['Liderazgo', 'Visión estratégica', 'Orientación a resultados', 'Habilidades interpersonales'],
    insight: 'Tu perfil sugiere que prosperas en entornos donde puedes tomar decisiones con impacto, gestionar equipos y crear valor. Las carreras de negocios ofrecen una gran variedad de especializaciones: desde finanzas hasta emprendimiento, marketing digital o gestión internacional.'
  },
  der: {
    name: 'Perfil Humanista-Crítico',
    desc: 'Tienes una profunda sensibilidad social y un pensamiento crítico agudo. Te importa la justicia, las personas y el bienestar colectivo. Eres capaz de ver múltiples perspectivas en situaciones complejas.',
    tags: ['Pensamiento crítico', 'Empatía', 'Justicia social', 'Comunicación oral'],
    insight: 'Tu combinación de valores humanistas y capacidad argumentativa te abre puertas en el derecho, las ciencias sociales y la psicología. Podrías generar un impacto poderoso en áreas como derechos humanos, mediación, o políticas públicas.'
  },
  sal: {
    name: 'Perfil Asistencial-Científico',
    desc: 'Tu motivación central es cuidar y sanar. Combinas empatía con rigor científico, lo que es precisamente lo que las profesiones de la salud demandan. El bienestar del otro es tu norte.',
    tags: ['Empatía clínica', 'Rigor científico', 'Vocación de servicio', 'Trabajo bajo presión'],
    insight: 'Las carreras de la salud son exigentes pero profundamente gratificantes para personas con tu perfil. Ya sea en medicina, enfermería o psicología clínica, tu capacidad de combinar ciencia con humanidad será tu mayor diferenciador.'
  },
  arq: {
    name: 'Perfil Creativo-Espacial',
    desc: 'Tu manera de ver el mundo tiene una dimensión estética y espacial que otros no siempre perciben. Puedes imaginar resultados visuales con claridad y tienes sensibilidad para lo bello, lo funcional y lo expresivo.',
    tags: ['Pensamiento visual', 'Creatividad', 'Sensibilidad estética', 'Innovación en diseño'],
    insight: 'El diseño y la arquitectura son campos donde los perfiles creativos como el tuyo pueden dejar una huella duradera. Explora áreas de diseño sostenible, arquitectura bioclimática o diseño UX/UI, donde la creatividad se combina con tecnología.'
  },
  com: {
    name: 'Perfil Comunicativo-Narrativo',
    desc: 'Las palabras, las imágenes y los mensajes son tus herramientas naturales. Tienes el don de conectar con las personas a través de historias y de hacer que ideas complejas sean accesibles y atractivas.',
    tags: ['Storytelling', 'Pensamiento creativo', 'Conexión con audiencias', 'Medios digitales'],
    insight: 'El campo de las comunicaciones ha evolucionado enormemente. Tu perfil encaja tanto en periodismo tradicional como en marketing de contenidos, producción audiovisual o comunicación corporativa. La digitalización ha abierto oportunidades que antes no existían.'
  },
  edu: {
    name: 'Perfil Educador-Formador',
    desc: 'Tienes una vocación auténtica por el desarrollo humano y la formación de otros. La paciencia, la didáctica y el compromiso social son parte de tu esencia. Para ti, enseñar es transformar.',
    tags: ['Vocación docente', 'Didáctica', 'Compromiso social', 'Paciencia'],
    insight: 'La educación es uno de los campos más impactantes que existen: cada persona que formas multiplica tu influencia. Tu perfil sugiere que encontrarás significado profundo en la docencia, la pedagogía o el diseño curricular, especialmente si lo combinas con tecnología educativa.'
  }
};
