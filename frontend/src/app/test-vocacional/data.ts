// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export type QuestionType = 'likert' | 'scenario' | 'ranking';

export interface ScenarioOption {
  l: string;
  t: string;
}

export interface Question {
  cat: string;
  type: QuestionType;
  text: string;
  opts?: ScenarioOption[] | string[];
  scores?: Record<string, string>;
  maps?: string[];
}

export interface CareerEntry {
  name: string;
  sede: string;
}

export interface CareerGroup {
  name: string;
  emoji: string;
  careers: CareerEntry[];
}

export interface Profile {
  name: string;
  desc: string;
  tags: string[];
  insight: string;
}

export type AreaKey = 'ing' | 'neg' | 'der' | 'sal' | 'arq' | 'com' | 'edu';

export type Scores = Record<AreaKey, number>;

// ─── DATA ─────────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: 'intereses', label: 'Intereses', icon: '💡', color: '#8B1E1E' },
  { id: 'habilidades', label: 'Habilidades', icon: '⚡', color: '#B83232' },
  { id: 'personalidad', label: 'Personalidad', icon: '🌟', color: '#CC4444' },
  { id: 'valores', label: 'Valores', icon: '❤️', color: '#5C1111' },
  { id: 'motivaciones', label: 'Motivaciones', icon: '🚀', color: '#8B1E1E' },
  { id: 'entorno', label: 'Entorno Laboral', icon: '🌍', color: '#B83232' },
];

export const QUESTIONS: Question[] = [
  // INTERESES (Q1-10)
  { cat: 'intereses', type: 'likert', text: 'Me apasiona entender cómo funcionan los sistemas, los procesos y las estructuras de manera profunda.' },
  { cat: 'intereses', type: 'likert', text: 'Disfruto explorar ideas artísticas y crear cosas visualmente atractivas o expresivas.' },
  { cat: 'intereses', type: 'likert', text: 'Me interesa la biología, la medicina y todo lo relacionado con el cuerpo humano y la salud.' },
  { cat: 'intereses', type: 'likert', text: 'Leo noticias de negocios, economía o emprendimiento y encuentro esos temas genuinamente emocionantes.' },
  { cat: 'intereses', type: 'likert', text: 'Me atrae el derecho, la justicia y las cuestiones éticas de la sociedad.' },
  {
    cat: 'intereses', type: 'scenario',
    text: 'Si pudieras elegir cómo pasar un sábado aprendiendo algo nuevo, ¿qué elegirías?',
    opts: [
      { l: 'A', t: 'Construir un robot o programar una aplicación' },
      { l: 'B', t: 'Diseñar un espacio o crear una obra visual' },
      { l: 'C', t: 'Leer sobre psicología o filosofía' },
      { l: 'D', t: 'Analizar un caso de negocio o estudiar finanzas' },
    ] as ScenarioOption[],
    scores: { A: 'ing', B: 'arq', C: 'der', D: 'neg' },
  },
  { cat: 'intereses', type: 'likert', text: 'Los fenómenos sociales, culturales y la comunicación humana me generan mucha curiosidad.' },
  { cat: 'intereses', type: 'likert', text: 'Me interesan la enseñanza, la pedagogía y los procesos de aprendizaje.' },
  { cat: 'intereses', type: 'likert', text: 'Disfruto analizar datos, patrones y sacar conclusiones lógicas a partir de información.' },
  { cat: 'intereses', type: 'likert', text: 'La política y los cambios sociales son temas que sigo y que me generan opiniones sólidas.' },

  // HABILIDADES (Q11-20)
  { cat: 'habilidades', type: 'likert', text: 'Se me facilita comprender y aplicar conceptos matemáticos o de física sin mucho esfuerzo.' },
  { cat: 'habilidades', type: 'likert', text: 'Tengo facilidad para comunicarme verbalmente y por escrito de forma clara y persuasiva.' },
  { cat: 'habilidades', type: 'likert', text: 'Puedo escuchar con empatía y ayudar a otros a procesar emociones o problemas.' },
  {
    cat: 'habilidades', type: 'ranking',
    text: 'Ordena estas habilidades de mayor a menor según cuál dominas mejor actualmente:',
    opts: ['Análisis lógico', 'Creatividad', 'Empatía y escucha', 'Liderazgo', 'Investigación'],
    maps: ['ing', 'arq', 'sal', 'neg', 'der'],
  },
  { cat: 'habilidades', type: 'likert', text: 'Me destaco organizando equipos, delegando tareas y motivando a las personas.' },
  { cat: 'habilidades', type: 'likert', text: 'Tengo habilidad para diseñar visualmente: composición, colores, proporciones y espacios.' },
  { cat: 'habilidades', type: 'likert', text: 'Aprendo nuevas tecnologías digitales con facilidad y rapidez.' },
  { cat: 'habilidades', type: 'likert', text: 'Soy bueno/a investigando, leyendo literatura académica y redactando de forma formal.' },
  {
    cat: 'habilidades', type: 'scenario',
    text: 'Tu equipo tiene un problema urgente. ¿Cuál es tu rol natural?',
    opts: [
      { l: 'A', t: 'Analizo los datos y propongo una solución técnica' },
      { l: 'B', t: 'Medío entre los involucrados y encuentro el consenso' },
      { l: 'C', t: 'Propongo ideas creativas poco convencionales' },
      { l: 'D', t: 'Organizo las tareas y pongo en marcha el plan' },
    ] as ScenarioOption[],
    scores: { A: 'ing', B: 'der', C: 'arq', D: 'neg' },
  },
  { cat: 'habilidades', type: 'likert', text: 'Se me da bien enseñar: explico conceptos difíciles de manera simple y paciente.' },

  // PERSONALIDAD (Q21-30)
  { cat: 'personalidad', type: 'likert', text: 'Prefiero trabajar en equipo a trabajar solo/a; el intercambio de ideas me energiza.' },
  { cat: 'personalidad', type: 'likert', text: 'Soy detallista y metódico/a: prefiero hacer las cosas bien aunque tome más tiempo.' },
  { cat: 'personalidad', type: 'likert', text: 'Me adapto fácilmente a los cambios; la incertidumbre no me genera ansiedad sino oportunidad.' },
  {
    cat: 'personalidad', type: 'scenario',
    text: '¿Cómo tomas decisiones importantes?',
    opts: [
      { l: 'A', t: 'Recopilo todos los datos y hago un análisis racional' },
      { l: 'B', t: 'Confío en mi intuición y lo que siento que está bien' },
      { l: 'C', t: 'Consulto a varias personas antes de decidir' },
      { l: 'D', t: 'Evalúo pros y contras pero actúo rápido' },
    ] as ScenarioOption[],
    scores: { A: 'ing', B: 'arq', C: 'edu', D: 'neg' },
  },
  { cat: 'personalidad', type: 'likert', text: 'Me gustan los retos intelectuales que requieren mucho análisis y pensamiento crítico.' },
  { cat: 'personalidad', type: 'likert', text: 'Busco ambientes de trabajo que sean dinámicos, con variedad y contacto con muchas personas.' },
  { cat: 'personalidad', type: 'likert', text: 'Valoro la estabilidad y la estructura; me siento más cómodo/a con rutinas claras.' },
  { cat: 'personalidad', type: 'likert', text: 'Tengo tendencia a ser curioso/a y explorar ideas fuera del área de mi especialidad.' },
  { cat: 'personalidad', type: 'likert', text: 'Disfruto de posiciones de liderazgo y tomar decisiones que afectan a otros.' },
  { cat: 'personalidad', type: 'likert', text: 'Soy una persona que se expresa mejor con imágenes, diseños o proyectos visuales que con palabras.' },

  // VALORES (Q31-40)
  { cat: 'valores', type: 'likert', text: 'Quiero que mi trabajo tenga impacto directo en la vida y el bienestar de las personas.' },
  {
    cat: 'valores', type: 'ranking',
    text: 'Ordena lo que más valoras en tu vida profesional futura:',
    opts: ['Impacto social', 'Estabilidad económica', 'Creatividad', 'Autonomía', 'Reconocimiento'],
    maps: ['sal', 'neg', 'arq', 'ing', 'com'],
  },
  { cat: 'valores', type: 'likert', text: 'Para mí, la justicia y la ética son principios no negociables en cualquier trabajo.' },
  { cat: 'valores', type: 'likert', text: 'Me motiva crear cosas originales; la innovación es parte fundamental de lo que quiero hacer.' },
  { cat: 'valores', type: 'likert', text: 'Valoro la posibilidad de tener libertad para gestionar mi tiempo y mis proyectos.' },
  { cat: 'valores', type: 'likert', text: 'El dinero y la seguridad financiera son factores prioritarios al elegir carrera.' },
  {
    cat: 'valores', type: 'scenario',
    text: '¿Qué tipo de legado quieres dejar con tu trabajo?',
    opts: [
      { l: 'A', t: 'Avances tecnológicos que mejoren la vida de millones' },
      { l: 'B', t: 'Contribución a una sociedad más justa e igualitaria' },
      { l: 'C', t: 'Obras que inspiren y emocionen a las personas' },
      { l: 'D', t: 'Empresas o proyectos que generen empleo y prosperidad' },
    ] as ScenarioOption[],
    scores: { A: 'ing', B: 'der', C: 'arq', D: 'neg' },
  },
  { cat: 'valores', type: 'likert', text: 'Quiero trabajar en un entorno que celebre la diversidad y la inclusión.' },
  { cat: 'valores', type: 'likert', text: 'Me interesa formarme en el extranjero o trabajar con personas de otros países y culturas.' },
  { cat: 'valores', type: 'likert', text: 'El aprendizaje continuo y el crecimiento intelectual son más importantes que el status.' },

  // MOTIVACIONES (Q41-50)
  { cat: 'motivaciones', type: 'likert', text: 'Me emocionan los proyectos con plazos ajustados y alta presión: el estrés me activa positivamente.' },
  { cat: 'motivaciones', type: 'likert', text: 'Prefiero trabajar en problemas de largo aliento, con profundidad, antes que resolver muchas cosas a la vez.' },
  {
    cat: 'motivaciones', type: 'scenario',
    text: 'Imagina que hoy tienes que elegir un proyecto de voluntariado. ¿Cuál escogerías?',
    opts: [
      { l: 'A', t: 'Enseñar tecnología a niños de zonas rurales' },
      { l: 'B', t: 'Brindar atención médica básica a comunidades vulnerables' },
      { l: 'C', t: 'Diseñar espacios comunitarios para el barrio' },
      { l: 'D', t: 'Defender derechos humanos ante una organización civil' },
    ] as ScenarioOption[],
    scores: { A: 'edu', B: 'sal', C: 'arq', D: 'der' },
  },
  { cat: 'motivaciones', type: 'likert', text: 'La posibilidad de emprender mi propio negocio o startup es algo que me atrae profundamente.' },
  { cat: 'motivaciones', type: 'likert', text: 'Prefiero trabajar para organizaciones con propósito social antes que para empresas puramente lucrativas.' },
  { cat: 'motivaciones', type: 'likert', text: 'El reconocimiento público y la visibilidad son factores importantes para mi motivación.' },
  { cat: 'motivaciones', type: 'likert', text: 'Me motiva más resolver un problema nuevo nunca antes visto que perfeccionar procesos existentes.' },
  {
    cat: 'motivaciones', type: 'ranking',
    text: 'Ordena estas situaciones de más a menos motivadora para ti:',
    opts: ['Publicar una investigación', 'Lanzar un producto al mercado', 'Ganar un caso legal', 'Curar a un paciente', 'Diseñar un edificio'],
    maps: ['edu', 'neg', 'der', 'sal', 'arq'],
  },
  { cat: 'motivaciones', type: 'likert', text: 'Me motiva la idea de ser experto/a reconocido en mi campo y publicar conocimiento.' },
  { cat: 'motivaciones', type: 'likert', text: 'Trabajar con niños, jóvenes o en contextos educativos es algo que genuinamente me llena.' },
  { cat: 'motivaciones', type: 'likert', text: 'Me apasiona comunicar, contar historias y crear narrativas que conecten con la gente.' },

  // ENTORNO LABORAL (Q51-60)
  { cat: 'entorno', type: 'likert', text: 'Prefiero trabajar en oficina estructurada antes que en lugares remotos o con mucha variabilidad de contexto.' },
  {
    cat: 'entorno', type: 'scenario',
    text: '¿En qué tipo de organización te imaginas trabajando a los 30 años?',
    opts: [
      { l: 'A', t: 'Mi propia empresa o startup tecnológica' },
      { l: 'B', t: 'Hospital, clínica o institución de salud pública' },
      { l: 'C', t: 'Estudio creativo, agencia o firma de diseño' },
      { l: 'D', t: 'Bufete de abogados o institución pública' },
    ] as ScenarioOption[],
    scores: { A: 'neg', B: 'sal', C: 'arq', D: 'der' },
  },
  { cat: 'entorno', type: 'likert', text: 'Necesito un trabajo que me permita viajar frecuentemente o trabajar desde distintos lugares.' },
  { cat: 'entorno', type: 'likert', text: 'Prefiero trabajar con objetos, máquinas o sistemas antes que con personas directamente.' },
  { cat: 'entorno', type: 'likert', text: 'Me gustaría un entorno donde la investigación y la academia sean parte habitual del trabajo.' },
  { cat: 'entorno', type: 'likert', text: 'Valoro los ambientes donde puedo colaborar en equipo y donde haya mucha comunicación horizontal.' },
  {
    cat: 'entorno', type: 'ranking',
    text: 'Ordena estos entornos de trabajo de más a menos ideal para ti:',
    opts: ['Laboratorio o campo técnico', 'Aula o institución educativa', 'Empresa o corporativo', 'Estudio de diseño o arte', 'Tribunal o institución legal'],
    maps: ['ing', 'edu', 'neg', 'arq', 'der'],
  },
  { cat: 'entorno', type: 'likert', text: 'El contacto directo con pacientes, clientes o usuarios finales es algo que busco activamente.' },
  { cat: 'entorno', type: 'likert', text: 'Me atrae la idea de trabajar en medios, producción audiovisual o marketing digital.' },
  {
    cat: 'entorno', type: 'scenario',
    text: '¿Qué aspecto de tu trabajo futuro consideras más importante?',
    opts: [
      { l: 'A', t: 'Que sea intelectualmente estimulante y me haga pensar' },
      { l: 'B', t: 'Que tenga un impacto visible en la sociedad' },
      { l: 'C', t: 'Que me permita expresarme y ser creativo/a' },
      { l: 'D', t: 'Que me dé estabilidad y buen salario' },
    ] as ScenarioOption[],
    scores: { A: 'ing', B: 'sal', C: 'com', D: 'neg' },
  },
];

export const CAREERS: Record<AreaKey, CareerGroup> = {
  ing: {
    name: 'Ingeniería', emoji: '⚙️',
    careers: [
      { name: 'Ingeniería de Sistemas e Informática', sede: 'Lima · Arequipa' },
      { name: 'Ingeniería Industrial', sede: 'Lima · Arequipa' },
      { name: 'Ingeniería Civil', sede: 'Lima · Arequipa' },
      { name: 'Ingeniería Electrónica', sede: 'Lima' },
      { name: 'Ingeniería de Minas', sede: 'Arequipa' },
    ],
  },
  neg: {
    name: 'Negocios', emoji: '💼',
    careers: [
      { name: 'Administración de Empresas', sede: 'Lima · Arequipa' },
      { name: 'Contabilidad y Finanzas', sede: 'Lima · Arequipa' },
      { name: 'Marketing y Dirección Comercial', sede: 'Lima · Arequipa' },
      { name: 'Negocios Internacionales', sede: 'Lima' },
      { name: 'Economía', sede: 'Lima · Arequipa' },
    ],
  },
  der: {
    name: 'Derecho y Ciencias Humanas', emoji: '⚖️',
    careers: [
      { name: 'Derecho', sede: 'Lima · Arequipa' },
      { name: 'Psicología', sede: 'Lima · Arequipa' },
      { name: 'Trabajo Social', sede: 'Lima' },
      { name: 'Filosofía', sede: 'Lima' },
    ],
  },
  sal: {
    name: 'Ciencias de la Salud', emoji: '🏥',
    careers: [
      { name: 'Medicina Humana', sede: 'Lima · Arequipa' },
      { name: 'Enfermería', sede: 'Lima · Arequipa' },
      { name: 'Odontología', sede: 'Lima · Arequipa' },
      { name: 'Nutrición y Dietética', sede: 'Lima' },
      { name: 'Farmacia y Bioquímica', sede: 'Lima · Arequipa' },
    ],
  },
  arq: {
    name: 'Arquitectura y Diseño', emoji: '🏛️',
    careers: [
      { name: 'Arquitectura', sede: 'Lima · Arequipa' },
      { name: 'Diseño Gráfico Empresarial', sede: 'Lima · Arequipa' },
      { name: 'Diseño de Interiores', sede: 'Lima' },
      { name: 'Diseño Industrial', sede: 'Lima' },
    ],
  },
  com: {
    name: 'Comunicaciones', emoji: '📡',
    careers: [
      { name: 'Ciencias de la Comunicación', sede: 'Lima · Arequipa' },
      { name: 'Periodismo', sede: 'Lima' },
      { name: 'Publicidad y Multimedia', sede: 'Lima · Arequipa' },
      { name: 'Comunicación Audiovisual', sede: 'Lima' },
    ],
  },
  edu: {
    name: 'Educación', emoji: '📚',
    careers: [
      { name: 'Educación Inicial', sede: 'Lima · Arequipa' },
      { name: 'Educación Primaria', sede: 'Lima · Arequipa' },
      { name: 'Educación Secundaria', sede: 'Lima · Arequipa' },
      { name: 'Educación Especial', sede: 'Lima' },
    ],
  },
};

export const PROFILES: Record<AreaKey, Profile> = {
  ing: {
    name: 'Perfil Técnico-Analítico',
    desc: 'Tu mente funciona como un sistema: precisa, lógica y orientada a soluciones. Disfrutas entender cómo las cosas funcionan por dentro y tienes una inclinación natural por los problemas complejos que requieren razonamiento estructurado.',
    tags: ['Pensamiento lógico', 'Resolución de problemas', 'Innovación tecnológica', 'Trabajo con sistemas'],
    insight: 'Personas con tu perfil encuentran gran satisfacción en carreras donde la lógica y la tecnología se combinan para resolver problemas reales. Tu capacidad analítica es una fortaleza que muchas organizaciones valoran enormemente. Te recomendamos explorar áreas como la ingeniería de software, automatización o investigación aplicada.',
  },
  neg: {
    name: 'Perfil Estratégico-Empresarial',
    desc: 'Ves el mundo como un sistema de recursos, oportunidades y relaciones. Tu perfil muestra una combinación de pensamiento estratégico, orientación a resultados y habilidades interpersonales que son la base del liderazgo empresarial.',
    tags: ['Liderazgo', 'Visión estratégica', 'Orientación a resultados', 'Habilidades interpersonales'],
    insight: 'Tu perfil sugiere que prosperas en entornos donde puedes tomar decisiones con impacto, gestionar equipos y crear valor. Las carreras de negocios ofrecen una gran variedad de especializaciones: desde finanzas hasta emprendimiento, marketing digital o gestión internacional.',
  },
  der: {
    name: 'Perfil Humanista-Crítico',
    desc: 'Tienes una profunda sensibilidad social y un pensamiento crítico agudo. Te importa la justicia, las personas y el bienestar colectivo. Eres capaz de ver múltiples perspectivas en situaciones complejas.',
    tags: ['Pensamiento crítico', 'Empatía', 'Justicia social', 'Comunicación oral'],
    insight: 'Tu combinación de valores humanistas y capacidad argumentativa te abre puertas en el derecho, las ciencias sociales y la psicología. Podrías generar un impacto poderoso en áreas como derechos humanos, mediación, o políticas públicas.',
  },
  sal: {
    name: 'Perfil Asistencial-Científico',
    desc: 'Tu motivación central es cuidar y sanar. Combinas empatía con rigor científico, lo que es precisamente lo que las profesiones de la salud demandan. El bienestar del otro es tu norte.',
    tags: ['Empatía clínica', 'Rigor científico', 'Vocación de servicio', 'Trabajo bajo presión'],
    insight: 'Las carreras de la salud son exigentes pero profundamente gratificantes para personas con tu perfil. Ya sea en medicina, enfermería o psicología clínica, tu capacidad de combinar ciencia con humanidad será tu mayor diferenciador.',
  },
  arq: {
    name: 'Perfil Creativo-Espacial',
    desc: 'Tu manera de ver el mundo tiene una dimensión estética y espacial que otros no siempre perciben. Puedes imaginar resultados visuales con claridad y tienes sensibilidad para lo bello, lo funcional y lo expresivo.',
    tags: ['Pensamiento visual', 'Creatividad', 'Sensibilidad estética', 'Innovación en diseño'],
    insight: 'El diseño y la arquitectura son campos donde los perfiles creativos como el tuyo pueden dejar una huella duradera. Explora áreas de diseño sostenible, arquitectura bioclimática o diseño UX/UI, donde la creatividad se combina con tecnología.',
  },
  com: {
    name: 'Perfil Comunicativo-Narrativo',
    desc: 'Las palabras, las imágenes y los mensajes son tus herramientas naturales. Tienes el don de conectar con las personas a través de historias y de hacer que ideas complejas sean accesibles y atractivas.',
    tags: ['Storytelling', 'Pensamiento creativo', 'Conexión con audiencias', 'Medios digitales'],
    insight: 'El campo de las comunicaciones ha evolucionado enormemente. Tu perfil encaja tanto en periodismo tradicional como en marketing de contenidos, producción audiovisual o comunicación corporativa. La digitalización ha abierto oportunidades que antes no existían.',
  },
  edu: {
    name: 'Perfil Educador-Formador',
    desc: 'Tienes una vocación auténtica por el desarrollo humano y la formación de otros. La paciencia, la didáctica y el compromiso social son parte de tu esencia. Para ti, enseñar es transformar.',
    tags: ['Vocación docente', 'Didáctica', 'Compromiso social', 'Paciencia'],
    insight: 'La educación es uno de los campos más impactantes que existen: cada persona que formas multiplica tu influencia. Tu perfil sugiere que encontrarás significado profundo en la docencia, la pedagogía o el diseño curricular, especialmente si lo combinas con tecnología educativa.',
  },
};

export const AREA_NAMES: Record<AreaKey, string> = {
  ing: 'Ingeniería',
  neg: 'Negocios',
  der: 'Derecho',
  sal: 'Salud',
  arq: 'Arquitectura',
  com: 'Comunicación',
  edu: 'Educación',
};

export const SCORE_MAPPING: Record<number, AreaKey> = {
  0: 'ing', 1: 'arq', 2: 'sal', 3: 'neg', 4: 'der',
  6: 'com', 7: 'edu', 8: 'ing', 9: 'der',
  10: 'ing', 11: 'com', 12: 'sal',
  14: 'neg', 15: 'arq', 16: 'ing', 17: 'edu',
  20: 'com', 21: 'ing', 22: 'ing',
  24: 'ing', 25: 'com', 26: 'neg', 27: 'neg', 28: 'neg', 29: 'arq',
  30: 'sal', 32: 'der', 33: 'arq', 34: 'ing', 35: 'neg',
  37: 'der', 38: 'neg', 39: 'edu',
  40: 'neg', 41: 'ing',
  43: 'neg', 44: 'der', 45: 'com', 46: 'ing',
  48: 'edu', 49: 'com', 50: 'ing',
  52: 'ing', 53: 'ing', 54: 'edu', 55: 'neg',
  57: 'sal', 58: 'com',
};
