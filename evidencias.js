/**
 * Panel de Gestión ADP - Evidencias documentales (fotos de informes, oficios y planificaciones)
 * Convenio de Desempeño Director - CEIA 2026-2030
 *
 * Cómo agregar una evidencia nueva:
 *  1. Guardar la imagen (jpg comprimido) en la carpeta evidencias/.
 *  2. Agregar un objeto a EVIDENCIAS_ADP con su meta (metaId) y, si existe,
 *     la actividad del Calendario CEIA (actividadId, ver data.js).
 *
 * Estos datos se leen siempre desde este archivo (no se guardan en Google Sheets),
 * por lo que no se pierden al sincronizar.
 */

const ESTADOS_EVIDENCIA = {
    realizada: { id: 'realizada', nombre: 'Realizada', color: '#38ef7d' },
    reprogramada: { id: 'reprogramada', nombre: 'Reprogramada', color: '#ffb347' },
    planificada: { id: 'planificada', nombre: 'Planificación', color: '#4facfe' }
};

const EVIDENCIAS_ADP = [
    // === MARZO ===
    {
        id: 'ev-2026-03-rice',
        titulo: 'Taller de socialización del Reglamento Interno de Convivencia Escolar (RICE)',
        tipoDocumento: 'Informe de actividades Convenio ADP',
        fecha: '2026-03-11',
        fechaTexto: '11 de marzo de 2026',
        metaId: 'meta-12',
        actividadId: 'ceia-ev-rice',
        indicadorDocumento: 'Indicador 3: N° de talleres de trabajo relacionados con los indicadores y temas de convivencia escolar.',
        estado: 'realizada',
        participantes: '78 participantes',
        responsable: 'Equipo de Convivencia Escolar y Profesor/a Jefe',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Socialización del RICE con los estudiantes mediante diálogo participativo. Se concluye que la actividad cumplió su objetivo y se adjunta lista de asistencia y PPT.',
        imagenes: [
            { src: 'evidencias/2026-03_informe_taller_rice.jpg', descripcion: 'Informe taller RICE (11-03-2026)' }
        ]
    },
    {
        id: 'ev-2026-03-rrss',
        titulo: 'Taller de buen uso de las redes sociales (RRSS)',
        tipoDocumento: 'Informe de actividades Convenio ADP',
        fecha: '2026-03-15',
        fechaTexto: '15 de marzo de 2026',
        metaId: 'meta-12',
        actividadId: 'ceia-10',
        indicadorDocumento: 'Indicador 3: N° de talleres de trabajo relacionados con los indicadores y temas de convivencia escolar.',
        estado: 'realizada',
        participantes: '78 estudiantes',
        responsable: 'Equipo de Convivencia Escolar y Profesor/a Jefe',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Taller para que los estudiantes reconozcan y promuevan el uso responsable de las redes sociales, en el marco del Día contra el Ciberacoso. Participación activa y mayor conciencia sobre respeto y privacidad digital.',
        imagenes: [
            { src: 'evidencias/2026-03_informe_taller_redes_sociales.jpg', descripcion: 'Informe taller redes sociales (15-03-2026)' }
        ]
    },

    // === ABRIL ===
    {
        id: 'ev-2026-04-familia-escuela',
        titulo: 'Planificación Encuentro Familia–Escuela',
        tipoDocumento: 'Planificación de taller',
        fecha: '2026-04-08',
        fechaTexto: '8 de abril de 2026',
        metaId: 'meta-10',
        actividadId: 'ceia-nuevo-1',
        indicadorDocumento: 'Encuentros familia-escuela (fortalecer lazos de la comunidad educativa).',
        estado: 'planificada',
        participantes: 'Apoderados y familias de estudiantes',
        responsable: 'Equipo de Convivencia Escolar / Equipo Directivo',
        firmante: '',
        resumen: 'Planificación del encuentro (60 min): objetivos, contenidos, metodología, desarrollo de la actividad, evaluación (registro de acuerdos y lista de asistencia) y resultados esperados.',
        imagenes: [
            { src: 'evidencias/2026-04_planificacion_encuentro_familia_escuela_p1.jpg', descripcion: 'Planificación Encuentro Familia–Escuela, página 1' },
            { src: 'evidencias/2026-04_planificacion_encuentro_familia_escuela_p2.jpg', descripcion: 'Planificación Encuentro Familia–Escuela, página 2' }
        ]
    },
    {
        id: 'ev-2026-04-charla-pie',
        titulo: 'Charla "¿Qué es el PIE? ¿Cómo me beneficia?" (reprogramada a noviembre)',
        tipoDocumento: 'Informe de actividades Convenio ADP + oficio de reprogramación',
        fecha: '2026-04-30',
        fechaTexto: 'Abril 2026, reprogramada a noviembre (Semana de la Inclusión). Oficio del 31-08-2026',
        metaId: 'meta-10',
        actividadId: 'ceia-ev-charla-pie',
        indicadorDocumento: 'Indicador 1: Valoración a la diversidad e inclusión.',
        estado: 'reprogramada',
        participantes: '0 (no se realizó en abril)',
        responsable: 'Equipo Programa de Integración Escolar (Coordinadora PIE, Enc. Plan de Inclusión)',
        firmante: 'Ingrid Sepúlveda Fuentes, Trabajadora Social, Encargada Convivencia Educativa',
        resumen: 'La charla se reprograma para noviembre, dentro de la Semana de la Inclusión, porque el equipo PIE estaba en proceso de pesquisa y evaluación de estudiantes. Reprogramación informada al director por oficio (Ley 21.809, art. 16 G, Plan de Gestión de Convivencia Educativa).',
        imagenes: [
            { src: 'evidencias/2026-04_informe_charla_pie.jpg', descripcion: 'Informe charla PIE (abril, 0 participantes)' },
            { src: 'evidencias/2026-08_oficio_reprogramacion_charla_pie.jpg', descripcion: 'Oficio de reprogramación con timbre de Dirección' },
            { src: 'evidencias/2026-08_oficio_reprogramacion_charla_pie_2.jpg', descripcion: 'Oficio de reprogramación (segunda toma)' }
        ]
    },

    // === JULIO / AGOSTO ===
    {
        id: 'ev-2026-08-beneficios',
        titulo: 'Talleres informativos sobre beneficios y apoyos estudiantiles',
        tipoDocumento: 'Informe de actividades Convenio ADP',
        fecha: '2026-08-31',
        fechaTexto: 'Julio y agosto de 2026',
        metaId: 'meta-10',
        actividadId: 'ceia-ev-beneficios',
        indicadorDocumento: 'Indicador 1: N° de talleres donde se implementen acciones y actividades para fortalecer los lazos de todos los miembros de la comunidad educativa.',
        estado: 'realizada',
        participantes: '42 estudiantes (según conclusiones; el informe indica 75 en "Total de participantes")',
        responsable: 'Asistente Social / Encargada SAAT',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Talleres y espacios de orientación para dar a conocer los beneficios estudiantiles, favoreciendo permanencia y trayectoria educativa. Fortaleció la cercanía y confianza entre estudiantes y profesionales.',
        imagenes: [
            { src: 'evidencias/2026-08_informe_beneficios_estudiantiles.jpg', descripcion: 'Informe talleres de beneficios estudiantiles (julio-agosto)' }
        ]
    },
    {
        id: 'ev-2026-08-violencia-genero',
        titulo: 'Taller de prevención de la violencia de género',
        tipoDocumento: 'Informe de actividades Convenio ADP',
        fecha: '2026-08-31',
        fechaTexto: 'Agosto de 2026',
        metaId: 'meta-12',
        actividadId: 'ceia-ev-violencia-genero',
        indicadorDocumento: 'Indicador 3: N° de talleres de trabajo relacionados con los indicadores y temas de convivencia escolar.',
        estado: 'realizada',
        participantes: 'No legible en el documento escaneado',
        responsable: 'Encargada Plan de Sexualidad, Afectividad y Género',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Reflexión y sensibilización sobre la violencia de género, sus manifestaciones y factores de riesgo, promoviendo el respeto, la igualdad y relaciones libres de violencia.',
        imagenes: [
            { src: 'evidencias/2026-08_informe_taller_violencia_genero.jpg', descripcion: 'Informe taller violencia de género (agosto)' }
        ]
    },

    // === OCTUBRE ===
    {
        id: 'ev-2026-10-aniversario',
        titulo: 'Actividades de aniversario: participación, integración y sana convivencia',
        tipoDocumento: 'Informe de actividades ADP',
        fecha: '2026-10-19',
        fechaTexto: '19 al 22 de octubre (1 actividad diaria) y 26 de octubre de 2026 (todo el día)',
        metaId: 'meta-12',
        actividadId: 'ceia-ev-aniversario',
        indicadorDocumento: 'Indicador 3: N° de talleres relacionados con convivencia escolar.',
        estado: 'realizada',
        participantes: '120 en diversos días y jornadas',
        responsable: 'Equipo PIE',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Actividades recreativas, deportivas, artísticas y culturales de aniversario que fortalecieron la participación, el sentido de pertenencia, la identidad institucional y el trabajo colaborativo.',
        imagenes: [
            { src: 'evidencias/2026-10_informe_aniversario.jpg', descripcion: 'Informe actividades de aniversario (octubre)' }
        ]
    },
    {
        id: 'ev-2026-10-relaciones-sanas',
        titulo: 'Taller "Relaciones sanas y libres de violencia" (reprogramado a noviembre)',
        tipoDocumento: 'Informe de actividades ADP',
        fecha: '2026-10-30',
        fechaTexto: 'Octubre 2026, reprogramado a noviembre (Semana de la Inclusión)',
        metaId: 'meta-12',
        actividadId: 'ceia-ev-relaciones-sanas',
        indicadorDocumento: 'Indicador 3: N° de talleres relacionados con convivencia escolar.',
        estado: 'reprogramada',
        participantes: '54 (según informe)',
        responsable: 'Encargada Plan de Sexualidad, Afectividad y Género',
        firmante: 'Ingrid Sepúlveda Fuentes, Coordinadora Convivencia Educativa',
        resumen: 'Espacio de reflexión sobre relaciones interpersonales basadas en el respeto, la confianza y el buen trato. Las conclusiones indican que se reprograma para noviembre (Semana de la Inclusión) por el proceso de pesquisa del equipo PIE.',
        imagenes: [
            { src: 'evidencias/2026-10_informe_taller_relaciones_sanas.jpg', descripcion: 'Informe taller relaciones sanas (octubre)' }
        ]
    },,
    // === ACTAS DE CONSEJOS DE PROFESORES 2026 (agregadas 25-11-2026) ===,
    // Nombres de estudiantes reemplazados por iniciales y direcciones internas ocultas antes de publicar.,
    {
        id: "ev-acta-2026-03-12",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: organización de consejos y normativa del libro de clases",
        tipoDocumento: "Acta de Consejo de Profesores",
        fecha: "2026-03-12",
        fechaTexto: "12 de marzo de 2026",
        metaId: "meta-7",
        metasRelacionadas: ["meta-13"],
        actividadId: "ceia-9",
        indicadorDocumento: "Planificación directiva: organización de tiempos y espacios de trabajo, cumplimiento normativo. Aporta a matrícula (diagnóstico de matrícula baja).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina ni firmas en el acta)",
        responsable: "Dirección / UTP. Secretario de actas: Guillermo Sepúlveda Maureira",
        firmante: '',
        resumen: "Se designa secretario de actas y se define la estructura de consejos (General, Técnico Pedagógico, Trabajo Colaborativo UTP-PIE y Técnico Administrativo). Normativa del libro de clases como instrumento público, protocolo de evaluación, permisos y matrícula baja.",
        pdf: "evidencias/actas/2026-03-12_acta_consejo_profesores.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-03-12_acta_consejo_profesores-1.jpg", descripcion: "Acta 12 de marzo de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-03-12_acta_consejo_profesores-2.jpg", descripcion: "Acta 12 de marzo de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-03-19",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores con PIE: trabajo colaborativo UTP–PIE",
        tipoDocumento: "Acta de Consejo de Trabajo Colaborativo (PIE)",
        fecha: "2026-03-19",
        fechaTexto: "19 de marzo de 2026",
        metaId: "meta-3",
        metasRelacionadas: ["meta-10"],
        actividadId: "ceia-13",
        indicadorDocumento: "Reflexión pedagógica y trabajo colaborativo (UTP–PIE). Aporta a salud mental e inclusión (Meta 10).",
        estado: 'realizada',
        participantes: "Equipo PIE, Coordinación PIE, Psicóloga y docentes",
        responsable: "Coordinadora PIE Betzabé González Bustos",
        firmante: '',
        resumen: "Reflexión inicial sobre el quehacer docente y el agotamiento profesional; acuerdos UTP–PIE sobre apoyo en aula y evaluaciones; reporte de casos y aumento de crisis de pánico; normativa de uso de celulares; nombramiento de coordinadora TP.",
        pdf: "evidencias/actas/2026-03-19_acta_consejo_pie.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-03-19_acta_consejo_pie-1.jpg", descripcion: "Acta 19 de marzo de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-03-19_acta_consejo_pie-2.jpg", descripcion: "Acta 19 de marzo de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-03-26",
        tipoEvidencia: 'acta',
        titulo: "Consejo Técnico Administrativo: SLEP, reglamento de evaluación y SAAT",
        tipoDocumento: "Acta de Consejo Técnico Administrativo",
        fecha: "2026-03-26",
        fechaTexto: "26 de marzo de 2026",
        metaId: "meta-7",
        metasRelacionadas: ["meta-6", "meta-13"],
        actividadId: "ceia-18",
        indicadorDocumento: "Planificación y cumplimiento normativo; vínculo con organizaciones (SLEP / Consejo Local); acciones de matrícula y asistencia (SAAT).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Dirección; expone Jefe UTP Pablo Palma",
        firmante: '',
        resumen: "Conformación del Consejo Local de Educación Pública (representante: Juan Pablo Ramírez); reloj control SLEP; exposición del Reglamento de Evaluación (arts. 6, 9 y 10); capacitación ACHS; plataforma SAAT operativa con alertas por inasistencia; retiro de estudiantes con inasistencia prolongada; difusión de matrícula en redes sociales.",
        pdf: "evidencias/actas/2026-03-26_acta_consejo_tecnico_administrativo.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-03-26_acta_consejo_tecnico_administrativo-1.jpg", descripcion: "Acta 26 de marzo de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-03-26_acta_consejo_tecnico_administrativo-2.jpg", descripcion: "Acta 26 de marzo de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-04-02",
        tipoEvidencia: 'acta',
        titulo: "Consejo General: constitución del Consejo Escolar 2026 y metas ADP",
        tipoDocumento: "Acta de Consejo General / Consejo Escolar",
        fecha: "2026-04-02",
        fechaTexto: "2 de abril de 2026",
        metaId: "meta-7",
        metasRelacionadas: ["meta-9", "meta-6", "meta-13"],
        actividadId: "ceia-22",
        indicadorDocumento: "Planificación directiva: socialización de metas ADP/PADEM. Aporta a revisión del PEI (visión y sellos) y vínculo con organizaciones.",
        estado: 'realizada',
        participantes: "Consejo Escolar: Director Juan José Araya Chandía, representante SLEP, docentes, asistentes y estudiantes",
        responsable: "Director Juan José Araya Chandía",
        firmante: '',
        resumen: "Constitución del Consejo Escolar 2026; Cuenta Pública 2025 (17-03-2026); visión y sellos del PEI; Plan de Reactivación PADEM 2026 y presentación de metas de desempeño ADP (aprobación 64,3%, acompañamiento 75%, matrícula 136, asistencia 60%); infraestructura y seguridad.",
        pdf: "evidencias/actas/2026-04-02_acta_consejo_general.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-04-02_acta_consejo_general-1.jpg", descripcion: "Acta 2 de abril de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-04-02_acta_consejo_general-2.jpg", descripcion: "Acta 2 de abril de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-04-09",
        tipoEvidencia: 'acta',
        titulo: "Consejo Técnico Pedagógico: capacitación plataforma SAAT",
        tipoDocumento: "Acta de Consejo Técnico Pedagógico",
        fecha: "2026-04-09",
        fechaTexto: "9 de abril de 2026",
        metaId: "meta-2",
        metasRelacionadas: ["meta-4", "meta-12"],
        actividadId: "ceia-26",
        indicadorDocumento: "Taller/capacitación interna con herramienta innovadora (SAAT). Cuenta para el plan de capacitaciones (Meta 4).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "UTP; capacitan Jimena Arriagada (SAAT) y Daniel Scarlazeta",
        firmante: '',
        resumen: "Inducción y creación de usuarios en la plataforma SAAT (Sistema de Alerta y Acompañamiento Temprano). Convivencia anuncia revisión formativa del Reglamento Interno. Revisión de libros de clases, ajuste de recreos, matrícula y calefacción.",
        pdf: "evidencias/actas/2026-04-09_acta_consejo_saat.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-04-09_acta_consejo_saat-1.jpg", descripcion: "Acta 9 de abril de 2026, página 1 de 3" },
            { src: "evidencias/actas/2026-04-09_acta_consejo_saat-2.jpg", descripcion: "Acta 9 de abril de 2026, página 2 de 3" },
            { src: "evidencias/actas/2026-04-09_acta_consejo_saat-3.jpg", descripcion: "Acta 9 de abril de 2026, página 3 de 3" }
        ]
    },
    {
        id: "ev-acta-2026-04-23",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: SAAT, PIE y directrices de Dirección",
        tipoDocumento: "Acta de Consejo de Profesores",
        fecha: "2026-04-23",
        fechaTexto: "23 de abril de 2026",
        metaId: "meta-7",
        metasRelacionadas: ["meta-10", "meta-13"],
        actividadId: "ceia-ev-acta-2026-04-23",
        indicadorDocumento: "Directrices de gestión y cumplimiento normativo; apoyo a estudiantes (beneficios, inclusión); registro de asistencia.",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Dirección",
        firmante: '',
        resumen: "Canastas de ayuda SAAT y pesquisa de estudiantes; 34 estudiantes PIE con valoración pendiente e ingreso de especialistas al aula (30-04); directrices de asistencia (lista 5 minutos antes) y circulares de salida al baño y protocolo ante amenazas; Día del Estudiante.",
        pdf: "evidencias/actas/2026-04-23_acta_consejo_profesores.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-04-23_acta_consejo_profesores-1.jpg", descripcion: "Acta 23 de abril de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-04-23_acta_consejo_profesores-2.jpg", descripcion: "Acta 23 de abril de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-05-07",
        tipoEvidencia: 'acta',
        titulo: "Consejo General: trabajo colaborativo en el Proyecto Institucional por estamentos",
        tipoDocumento: "Acta de Consejo General de Profesores",
        fecha: "2026-05-07",
        fechaTexto: "7 de mayo de 2026",
        metaId: "meta-9",
        metasRelacionadas: ["meta-7"],
        actividadId: "ceia-38",
        indicadorDocumento: "Sesión de revisión y análisis del PEI/PI (1° semestre).",
        estado: 'realizada',
        participantes: "Docentes, asistentes de la educación profesionales, servicios menores y PIE (mesas por estamento)",
        responsable: "Director",
        firmante: '',
        resumen: "Objetivo principal: trabajo colaborativo en el Proyecto Institucional (PI) en mesas por estamento para introducir mejoras. Además: visita pedagógica de Cristian Catricura (SLEP), supervisión de clases UTP, permisos administrativos, remuneraciones y seguridad.",
        pdf: "evidencias/actas/2026-05-07_acta_consejo_general_pei.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-05-07_acta_consejo_general_pei-1.jpg", descripcion: "Acta 7 de mayo de 2026, página 1 de 1" }
        ]
    },
    {
        id: "ev-acta-2026-05-28",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: acompañamiento al aula y registro de asistencia",
        tipoDocumento: "Acta de Consejo de Profesores",
        fecha: "2026-05-28",
        fechaTexto: "28 de mayo de 2026",
        metaId: "meta-1",
        metasRelacionadas: ["meta-13"],
        actividadId: "ceia-46",
        indicadorDocumento: "Planificación y pauta del acompañamiento al aula (Meta 1). Registro de asistencia (Meta 13).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Jefe de UTP",
        firmante: '',
        resumen: "UTP anuncia el acompañamiento al aula alineado con estándares de la Agencia de Calidad (gestión del tiempo, ambiente socioafectivo y aprendizaje profundo) con visitas coordinadas, y presenta una plataforma web de prácticas docentes. Docentes rechazan el registro de asistencia \"solo puntitos\". Elecciones del Centro de Estudiantes.",
        pdf: "evidencias/actas/2026-05-28_acta_consejo_profesores.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-05-28_acta_consejo_profesores-1.jpg", descripcion: "Acta 28 de mayo de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-05-28_acta_consejo_profesores-2.jpg", descripcion: "Acta 28 de mayo de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-06-04",
        tipoEvidencia: 'acta',
        titulo: "Consejo General: encuesta de autoevaluación y compromiso laboral (PEI)",
        tipoDocumento: "Acta de Consejo General de Profesores",
        fecha: "2026-06-04",
        fechaTexto: "4 de junio de 2026",
        metaId: "meta-9",
        metasRelacionadas: ["meta-13", "meta-6"],
        actividadId: "ceia-51",
        indicadorDocumento: "Actividad del PEI (percepción de funcionarios). Asistencia y retención (Meta 13). Convenio con organización externa (Meta 6).",
        estado: 'realizada',
        participantes: "Funcionarios del establecimiento (encuesta anónima)",
        responsable: "Director",
        firmante: '',
        resumen: "Aplicación de encuesta anónima de autoevaluación y compromiso laboral en el marco del PEI. Dirección decreta retorno inmediato a la toma de asistencia real; estrategias de retención; convenio con Escuela Cárcel (4° Electricidad); avance 50% proyectos SAAT y oficios eléctricos.",
        pdf: "evidencias/actas/2026-06-04_acta_consejo_general.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-06-04_acta_consejo_general-1.jpg", descripcion: "Acta 4 de junio de 2026, página 1 de 3" },
            { src: "evidencias/actas/2026-06-04_acta_consejo_general-2.jpg", descripcion: "Acta 4 de junio de 2026, página 2 de 3" },
            { src: "evidencias/actas/2026-06-04_acta_consejo_general-3.jpg", descripcion: "Acta 4 de junio de 2026, página 3 de 3" }
        ]
    },
    {
        id: "ev-acta-2026-06-11",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: resultados del acompañamiento docente y vinculación TP",
        tipoDocumento: "Acta de Consejo Técnico Pedagógico",
        fecha: "2026-06-11",
        fechaTexto: "11 de junio de 2026",
        metaId: "meta-1",
        metasRelacionadas: ["meta-6"],
        actividadId: "ceia-52",
        indicadorDocumento: "Evidencia de ejecución y retroalimentación del acompañamiento al aula (Meta 1). Reuniones con organizaciones externas (Meta 6).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Jefe de UTP; expone Coordinadora TP María Angélica Moya",
        firmante: '',
        resumen: "UTP informa resultados de las visitas al aula y el proceso de retroalimentación, con espacio para la opinión de los docentes observados. Avance SAAT (reportes de notas). Vinculación con INACAP y CFT del Maule (charla de primeros auxilios). Cierre de semestre y titularidad docente.",
        pdf: "evidencias/actas/2026-06-11_acta_consejo_profesores.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-06-11_acta_consejo_profesores-1.jpg", descripcion: "Acta 11 de junio de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-06-11_acta_consejo_profesores-2.jpg", descripcion: "Acta 11 de junio de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-07-09",
        tipoEvidencia: 'acta',
        titulo: "Consejo General: inicio del 2° semestre y protocolo de uso de celulares",
        tipoDocumento: "Acta de Consejo General de Profesores",
        fecha: "2026-07-09",
        fechaTexto: "9 de julio de 2026",
        metaId: "meta-7",
        metasRelacionadas: ["meta-12", "meta-13"],
        actividadId: "ceia-ev-acta-2026-07-09",
        indicadorDocumento: "Planificación del 2° semestre. Socialización de protocolo de convivencia (Meta 12). Captación de matrícula (Meta 13).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Director y Jefe de UTP",
        firmante: '',
        resumen: "Bienvenida al 2° semestre; dos furgones para captación de estudiantes; subvención EPJA; Convivencia Educativa (Ingrid Sepúlveda) presenta el nuevo protocolo de uso de celulares; anuncio de charla de afectividad y equidad de género (23-07) y charla FALP.",
        pdf: "evidencias/actas/2026-07-09_acta_consejo_general.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-07-09_acta_consejo_general-1.jpg", descripcion: "Acta 9 de julio de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-07-09_acta_consejo_general-2.jpg", descripcion: "Acta 9 de julio de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-07-23",
        tipoEvidencia: 'acta',
        titulo: "Capacitación docente: Plan de afectividad, sexualidad y género",
        tipoDocumento: "Acta de Consejo de Profesores (capacitación)",
        fecha: "2026-07-23",
        fechaTexto: "23 de julio de 2026",
        metaId: "meta-5",
        metasRelacionadas: ["meta-12", "meta-4"],
        actividadId: "ceia-ev-acta-2026-07-23",
        indicadorDocumento: "Capacitación a docentes en temática de convivencia escolar (Meta 5). Tema de convivencia (Meta 12).",
        estado: 'realizada',
        participantes: "Cuerpo docente, jefe de UTP, Dirección, coordinación vespertina y equipo psicosocial",
        responsable: "Jefe de UTP; capacitan psicóloga Constanza Leiva, María José Rojas y Javier Zobarzo",
        firmante: '',
        resumen: "Capacitación técnica a docentes en educación sexoafectiva e identidad de género, para un acompañamiento inclusivo y el respeto a la diversidad, fortaleciendo la convivencia escolar. Además: cierre de notas, análisis de casos de estudiantes y política de atrasos.",
        pdf: "evidencias/actas/2026-07-23_acta_consejo_afectividad_genero.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-07-23_acta_consejo_afectividad_genero-1.jpg", descripcion: "Acta 23 de julio de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-07-23_acta_consejo_afectividad_genero-2.jpg", descripcion: "Acta 23 de julio de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-07-30",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: intervención de Convivencia Escolar y flujograma de denuncia",
        tipoDocumento: "Acta de Consejo de Profesores",
        fecha: "2026-07-30",
        fechaTexto: "30 de julio de 2026",
        metaId: "meta-12",
        metasRelacionadas: ["meta-5", "meta-6"],
        actividadId: "ceia-ev-acta-2026-07-30",
        indicadorDocumento: "Trabajo con docentes sobre protocolos de convivencia (Meta 12 / Meta 5). Vinculación con INACAP y UCM (Meta 6).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Jefe de UTP; exponen Inspectora General María Canales y Asistente Social Ingrid Sepúlveda",
        firmante: '',
        resumen: "Convivencia Escolar aclara un caso de convivencia, explica la activación de protocolos con evidencia en el libro de clases y entrega un flujograma de denuncia interna. Seguridad y disciplina en 1° y 2° Electricidad; salida a INACAP (06-08), visita UCM (20-08) y registro de exalumnos.",
        pdf: "evidencias/actas/2026-07-30_acta_consejo_convivencia.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-07-30_acta_consejo_convivencia-1.jpg", descripcion: "Acta 30 de julio de 2026, página 1 de 2" },
            { src: "evidencias/actas/2026-07-30_acta_consejo_convivencia-2.jpg", descripcion: "Acta 30 de julio de 2026, página 2 de 2" }
        ]
    },
    {
        id: "ev-acta-2026-08-06",
        tipoEvidencia: 'acta',
        titulo: "Consejo General: charla FALP y balance de la salida pedagógica a INACAP",
        tipoDocumento: "Acta de Consejo General de Profesores",
        fecha: "2026-08-06",
        fechaTexto: "6 de agosto de 2026",
        metaId: "meta-6",
        metasRelacionadas: ["meta-7"],
        actividadId: "ceia-ev-acta-2026-08-06",
        indicadorDocumento: "Reunión/actividad con organizaciones externas: FALP e INACAP (Meta 6).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Director Juan José Araya",
        firmante: '',
        resumen: "Charla de la FALP sobre convenios y beneficios oncológicos. Balance de la salida pedagógica a INACAP (3° y 4° Eléctrico, 3° y 4° Párvulo y 5 estudiantes vespertinos) con excelente comportamiento. Entrega de informes de notas y lineamientos sobre comentarios entre funcionarios.",
        pdf: "evidencias/actas/2026-08-06_acta_consejo_general.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-08-06_acta_consejo_general-1.jpg", descripcion: "Acta 6 de agosto de 2026, página 1 de 1" }
        ]
    },
    {
        id: "ev-acta-2026-08-13",
        tipoEvidencia: 'acta',
        titulo: "Segunda Jornada Nacional de Reflexión Pedagógica (Plan Local de Formación)",
        tipoDocumento: "Acta de Consejo de Reflexión Pedagógica",
        fecha: "2026-08-13",
        fechaTexto: "13 de agosto de 2026",
        metaId: "meta-3",
        metasRelacionadas: ["meta-2", "meta-4"],
        actividadId: "ceia-ev-acta-2026-08-13",
        indicadorDocumento: "Reflexión pedagógica colaborativa (Meta 3). Insumo para talleres de desarrollo profesional y plan de capacitaciones (Metas 2 y 4).",
        estado: 'realizada',
        participantes: "Cuerpo docente",
        responsable: "Jefe de UTP",
        firmante: '',
        resumen: "Jornada de reflexión adelantada del 14 al 13 de agosto: análisis de fortalezas y necesidades de desarrollo profesional, priorización y diseño preliminar del Plan Local de Formación (objetivos, estrategias, acciones, responsables). Sala de Tatami y yoga, aniversario, cámaras en talleres, Fiestas Patrias y registro de un accidente escolar.",
        pdf: "evidencias/actas/2026-08-13_acta_reflexion_pedagogica.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-08-13_acta_reflexion_pedagogica-1.jpg", descripcion: "Acta 13 de agosto de 2026, página 1 de 4" },
            { src: "evidencias/actas/2026-08-13_acta_reflexion_pedagogica-2.jpg", descripcion: "Acta 13 de agosto de 2026, página 2 de 4" },
            { src: "evidencias/actas/2026-08-13_acta_reflexion_pedagogica-3.jpg", descripcion: "Acta 13 de agosto de 2026, página 3 de 4" },
            { src: "evidencias/actas/2026-08-13_acta_reflexion_pedagogica-4.jpg", descripcion: "Acta 13 de agosto de 2026, página 4 de 4" }
        ]
    },
    {
        id: "ev-acta-2026-08-20",
        tipoEvidencia: 'acta',
        titulo: "Consejo de Profesores: encuesta DPD, vinculación con el medio y convivencia",
        tipoDocumento: "Acta de Consejo de Profesores",
        fecha: "2026-08-20",
        fechaTexto: "20 de agosto de 2026",
        metaId: "meta-6",
        metasRelacionadas: ["meta-11", "meta-12"],
        actividadId: "ceia-ev-acta-2026-08-20",
        indicadorDocumento: "Vinculación con organizaciones externas (Meta 6). Aplicación de encuesta a docentes y estudiantes (Meta 11). Convivencia (Meta 12).",
        estado: 'realizada',
        participantes: "Cuerpo docente (sin nómina)",
        responsable: "Director",
        firmante: '',
        resumen: "Encuesta DPD respondida solo por 2 docentes: plazo hasta el 26-08 y aplicación a estudiantes en sala de computación. Charla UCM (24-09), taller de alternancia y Puertas Abiertas con CFT Maule y Liceo Federico Heise (03-09), feria vocacional Red Achibueno (24-08). Orientaciones psicosociales para 1° y 2° Electricidad y cambios al protocolo de celulares. Acuerdo por votación sobre nota del desfile.",
        pdf: "evidencias/actas/2026-08-20_acta_consejo_profesores.pdf",
        imagenes: [
            { src: "evidencias/actas/2026-08-20_acta_consejo_profesores-1.jpg", descripcion: "Acta 20 de agosto de 2026, página 1 de 3" },
            { src: "evidencias/actas/2026-08-20_acta_consejo_profesores-2.jpg", descripcion: "Acta 20 de agosto de 2026, página 2 de 3" },
            { src: "evidencias/actas/2026-08-20_acta_consejo_profesores-3.jpg", descripcion: "Acta 20 de agosto de 2026, página 3 de 3" }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.EVIDENCIAS_ADP = EVIDENCIAS_ADP;
    window.ESTADOS_EVIDENCIA = ESTADOS_EVIDENCIA;
}
