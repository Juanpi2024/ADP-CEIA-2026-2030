/**
 * Panel de Gestión ADP - Datos y Configuración
 * Convenio de Desempeño Director - CEIA 2026-2030
 */

// Configuración de dimensiones del convenio
const DIMENSIONES = {
    pedagogica: {
        id: 'pedagogica',
        nombre: 'Gestión Pedagógica',
        peso: 20,
        color: '#667eea',
        descripcion: 'Mejorar progresivamente las prácticas pedagógicas en los docentes utilizando estrategias como: observación al aula, desarrollo profesional interno, reflexiones pedagógicas.'
    },
    recursos: {
        id: 'recursos',
        nombre: 'Gestión de Recursos',
        peso: 15,
        color: '#f093fb',
        descripcion: 'Asegurar la disponibilidad de los recursos humanos, a través de capacitaciones internas y espacios de reflexión.'
    },
    liderazgo: {
        id: 'liderazgo',
        nombre: 'Liderazgo',
        peso: 20,
        color: '#ffd700',
        descripcion: 'Dirigir y liderar de manera efectiva el funcionamiento del establecimiento, instaurando una cultura de altas expectativas y compromiso.'
    },
    convivencia: {
        id: 'convivencia',
        nombre: 'Convivencia Escolar',
        peso: 20,
        color: '#ff6b6b',
        descripcion: 'Organizar y promover de manera sistemática acciones que aseguren la valoración de la diversidad, inclusión y salud mental.'
    },
    resultados: {
        id: 'resultados',
        nombre: 'Resultados',
        peso: 25,
        color: '#38ef7d',
        descripcion: 'Sistematizar continuamente los datos relevantes de la gestión escolar para mejorar los resultados de eficiencia interna.'
    }
};

// Estados posibles de las metas
const ESTADOS = {
    pendiente: { id: 'pendiente', nombre: 'Pendiente', color: '#888888' },
    progreso: { id: 'progreso', nombre: 'En Progreso', color: '#4facfe' },
    lograda: { id: 'lograda', nombre: 'Lograda', color: '#38ef7d' },
    'no-lograda': { id: 'no-lograda', nombre: 'No Lograda', color: '#ff4b2b' }
};

// Categorías de hitos del calendario
const CATEGORIAS_HITOS = {
    informe: { id: 'informe', nombre: 'Informe', color: '#667eea' },
    evaluacion: { id: 'evaluacion', nombre: 'Evaluación', color: '#f5576c' },
    reunion: { id: 'reunion', nombre: 'Reunión', color: '#4facfe' },
    entrega: { id: 'entrega', nombre: 'Entrega', color: '#38ef7d' },
    capacitacion: { id: 'capacitacion', nombre: 'Capacitación', color: '#f093fb' }
};

// Metas del convenio basadas en el documento oficial
const METAS_INICIALES = [
    // Gestión Pedagógica (20%)
    {
        id: 'meta-1',
        dimension: 'pedagogica',
        nombre: 'Acompañamiento al Aula',
        indicador: 'Porcentaje (%) de acompañamiento al aula semestre 1 y semestre 2. Realizar el 75% de acompañamientos del total de docentes (anualmente).',
        ponderacion: 8,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de planificación de acompañamiento al docente indicando pauta de evaluación, cronograma de fechas, nombre, asignatura y curso de los docentes.\n2. Informe que agrupe las necesidades y fortalezas de los docentes observados con estrategias de mejora.',
        metaAnual: {
            2026: '75% acompañamientos',
            2027: '75% acompañamientos',
            2028: '80% acompañamientos',
            2029: '90% acompañamientos',
            2030: '100% acompañamientos'
        }
    },
    {
        id: 'meta-2',
        dimension: 'pedagogica',
        nombre: 'Talleres de Desarrollo Profesional',
        indicador: 'Número de talleres incorporando estrategias innovadoras y efectivas al desarrollo profesional interno de los/as docentes. Realizar 2 talleres semestrales.',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de planificación del taller indicando: Objetivo, Responsable del taller, Quiénes participan, Actividades realizadas, Firmas y fecha, Material utilizado.',
        metaAnual: {
            2026: '2 talleres semestrales',
            2027: '2 talleres semestrales',
            2028: '2 talleres semestrales',
            2029: '2 talleres semestrales',
            2030: '2 talleres semestrales'
        }
    },
    {
        id: 'meta-3',
        dimension: 'pedagogica',
        nombre: 'Reflexiones Pedagógicas',
        indicador: 'Número de reflexiones pedagógicas programadas por semestre para el trabajo colaborativo, intercambio de experiencias y estrategias efectivas. Realizar al menos 2 reflexiones mensuales.',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de planificación de la reflexión pedagógica indicando: Objetivo, Responsable, Quiénes participan, Actividades realizadas, Firmas y fecha, Material utilizado.',
        metaAnual: {
            2026: '2 reflexiones mensuales',
            2027: '2 reflexiones mensuales',
            2028: '2 reflexiones mensuales',
            2029: '2 reflexiones mensuales',
            2030: '2 reflexiones mensuales'
        }
    },

    // Gestión de Recursos (15%)
    {
        id: 'meta-4',
        dimension: 'recursos',
        nombre: 'Plan de Capacitaciones',
        indicador: 'Diseñar un plan de trabajo con número de capacitaciones, talleres de reflexión, fechas tentativas, acciones y evaluación. Implementar Plan con mínimo 2 capacitaciones y 2 talleres anuales.',
        ponderacion: 4.5,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia del Plan de trabajo indicando: Objetivo, Responsables, Participantes, N° talleres o capacitaciones, Temas tratados, Fechas, Firmas participantes.',
        metaAnual: {
            2026: '2 capacitaciones + 2 talleres',
            2027: '2 capacitaciones + 2 talleres',
            2028: '2 capacitaciones + 2 talleres',
            2029: '2 capacitaciones + 2 talleres',
            2030: '2 capacitaciones + 2 talleres'
        }
    },
    {
        id: 'meta-5',
        dimension: 'recursos',
        nombre: 'Capacitaciones en Convivencia',
        indicador: 'Número de capacitaciones con docentes y asistentes sobre temáticas: convivencia escolar y políticas públicas en educación. Realizar como mínimo 2 capacitaciones anuales.',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia del informe de planificación indicando: Objetivo, Responsables, Participantes, N° capacitaciones, Temas tratados, Fechas, Firmas participantes.',
        metaAnual: {
            2026: '2 capacitaciones anuales',
            2027: '2 capacitaciones anuales',
            2028: '2 capacitaciones anuales',
            2029: '2 capacitaciones anuales',
            2030: '2 capacitaciones anuales'
        }
    },
    {
        id: 'meta-6',
        dimension: 'recursos',
        nombre: 'Reuniones con Organizaciones',
        indicador: 'Número de reuniones con organizaciones externas e internas para promover la participación activa. Realizar como mínimo 2 reuniones por semestre.',
        ponderacion: 4.5,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de la planificación indicando: Objetivo Reunión, N° de actividades, Responsables, Participantes, Temas tratados, Fechas, Firmas participantes.',
        metaAnual: {
            2026: '2 reuniones por semestre',
            2027: '2 reuniones por semestre',
            2028: '2 reuniones por semestre',
            2029: '2 reuniones por semestre',
            2030: '2 reuniones por semestre'
        }
    },

    // Liderazgo (20%)
    {
        id: 'meta-7',
        dimension: 'liderazgo',
        nombre: 'Planificación Directiva',
        indicador: 'Número de planificaciones del director donde organice y distribuya tiempos para tareas administrativas y pedagógicas: formación de equipos, avance PEI, metas PME, objetivos de aprendizaje, cumplimiento normativo.',
        ponderacion: 10,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de la planificación indicando tareas administrativas y pedagógicas, distribución de tiempo, responsables, fechas.\n2. Copia del informe de reunión técnica de evaluación semestral.',
        metaAnual: {
            2026: '2 planificaciones (inicio cada semestre)',
            2027: '2 planificaciones (inicio cada semestre)',
            2028: '2 planificaciones (inicio cada semestre)',
            2029: '2 planificaciones (inicio cada semestre)',
            2030: '2 planificaciones (inicio cada semestre)'
        }
    },
    {
        id: 'meta-8',
        dimension: 'liderazgo',
        nombre: 'Talleres de Altas Expectativas',
        indicador: 'Número de talleres semestrales sobre: cultura de altas expectativas, discusiones técnicas compartiendo desafíos pedagógicos, análisis de dificultades estableciendo procedimientos preventivos.',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de la planificación de los talleres indicando: N° de talleres programados, Objetivo, Responsable, Tema, Nombre y firma de participantes, Fecha.',
        metaAnual: {
            2026: '2 talleres semestrales',
            2027: '2 talleres semestrales',
            2028: '2 talleres semestrales',
            2029: '2 talleres semestrales',
            2030: '2 talleres semestrales'
        }
    },
    {
        id: 'meta-9',
        dimension: 'liderazgo',
        nombre: 'Revisión del PEI',
        indicador: 'Número de sesiones para la revisión y análisis del Proyecto Educativo Institucional. Realizar al menos 1 sesión por semestre.',
        ponderacion: 4,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia del informe de la sesión indicando: Participantes, Fecha/firmas, Quién dirige la sesión, Áreas de mejora, Acciones correctivas, Impacto en la gestión educativa.',
        metaAnual: {
            2026: '1 sesión por semestre',
            2027: '1 sesión por semestre',
            2028: '1 sesión por semestre',
            2029: '1 sesión por semestre',
            2030: '1 sesión por semestre'
        }
    },

    // Convivencia Escolar (20%)
    {
        id: 'meta-10',
        dimension: 'convivencia',
        nombre: 'Talleres de Convivencia',
        indicador: 'Número de talleres donde se implementen acciones para fortalecer los lazos de la comunidad educativa: encuentros familia-escuela, autocuidado y salud mental, valoración a la diversidad e inclusión.',
        ponderacion: 8,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de la planificación de los talleres indicando: Nombre del taller, Acciones implementadas, Actividades realizadas, Responsable, Quiénes participan, Fechas de ejecución, Nómina de asistentes, Material utilizado.',
        metaAnual: {
            2026: '4 talleres anuales',
            2027: '4 talleres anuales',
            2028: '4 talleres anuales',
            2029: '4 talleres anuales',
            2030: '4 talleres anuales'
        }
    },
    {
        id: 'meta-11',
        dimension: 'convivencia',
        nombre: 'Indicadores de Desarrollo Personal',
        indicador: 'Subir o mantener los porcentajes de los indicadores de desarrollo personal y social: Autoestima y motivación escolar (60%), Clima convivencia escolar (60%), Participación y formación ciudadana (60%).',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de la encuesta realizada por cada indicador.\n2. Porcentaje de resultados.\n3. Copia del informe indicando universo de encuestados y reflexión sobre resultados.',
        metaAnual: {
            2026: '60% en cada indicador',
            2027: '65% en cada indicador',
            2028: '70% en cada indicador',
            2029: '75% en cada indicador',
            2030: '75% en cada indicador'
        }
    },
    {
        id: 'meta-12',
        dimension: 'convivencia',
        nombre: 'Talleres de Temas de Convivencia',
        indicador: 'Número de talleres de trabajo relacionados con los indicadores y temas de convivencia escolar. Realizar al menos 2 talleres con temas de convivencia escolar por semestre.',
        ponderacion: 6,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: 'Copia de informe indicando: Objetivo, Tema a trabajar, Quien realiza el taller, Actividades, N° participantes / firmas, Fecha.',
        metaAnual: {
            2026: '2 talleres por semestre',
            2027: '2 talleres por semestre',
            2028: '2 talleres por semestre',
            2029: '2 talleres por semestre',
            2030: '2 talleres por semestre'
        }
    },

    // Resultados (25%)
    {
        id: 'meta-13',
        dimension: 'resultados',
        nombre: 'Matrícula y Asistencia',
        indicador: 'Aumentar progresivamente el porcentaje del indicador de eficiencia interna matrícula y asistencia. Matrícula: ≥ 136 estudiantes. Asistencia: ≥ 60%.',
        ponderacion: 6.25,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de los Registros, bases de datos o índices del establecimiento.\n2. Informes de la Superintendencia de Educación Escolar y de la Agencia de Calidad de la Educación.',
        metaAnual: {
            2026: 'Matrícula ≥ 136, Asistencia ≥ 60%',
            2027: 'Matrícula ≥ 136, Asistencia ≥ 60%',
            2028: 'Matrícula ≥ 137, Asistencia ≥ 61%',
            2029: 'Matrícula ≥ 138, Asistencia ≥ 61%',
            2030: 'Matrícula ≥ 138, Asistencia ≥ 61%'
        }
    },
    {
        id: 'meta-14',
        dimension: 'resultados',
        nombre: 'Promoción y Repitencia',
        indicador: 'Aumentar progresivamente el porcentaje de promoción y disminuir indicador de repitencia. Promoción: ≥ 64.3%. Repitencia: ≤ 10%.',
        ponderacion: 6.25,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de los Registros, bases de datos o índices del establecimiento.\n2. Informes de la Superintendencia de Educación Escolar y de la Agencia de Calidad de la Educación.',
        metaAnual: {
            2026: 'Promoción ≥ 64.3%, Repitencia ≤ 10%',
            2027: 'Promoción ≥ 64.3%, Repitencia ≤ 10%',
            2028: 'Promoción ≥ 65%, Repitencia ≤ 9%',
            2029: 'Promoción ≥ 66%, Repitencia ≤ 9%',
            2030: 'Promoción ≥ 67%, Repitencia ≤ 8%'
        }
    },
    {
        id: 'meta-15',
        dimension: 'resultados',
        nombre: 'Aprobación Lenguaje',
        indicador: 'Porcentaje de aprobación de estudiantes en Comprensión de Lectura asignatura de lenguaje y literatura. Subir o mantener la aprobación del 85%.',
        ponderacion: 5,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de los Registros, bases de datos o índices del establecimiento.\n2. Informes de la Superintendencia de Educación Escolar y de la Agencia de Calidad de la Educación.',
        metaAnual: {
            2026: 'Aprobación ≥ 85%',
            2027: 'Aprobación ≥ 85%',
            2028: 'Aprobación ≥ 85%',
            2029: 'Aprobación ≥ 90%',
            2030: 'Aprobación ≥ 90%'
        }
    },
    {
        id: 'meta-16',
        dimension: 'resultados',
        nombre: 'Aprobación Matemática',
        indicador: 'Porcentaje de aprobación de estudiantes en asignatura de Matemática. Subir o mantener la aprobación del 82%.',
        ponderacion: 7.5,
        avance: 0,
        estado: 'pendiente',
        fechaCumplimiento: '2026-12-15',
        mediosVerificacion: '1. Copia de los Registros, bases de datos o índices del establecimiento.\n2. Informes de la Superintendencia de Educación Escolar y de la Agencia de Calidad de la Educación.',
        metaAnual: {
            2026: 'Aprobación ≥ 82%',
            2027: 'Aprobación ≥ 85%',
            2028: 'Aprobación ≥ 85%',
            2029: 'Aprobación ≥ 88%',
            2030: 'Aprobación ≥ 90%'
        }
    }
];

// Hitos del calendario para el año 2026
const HITOS_INICIALES = [
    // Primer Trimestre
    {
        id: 'hito-1',
        titulo: 'Inicio Año Escolar 2026',
        descripcion: 'Comienzo del período académico y presentación del convenio de desempeño.',
        fecha: '2026-03-02',
        categoria: 'informe',
        responsable: 'Director'
    },
    {
        id: 'hito-2',
        titulo: 'Primera Planificación Semestral',
        descripcion: 'Presentación de planificación del primer semestre con distribución de tareas.',
        fecha: '2026-03-16',
        categoria: 'entrega',
        responsable: 'Director'
    },
    {
        id: 'hito-3',
        titulo: 'Reunión Consejo Escolar',
        descripcion: 'Primera reunión ordinaria del Consejo Escolar 2026.',
        fecha: '2026-03-20',
        categoria: 'reunion',
        responsable: 'Director'
    },
    {
        id: 'hito-4',
        titulo: 'Capacitación Convivencia Escolar',
        descripcion: 'Primera capacitación sobre convivencia escolar y políticas públicas.',
        fecha: '2026-04-10',
        categoria: 'capacitacion',
        responsable: 'Equipo Directivo'
    },
    {
        id: 'hito-5',
        titulo: 'Taller Desarrollo Profesional',
        descripcion: 'Primer taller de desarrollo profesional docente del semestre.',
        fecha: '2026-04-24',
        categoria: 'capacitacion',
        responsable: 'UTP'
    },

    // Segundo Trimestre
    {
        id: 'hito-6',
        titulo: 'Inicio Acompañamiento al Aula',
        descripcion: 'Comienzo del proceso de observación de clases primer semestre.',
        fecha: '2026-05-05',
        categoria: 'evaluacion',
        responsable: 'Equipo Directivo - UTP'
    },
    {
        id: 'hito-7',
        titulo: 'Taller Altas Expectativas',
        descripcion: 'Primer taller semestral sobre cultura de altas expectativas.',
        fecha: '2026-05-20',
        categoria: 'capacitacion',
        responsable: 'Director'
    },
    {
        id: 'hito-8',
        titulo: 'Reunión Organizaciones Externas',
        descripcion: 'Primera reunión con organizaciones externas e internas.',
        fecha: '2026-06-10',
        categoria: 'reunion',
        responsable: 'Director'
    },
    {
        id: 'hito-9',
        titulo: 'Taller Convivencia Familiar',
        descripcion: 'Encuentro familia-escuela sobre convivencia y autocuidado.',
        fecha: '2026-06-25',
        categoria: 'capacitacion',
        responsable: 'Encargado Convivencia'
    },

    // Tercer Trimestre (Fin Primer Semestre)
    {
        id: 'hito-10',
        titulo: 'Sesión Revisión PEI',
        descripcion: 'Primera sesión semestral de revisión y análisis del Proyecto Educativo Institucional.',
        fecha: '2026-07-10',
        categoria: 'evaluacion',
        responsable: 'Director - Equipo Directivo'
    },
    {
        id: 'hito-11',
        titulo: 'Informe Avance Primer Semestre',
        descripcion: 'Entrega de informe de avance de metas primer semestre al sostenedor.',
        fecha: '2026-07-15',
        categoria: 'informe',
        responsable: 'Director'
    },
    {
        id: 'hito-12',
        titulo: 'Visita DAEM - Seguimiento',
        descripcion: 'Primera visita anual del sostenedor para seguimiento de avances.',
        fecha: '2026-07-24',
        categoria: 'evaluacion',
        responsable: 'DAEM - Director'
    },

    // Cuarto Trimestre (Inicio Segundo Semestre)
    {
        id: 'hito-13',
        titulo: 'Segunda Planificación Semestral',
        descripcion: 'Presentación de planificación del segundo semestre.',
        fecha: '2026-08-03',
        categoria: 'entrega',
        responsable: 'Director'
    },
    {
        id: 'hito-14',
        titulo: 'Taller Desarrollo Profesional II',
        descripcion: 'Segundo taller de desarrollo profesional docente del semestre.',
        fecha: '2026-08-20',
        categoria: 'capacitacion',
        responsable: 'UTP'
    },
    {
        id: 'hito-15',
        titulo: 'Aplicación Encuestas IDPS',
        descripcion: 'Aplicación de encuestas de indicadores de desarrollo personal y social.',
        fecha: '2026-09-07',
        categoria: 'evaluacion',
        responsable: 'Encargado Convivencia'
    },
    {
        id: 'hito-16',
        titulo: 'Propuesta Término Relación Laboral',
        descripcion: 'Fecha límite para proponer término de relación laboral docentes (Art. 7° bis).',
        fecha: '2026-09-28',
        categoria: 'entrega',
        responsable: 'Director'
    },

    // Quinto Período
    {
        id: 'hito-17',
        titulo: 'Segunda Capacitación Convivencia',
        descripcion: 'Segunda capacitación anual sobre convivencia escolar.',
        fecha: '2026-10-10',
        categoria: 'capacitacion',
        responsable: 'Equipo Directivo'
    },
    {
        id: 'hito-18',
        titulo: 'Taller Altas Expectativas II',
        descripcion: 'Segundo taller semestral sobre cultura de altas expectativas.',
        fecha: '2026-10-25',
        categoria: 'capacitacion',
        responsable: 'Director'
    },
    {
        id: 'hito-19',
        titulo: 'Reunión Organizaciones II',
        descripcion: 'Segunda reunión semestral con organizaciones externas e internas.',
        fecha: '2026-11-05',
        categoria: 'reunion',
        responsable: 'Director'
    },
    {
        id: 'hito-20',
        titulo: 'Propuesta Personal Contrata',
        descripcion: 'Fecha límite para proponer personal a contrata para el año siguiente.',
        fecha: '2026-11-29',
        categoria: 'entrega',
        responsable: 'Director'
    },
    {
        id: 'hito-21',
        titulo: 'Visita DAEM - Seguimiento Final',
        descripcion: 'Segunda visita anual del sostenedor para seguimiento de avances.',
        fecha: '2026-11-25',
        categoria: 'evaluacion',
        responsable: 'DAEM - Director'
    },

    // Cierre Anual
    {
        id: 'hito-22',
        titulo: 'Sesión Revisión PEI II',
        descripcion: 'Segunda sesión semestral de revisión y análisis del PEI.',
        fecha: '2026-12-05',
        categoria: 'evaluacion',
        responsable: 'Director - Equipo Directivo'
    },
    {
        id: 'hito-23',
        titulo: 'Informe Anual al Sostenedor',
        descripcion: 'Entrega del informe anual de cumplimiento de metas y objetivos del convenio.',
        fecha: '2026-12-15',
        categoria: 'informe',
        responsable: 'Director'
    },
    {
        id: 'hito-24',
        titulo: 'Rendición de Cuentas Consejo Escolar',
        descripcion: 'Informar al Consejo Escolar el grado de cumplimiento de metas y objetivos.',
        fecha: '2026-12-20',
        categoria: 'informe',
        responsable: 'Director'
    },
    {
        id: 'hito-25',
        titulo: 'Cierre Año Escolar 2026',
        descripcion: 'Finalización del período académico 2026.',
        fecha: '2026-12-31',
        categoria: 'informe',
        responsable: 'Director'
    }
];

// Datos de evolución trimestral (para el gráfico)
const EVOLUCION_TRIMESTRAL = {
    2026: {
        trimestres: ['T1', 'T2', 'T3', 'T4'],
        cumplimiento: [0, 0, 0, 0],
        metaMinima: [60, 60, 60, 60]
    },
    2027: {
        trimestres: ['T1', 'T2', 'T3', 'T4'],
        cumplimiento: [0, 0, 0, 0],
        metaMinima: [60, 60, 60, 60]
    },
    2028: {
        trimestres: ['T1', 'T2', 'T3', 'T4'],
        cumplimiento: [0, 0, 0, 0],
        metaMinima: [60, 60, 60, 60]
    },
    2029: {
        trimestres: ['T1', 'T2', 'T3', 'T4'],
        cumplimiento: [0, 0, 0, 0],
        metaMinima: [60, 60, 60, 60]
    },
    2030: {
        trimestres: ['T1', 'T2', 'T3', 'T4'],
        cumplimiento: [0, 0, 0, 0],
        metaMinima: [60, 60, 60, 60]
    }
};

// Información del convenio
const INFO_CONVENIO = {
    titulo: 'Convenio de Desempeño Director',
    establecimiento: 'Escuela Juanita Zúñiga CEIA',
    comuna: 'Parral',
    region: 'Maule',
    sostenedor: 'Ilustre Municipalidad de Parral',
    director: 'Juan José Araya Chandía',
    rutDirector: '12.545.717-7',
    decretoNombramiento: 'Decreto Afecto N° 02513 de diciembre de 2025',
    fechaInicio: '2025-12-09',
    duracion: '5 años (2026-2030)',
    metaMinimaCumplimiento: 60, // Porcentaje mínimo para acreditar cumplimiento
    leyReferencia: 'Ley 20.501'
};

// Nombres de meses en español
const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Categorías de actividades CEIA
const CATEGORIAS_CEIA = {
    consejo: { id: 'consejo', nombre: 'Consejo', color: '#667eea', icon: '👥' },
    administrativo: { id: 'administrativo', nombre: 'Administrativo', color: '#4facfe', icon: '📋' },
    evaluacion: { id: 'evaluacion', nombre: 'Evaluación', color: '#f5576c', icon: '📊' },
    celebracion: { id: 'celebracion', nombre: 'Celebración', color: '#38ef7d', icon: '🎉' },
    entrega: { id: 'entrega', nombre: 'Entrega', color: '#f093fb', icon: '📤' },
    feriado: { id: 'feriado', nombre: 'Feriado', color: '#888888', icon: '🏖️' }
};

// Calendario Anual CEIA 2026
const CALENDARIO_CEIA = [
    // === MARZO ===
    { id: 'ceia-1', fecha: '2026-03-02', titulo: 'Jornada de Organización', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-7' },
    { id: 'ceia-2', fecha: '2026-03-03', titulo: 'Jornada de Organización (Día 2)', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-7' },
    { id: 'ceia-3', fecha: '2026-03-04', titulo: 'Inicio Año Escolar 2026', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-4', fecha: '2026-03-04', titulo: 'Entrega en UTP Planificaciones unidad 0', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-5', fecha: '2026-03-05', titulo: '1° Consejo General de Profesores y Asistentes', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-7' },
    { id: 'ceia-6', fecha: '2026-03-05', titulo: 'Entrega en UTP Prueba Diagnóstico', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-7', fecha: '2026-03-08', titulo: 'Día Internacional de la Mujer', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-8', fecha: '2026-03-09', titulo: 'Inicio Evaluación Diagnóstica', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados' },
    { id: 'ceia-9', fecha: '2026-03-12', titulo: 'Consejo de Profesores: Técnico Pedagógico', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-3' },
    { id: 'ceia-10', fecha: '2026-03-14', titulo: 'Día Contra Del Ciberacoso (Convivencia)', tipo: 'celebracion', esEvidenciaADP: true, dimensionADP: 'convivencia', metaRelacionada: 'meta-12' },
    { id: 'ceia-11', fecha: '2026-03-15', titulo: 'Entrega en UTP Planificaciones Anuales', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-7' },
    { id: 'ceia-12', fecha: '2026-03-17', titulo: '1° Consejo Escolar', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-9' },
    { id: 'ceia-13', fecha: '2026-03-19', titulo: 'Consejo de Profesores: Trabajo Colaborativo PIE', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-3' },
    { id: 'ceia-14', fecha: '2026-03-21', titulo: 'Día Internacional de la eliminación de la discriminación racial (PIE)', tipo: 'celebracion', esEvidenciaADP: true, dimensionADP: 'convivencia' },
    { id: 'ceia-15', fecha: '2026-03-22', titulo: 'Día Mundial del Agua', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-16', fecha: '2026-03-23', titulo: 'Inicio Revisión registro de evaluación UTP', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-3' },

    { id: 'ceia-18', fecha: '2026-03-26', titulo: 'Consejo de Profesores: Trabajo Administrativo', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-19', fecha: '2026-03-26', titulo: 'Entrega en UTP Planificaciones mes de Abril', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-7' },

    // === ABRIL ===
    { id: 'ceia-20', fecha: '2026-04-01', titulo: 'Reunión Equipo de Gestión', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-nuevo-1', fecha: '2026-04-08', titulo: 'Encuentro Familia Escuela (Convivencia/PIE)', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'convivencia', metaRelacionada: 'meta-10' },
    { id: 'ceia-21', fecha: '2026-04-17', titulo: 'Inicio ejecución de Planes Normativos y Coordinación', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-22', fecha: '2026-04-02', titulo: 'Consejo General Profesores y Asistentes', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-7' },
    { id: 'ceia-23', fecha: '2026-04-02', titulo: 'Día Mundial Concienciación Autismo (PIE)', tipo: 'celebracion', esEvidenciaADP: true, dimensionADP: 'convivencia' },
    { id: 'ceia-24', fecha: '2026-04-03', titulo: 'Feriado (Viernes Santo)', tipo: 'feriado', esEvidenciaADP: false },
    { id: 'ceia-25', fecha: '2026-04-06', titulo: 'Inicio 1° Revisión de notas (Unidad 0)', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados' },
    { id: 'ceia-26', fecha: '2026-04-09', titulo: 'Consejo de Profesores: Técnico Pedagógico', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-27', fecha: '2026-04-16', titulo: 'Jornada de Revisión Reglamento Interno', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-28', fecha: '2026-04-20', titulo: 'Inicio Exámenes validación alumnas TP', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados' },
    { id: 'ceia-29', fecha: '2026-04-23', titulo: 'Día Mundial del Libro y Derecho de Autor', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-30', fecha: '2026-04-27', titulo: 'Día del Carabinero', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-31', fecha: '2026-04-29', titulo: 'Día de la Convivencia Escolar', tipo: 'celebracion', esEvidenciaADP: true, dimensionADP: 'convivencia' },
    { id: 'ceia-32', fecha: '2026-04-30', titulo: 'Consejo de Profesores: Trabajo Administrativo', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-33', fecha: '2026-04-30', titulo: 'Entrega en UTP Planificaciones mes de Mayo', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica' },

    // === MAYO ===
    { id: 'ceia-34', fecha: '2026-05-01', titulo: 'Día del Trabajo', tipo: 'feriado', esEvidenciaADP: false },
    { id: 'ceia-35', fecha: '2026-05-04', titulo: 'Comienzo del proceso de acompañamiento al aula', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'pedagogica', metaRelacionada: 'meta-1' },
    { id: 'ceia-36', fecha: '2026-05-04', titulo: 'Inicio 2° Revisión de notas (UTP)', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados' },
    { id: 'ceia-37', fecha: '2026-05-06', titulo: 'Reunión Equipo de Gestión', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-38', fecha: '2026-05-07', titulo: 'Consejo General Profesores y Asistentes', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-39', fecha: '2026-05-08', titulo: 'Día de la integridad en comunidades', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-40', fecha: '2026-05-11', titulo: 'Celebración Día del Estudiante', tipo: 'celebracion', esEvidenciaADP: false },
    { id: 'ceia-42', fecha: '2026-05-14', titulo: 'Consejo de Profesores: Técnico Pedagógico', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-44', fecha: '2026-05-21', titulo: 'Feriado Legal', tipo: 'feriado', esEvidenciaADP: false },
    { id: 'ceia-nuevo-2', fecha: '2026-05-22', titulo: 'Feriado (Interferido)', tipo: 'feriado', esEvidenciaADP: false },

    { id: 'ceia-46', fecha: '2026-05-28', titulo: 'Consejo de Profesores: Trabajo Administrativo', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-47', fecha: '2026-05-25', titulo: 'Inicio Semana de la Seguridad Escolar (PISE)', tipo: 'administrativo', esEvidenciaADP: false },
    { id: 'ceia-48', fecha: '2026-05-28', titulo: 'Simulacro PISE (Día 1)', tipo: 'administrativo', esEvidenciaADP: false },
    { id: 'ceia-49', fecha: '2026-05-29', titulo: 'Simulacro PISE (Día 2)', tipo: 'administrativo', esEvidenciaADP: false },
    { id: 'ceia-50', fecha: '2026-05-28', titulo: 'Entrega en UTP Planificaciones mes de Junio', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica' },

    // === JUNIO ===
    { id: 'ceia-51', fecha: '2026-06-04', titulo: 'Consejo General Profesores y Asistentes', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo' },
    { id: 'ceia-52', fecha: '2026-06-11', titulo: 'Consejo de Profesores: Técnico Pedagógico', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-53', fecha: '2026-06-12', titulo: 'Promedios de notas todas las asignaturas 1° Semestre', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados' },
    { id: 'ceia-nuevo-3', fecha: '2026-06-18', titulo: 'Promedios cerrados 1º Semestre', tipo: 'evaluacion', esEvidenciaADP: true, dimensionADP: 'resultados', metaRelacionada: 'meta-14' },
    { id: 'ceia-54', fecha: '2026-06-12', titulo: '2° Consejo Escolar', tipo: 'consejo', esEvidenciaADP: true, dimensionADP: 'liderazgo', metaRelacionada: 'meta-9' },
    { id: 'ceia-55', fecha: '2026-06-18', titulo: 'Último día clases estudiantes 1° Semestre', tipo: 'administrativo', esEvidenciaADP: false },
    { id: 'ceia-56', fecha: '2026-06-19', titulo: 'Jornada Evaluación y Planificación 2° Sem', tipo: 'administrativo', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-57', fecha: '2026-06-19', titulo: 'Entrega en UTP Planificaciones mes de Julio', tipo: 'entrega', esEvidenciaADP: true, dimensionADP: 'pedagogica' },
    { id: 'ceia-58', fecha: '2026-06-22', titulo: 'Inicio Periodo de vacaciones de invierno', tipo: 'feriado', esEvidenciaADP: false },

    // === JULIO ===
    { id: 'ceia-59', fecha: '2026-07-03', titulo: 'Fin Periodo de vacaciones de invierno', tipo: 'feriado', esEvidenciaADP: false },
    { id: 'ceia-60', fecha: '2026-07-06', titulo: 'Inicio de clases 2° Semestre 2026', tipo: 'celebracion', esEvidenciaADP: false }
];

// Exportar datos para uso global
if (typeof window !== 'undefined') {
    window.DIMENSIONES = DIMENSIONES;
    window.ESTADOS = ESTADOS;
    window.CATEGORIAS_HITOS = CATEGORIAS_HITOS;
    window.CATEGORIAS_CEIA = CATEGORIAS_CEIA;
    window.METAS_INICIALES = METAS_INICIALES;
    window.HITOS_INICIALES = HITOS_INICIALES;
    window.CALENDARIO_CEIA = CALENDARIO_CEIA;
    window.EVOLUCION_TRIMESTRAL = EVOLUCION_TRIMESTRAL;
    window.INFO_CONVENIO = INFO_CONVENIO;
    window.MESES = MESES;
}
