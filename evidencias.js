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
    }
];

if (typeof window !== 'undefined') {
    window.EVIDENCIAS_ADP = EVIDENCIAS_ADP;
    window.ESTADOS_EVIDENCIA = ESTADOS_EVIDENCIA;
}
