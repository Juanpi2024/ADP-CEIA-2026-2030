/**
 * Asistente ADP - chatbot de evidencias (basado en reglas, funciona sin conexión ni clave)
 * Convenio de Desempeño Director - CEIA 2026-2030
 *
 * Responde con los datos de data.js (metas, calendario) y evidencias.js:
 *  - ¿Qué evidencias me faltan? (por meta, según lo exigido para el año en curso)
 *  - ¿A qué meta corresponde este documento/actividad? (clasificación por palabras clave)
 *  - Detalle de una meta: indicador, medios de verificación y evidencias cargadas
 *
 * Modo IA: las preguntas se envían al mismo Google Apps Script de la app (acción 'chat'),
 * que llama a OpenAI con la clave guardada en sus Propiedades del script.
 * La clave NUNCA va en este archivo. Ver ASISTENTE_IA_SETUP.md y apps-script/Asistente.gs.
 * Si la IA no está configurada o falla, el asistente responde con reglas.
 */

const ASISTENTE_USAR_IA = true;
const ASISTENTE_IA_URL = (typeof SHEETS_API_URL !== 'undefined') ? SHEETS_API_URL : '';
const asHistorial = [];

// Requisitos de cantidad de evidencias por año (derivados del indicador de cada meta)
const REQUISITOS_ADP = {
    'meta-1': { tipo: 'documento', texto: 'Planificación de acompañamiento + informe de fortalezas y necesidades (75% de los docentes acompañados)' },
    'meta-2': { tipo: 'conteo', porSemestre: 2, unidad: 'talleres de desarrollo profesional' },
    'meta-3': { tipo: 'conteo', total: 20, unidad: 'reflexiones pedagógicas (2 mensuales)' },
    'meta-4': { tipo: 'conteo', total: 4, unidad: 'capacitaciones/talleres del plan (2 + 2) y el plan de trabajo' },
    'meta-5': { tipo: 'conteo', total: 2, unidad: 'capacitaciones en convivencia y políticas públicas' },
    'meta-6': { tipo: 'conteo', porSemestre: 2, unidad: 'reuniones con organizaciones' },
    'meta-7': { tipo: 'conteo', porSemestre: 1, unidad: 'planificaciones directivas (inicio de cada semestre)' },
    'meta-8': { tipo: 'conteo', porSemestre: 2, unidad: 'talleres de altas expectativas' },
    'meta-9': { tipo: 'conteo', porSemestre: 1, unidad: 'sesiones de revisión del PEI' },
    'meta-10': { tipo: 'conteo', total: 4, unidad: 'talleres de convivencia (familia-escuela, autocuidado, inclusión)' },
    'meta-11': { tipo: 'documento', texto: 'Encuestas por indicador, porcentaje de resultados e informe con universo encuestado' },
    'meta-12': { tipo: 'conteo', porSemestre: 2, unidad: 'talleres de temas de convivencia' },
    'meta-13': { tipo: 'documento', texto: 'Registros de matrícula y asistencia (SIGE) e informes de Superintendencia / Agencia' },
    'meta-14': { tipo: 'documento', texto: 'Actas de promoción y repitencia e informes oficiales' },
    'meta-15': { tipo: 'documento', texto: 'Registros de aprobación en Lenguaje (comprensión lectora)' },
    'meta-16': { tipo: 'documento', texto: 'Registros de aprobación en Matemática' }
};

// Palabras clave para clasificar un documento o actividad
const PALABRAS_CLAVE_ADP = {
    'meta-1': ['acompañamiento', 'acompanamiento', 'aula', 'observación', 'observacion', 'visita al aula', 'pauta de observación', 'retroalimentación', 'retroalimentacion', 'clase observada'],
    'meta-2': ['desarrollo profesional', 'taller docente', 'estrategias innovadoras', 'capacitación docente', 'dpd', 'metodología', 'metodologia', 'didáctica', 'didactica', 'inteligencia artificial', 'ia', 'saat', 'solar', 'energía', 'energia'],
    'meta-3': ['reflexión pedagógica', 'reflexion pedagogica', 'reflexión', 'reflexion', 'trabajo colaborativo', 'intercambio de experiencias', 'consejo técnico', 'consejo tecnico', 'técnico pedagógico', 'tecnico pedagogico', 'gpt'],
    'meta-4': ['plan de capacitación', 'plan de capacitaciones', 'plan de trabajo', 'capacitación', 'capacitacion', 'cronograma de capacitaciones'],
    'meta-5': ['políticas públicas', 'politicas publicas', 'capacitación convivencia', 'ley', 'normativa', 'protocolo', 'asistentes de la educación', 'circular', 'superintendencia'],
    'meta-6': ['reunión', 'reunion', 'organizaciones', 'redes', 'opd', 'cesfam', 'carabineros', 'pdi', 'municipalidad', 'centro de padres', 'centro de alumnos', 'empresa', 'alianza', 'convenio', 'externa', 'slep'],
    'meta-7': ['planificación directiva', 'planificacion directiva', 'distribución de tiempos', 'pme', 'equipo de gestión', 'equipo de gestion', 'jornada de organización', 'organizacion', 'tareas administrativas', 'evaluación semestral', 'reunión técnica'],
    'meta-8': ['altas expectativas', 'desafíos pedagógicos', 'desafios pedagogicos', 'procedimientos preventivos', 'análisis de dificultades', 'discusión técnica'],
    'meta-9': ['pei', 'proyecto educativo', 'consejo escolar', 'sellos', 'misión', 'visión'],
    'meta-10': ['familia', 'apoderados', 'familia escuela', 'familia-escuela', 'autocuidado', 'salud mental', 'diversidad', 'inclusión', 'inclusion', 'pie', 'integración', 'beneficios', 'becas', 'lazos', 'comunidad educativa', 'bienestar'],
    'meta-11': ['encuesta', 'autoestima', 'motivación escolar', 'clima', 'participación ciudadana', 'formación ciudadana', 'idps', 'desarrollo personal', 'dia'],
    'meta-12': ['convivencia', 'violencia', 'bullying', 'acoso', 'ciberacoso', 'redes sociales', 'rrss', 'rice', 'reglamento interno', 'relaciones sanas', 'género', 'genero', 'sexualidad', 'afectividad', 'aniversario', 'buen trato', 'discriminación', 'discriminacion', 'drogas', 'senda', 'pgce'],
    'meta-13': ['matrícula', 'matricula', 'asistencia', 'sige', 'retención', 'retencion', 'deserción', 'desercion', 'inasistencia'],
    'meta-14': ['promoción', 'promocion', 'repitencia', 'actas', 'aprobación general', 'notas finales', 'cierre de año'],
    'meta-15': ['lenguaje', 'lectura', 'comprensión lectora', 'comprension lectora', 'literatura'],
    'meta-16': ['matemática', 'matematica', 'matemáticas', 'cálculo', 'calculo']
};

// ---------- utilidades ----------
function asNorm(t) {
    return (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function asEscape(t) {
    return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function asMetas() {
    return (typeof state !== 'undefined' && state.metas && state.metas.length) ? state.metas : METAS_INICIALES;
}

function asMeta(id) {
    return asMetas().find(m => m.id === id) || METAS_INICIALES.find(m => m.id === id);
}

function asNumMeta(id) {
    return id.replace('meta-', '');
}

function asSemestre(fecha) {
    const mes = parseInt(fecha.split('-')[1], 10);
    return mes <= 6 ? 1 : 2;
}

function asEvidencias() {
    return (typeof EVIDENCIAS_ADP !== 'undefined') ? EVIDENCIAS_ADP : [];
}

function asMediosLista(meta) {
    let t = meta.mediosVerificacion || '';
    const items = [];
    t.split('\n').forEach(linea => {
        linea = linea.replace(/^\d+\.\s*/, '').trim();
        if (!linea) return;
        const m = linea.match(/indicando:\s*(.*)$/i);
        if (m) {
            items.push(linea.slice(0, m.index + 'indicando'.length).trim() + ':');
            m[1].split(',').map(x => x.replace(/\.$/, '').trim()).filter(Boolean).forEach(x => items.push(x));
        } else {
            items.push(linea.replace(/\.$/, ''));
        }
    });
    return items;
}

// ---------- análisis ----------
function asEstadoMeta(metaId) {
    const req = REQUISITOS_ADP[metaId] || { tipo: 'documento', texto: '' };
    const evs = asEvidencias().filter(e => e.metaId === metaId);
    const realizadas = evs.filter(e => e.estado === 'realizada' || e.estado === 'planificada');
    const reprogramadas = evs.filter(e => e.estado === 'reprogramada');
    const actsCal = (typeof CALENDARIO_CEIA !== 'undefined' ? CALENDARIO_CEIA : [])
        .filter(a => a.metaRelacionada === metaId && !asEvidencias().some(e => e.actividadId === a.id));

    const r = { metaId, req, evs, realizadas, reprogramadas, actsCal, faltan: 0, detalle: '' };

    if (req.tipo === 'conteo') {
        if (req.porSemestre) {
            const s1 = realizadas.filter(e => asSemestre(e.fecha) === 1).length;
            const s2 = realizadas.filter(e => asSemestre(e.fecha) === 2).length;
            const f1 = Math.max(0, req.porSemestre - s1);
            const f2 = Math.max(0, req.porSemestre - s2);
            r.faltan = f1 + f2;
            r.detalle = `Se piden ${req.porSemestre} ${req.unidad} por semestre. Con documento: semestre 1 = ${s1}, semestre 2 = ${s2}.`;
        } else {
            r.faltan = Math.max(0, req.total - realizadas.length);
            r.detalle = `Se piden ${req.total} ${req.unidad} en el año. Con documento: ${realizadas.length}.`;
        }
    } else {
        r.faltan = realizadas.length ? 0 : 1;
        r.detalle = `Se pide: ${req.texto}. Documentos cargados: ${realizadas.length}.`;
    }
    return r;
}

function asClasificar(texto) {
    const n = asNorm(texto);
    const puntajes = Object.entries(PALABRAS_CLAVE_ADP).map(([metaId, claves]) => {
        const encontradas = claves.filter(k => {
            const kn = asNorm(k);
            if (kn.length <= 3) return new RegExp(`\\b${kn}\\b`).test(n);
            return n.includes(kn);
        });
        // una frase de varias palabras pesa más que una palabra suelta
        const vistas = new Set();
        const unicas = encontradas.filter(k => { const kn = asNorm(k); if (vistas.has(kn)) return false; vistas.add(kn); return true; });
        const puntajeUnico = unicas.reduce((s, k) => s + (k.includes(' ') ? 2 : 1), 0);
        return { metaId, puntaje: puntajeUnico, encontradas: unicas };
    }).filter(x => x.puntaje > 0).sort((a, b) => b.puntaje - a.puntaje);
    return puntajes.slice(0, 3);
}

// ---------- respuestas ----------
function asRespFaltan(soloMetaId) {
    const metas = asMetas().filter(m => !soloMetaId || m.id === soloMetaId);
    const filas = metas.map(m => ({ m, e: asEstadoMeta(m.id) }));
    const pendientes = filas.filter(f => f.e.faltan > 0)
        .sort((a, b) => (b.m.ponderacion * b.e.faltan) - (a.m.ponderacion * a.e.faltan));
    const completas = filas.filter(f => f.e.faltan === 0);

    let html = '';
    if (!soloMetaId) {
        html += `<p>Revisé las ${metas.length} metas contra las evidencias con documento cargadas en la app. <strong>${pendientes.length}</strong> metas aún necesitan evidencias para ${new Date().getFullYear()}. Primero las de mayor ponderación:</p>`;
    }
    html += '<ul class="as-lista">';
    pendientes.forEach(({ m, e }) => {
        html += `<li><button type="button" class="as-link" data-as-meta="${m.id}">Meta ${asNumMeta(m.id)}: ${asEscape(m.nombre)}</button> <span class="as-peso">${m.ponderacion}%</span><br>
            <span class="as-falta">Faltan ${e.req.tipo === 'conteo' ? e.faltan : 'los documentos de respaldo'}</span>. ${asEscape(e.detalle)}
            ${e.reprogramadas.length ? `<br>⏳ ${e.reprogramadas.length} reprogramada(s): ${e.reprogramadas.map(x => asEscape(x.titulo)).join('; ')}.` : ''}
            ${e.actsCal.length ? `<br>📅 En el calendario hay ${e.actsCal.length} actividad(es) asociada(s) sin documento: ${e.actsCal.slice(0, 3).map(a => asEscape(a.titulo)).join('; ')}${e.actsCal.length > 3 ? '…' : ''}. Si las tienes, súbelas como evidencia.` : ''}
        </li>`;
    });
    html += '</ul>';
    if (completas.length) {
        html += `<p>✅ Con lo exigido cubierto en número: ${completas.map(({ m }) => `Meta ${asNumMeta(m.id)}`).join(', ')}. Revisa igual que cada documento tenga firmas y nómina de asistentes.</p>`;
    }
    html += '<p class="as-nota">Solo cuento documentos cargados en la pestaña Evidencias. Las actividades del calendario sin documento no cuentan como respaldo.</p>';
    return html;
}

function asRespMeta(metaId) {
    const m = asMeta(metaId);
    if (!m) return '<p>No encontré esa meta. Las metas van de la 1 a la 16.</p>';
    const e = asEstadoMeta(metaId);
    const dim = DIMENSIONES[m.dimension];
    return `
        <p><strong>Meta ${asNumMeta(m.id)}: ${asEscape(m.nombre)}</strong> · ${dim ? dim.nombre : ''} · ${m.ponderacion}%</p>
        <p>${asEscape(m.indicador)}</p>
        ${m.metaAnual ? `<p><strong>Meta ${new Date().getFullYear()}:</strong> ${asEscape(m.metaAnual[new Date().getFullYear()] || m.metaAnual[2026] || '')}</p>` : ''}
        <p><strong>Cada evidencia debe incluir:</strong></p>
        <ul class="as-lista">${asMediosLista(m).map(x => `<li>${asEscape(x)}</li>`).join('')}</ul>
        <p><strong>Estado:</strong> ${asEscape(e.detalle)} ${e.faltan ? `<span class="as-falta">Faltan ${e.req.tipo === 'conteo' ? e.faltan : 'documentos'}.</span>` : '✅ Cubierta en número.'}</p>
        ${e.evs.length ? `<p><strong>Evidencias cargadas:</strong></p><ul class="as-lista">${e.evs.map(x => `<li><button type="button" class="as-link" data-evidencia-open="${x.id}" data-idx="0">📷 ${asEscape(x.titulo)}</button> (${asEscape(ESTADOS_EVIDENCIA[x.estado]?.nombre || x.estado)})</li>`).join('')}</ul>` : ''}
    `;
}

function asRespClasificar(texto) {
    const res = asClasificar(texto);
    if (!res.length) {
        return `<p>No reconocí palabras clave del convenio en: “${asEscape(texto)}”.</p>
            <p>Prueba describiendo <strong>qué se hizo, con quién y el tema</strong>. Por ejemplo: “taller a apoderados sobre salud mental” o “reunión con CESFAM”.</p>`;
    }
    const [top, ...otras] = res;
    const m = asMeta(top.metaId);
    const dim = DIMENSIONES[m.dimension];
    const e = asEstadoMeta(m.id);
    return `
        <p>Lo clasificaría en <strong>Meta ${asNumMeta(m.id)}: ${asEscape(m.nombre)}</strong> (${dim ? dim.nombre : ''}, ${m.ponderacion}%).</p>
        <p class="as-nota">Coincidencias: ${top.encontradas.map(asEscape).join(', ')}.</p>
        <p><strong>Para que cuente como evidencia, el documento debe incluir:</strong></p>
        <ul class="as-lista">${asMediosLista(m).map(x => `<li>${asEscape(x)}</li>`).join('')}</ul>
        <p>${e.faltan ? `👍 Te sirve: a esta meta le faltan ${e.req.tipo === 'conteo' ? e.faltan : 'documentos'}.` : 'Esta meta ya está cubierta en número; igual suma como respaldo.'}</p>
        ${otras.length ? `<p>También podría servir para: ${otras.map(o => { const om = asMeta(o.metaId); return `<button type="button" class="as-link" data-as-meta="${om.id}">Meta ${asNumMeta(om.id)} (${asEscape(om.nombre)})</button>`; }).join(', ')}.</p>` : ''}
    `;
}

function asRespAyuda() {
    return `<p>Hola, soy el asistente de evidencias ADP. Puedo ayudarte con:</p>
        <ul class="as-lista">
            <li><strong>¿Qué evidencias me faltan?</strong> Reviso las 16 metas.</li>
            <li><strong>Clasificar un documento o actividad.</strong> Escribe, por ejemplo: <em>clasificar taller a apoderados sobre salud mental</em>.</li>
            <li><strong>Ver una meta.</strong> Escribe, por ejemplo: <em>meta 12</em>.</li>
            <li><strong>¿Cómo subo una evidencia?</strong></li>
        </ul>`;
}

function asRespComoSubir() {
    return `<p>Para que una evidencia cuente:</p>
        <ol class="as-lista">
            <li>Fotografía o escanea el documento completo, con la firma y el timbre visibles.</li>
            <li>Revisa que tenga lo que pide la meta. Pregúntame “meta N” para ver la lista.</li>
            <li>Envíala con la fecha, la actividad y la meta. Se guarda en la carpeta <code>evidencias/</code> y se registra en <code>evidencias.js</code>.</li>
            <li>Si la actividad se reprogramó, sube también el oficio o correo de reprogramación.</li>
        </ol>`;
}

function asResponder(texto) {
    const t = asNorm(texto).trim();
    if (!t) return asRespAyuda();

    const mMeta = t.match(/\bmeta\s*(\d{1,2})\b/);
    if (/(falta|faltan|pendiente|me queda|que debo|que necesito|cumpl)/.test(t)) {
        return asRespFaltan(mMeta ? `meta-${mMeta[1]}` : null);
    }
    if (/(como subo|como agrego|como cargo|subir evidencia|agregar evidencia|cargar evidencia)/.test(t)) {
        return asRespComoSubir();
    }
    if (/^(clasific|a que meta|en que meta|donde va|donde clasifico|que meta)/.test(t) || /(clasificar|clasifico)/.test(t)) {
        const limpio = texto.replace(/^\s*(clasificar|clasifica|clasifico|¿?\s*a qu[eé] meta (corresponde|va|pertenece)|¿?\s*en qu[eé] meta (va|clasifico)|¿?\s*d[oó]nde (va|clasifico))\s*:?\s*/i, '');
        return asRespClasificar(limpio || texto);
    }
    if (mMeta && t.length < 20) return asRespMeta(`meta-${mMeta[1]}`);
    if (/^(hola|ayuda|help|menu|que puedes|buen)/.test(t)) return asRespAyuda();
    // Por defecto: tratar el texto como descripción de un documento/actividad
    if (t.split(/\s+/).length >= 2) return asRespClasificar(texto);
    return asRespAyuda();
}

// ---------- interfaz ----------
function asAgregarMensaje(html, quien) {
    const cont = document.getElementById('asMensajes');
    const div = document.createElement('div');
    div.className = `as-msg ${quien}`;
    div.innerHTML = html;
    cont.appendChild(div);
    // mostrar el inicio de la respuesta del bot (las respuestas largas se leen desde arriba)
    cont.scrollTop = quien === 'bot' ? Math.max(0, div.offsetTop - cont.offsetTop - 8) : cont.scrollHeight;
}

function asContextoIA() {
    const anio = new Date().getFullYear();
    const lineas = [`Fecha de hoy: ${new Date().toISOString().slice(0, 10)}. Año del convenio en curso: ${anio}.`, '', 'METAS (id, dimensión, ponderación, avance, meta anual, indicador, medios de verificación, estado de evidencias):'];
    asMetas().forEach(m => {
        const e = asEstadoMeta(m.id);
        lineas.push(`- Meta ${asNumMeta(m.id)}: ${m.nombre} | ${DIMENSIONES[m.dimension]?.nombre || m.dimension} | ${m.ponderacion}% | avance ${m.avance}% (${m.estado}) | meta ${anio}: ${m.metaAnual ? (m.metaAnual[anio] || '') : ''}`);
        lineas.push(`  Indicador: ${m.indicador}`);
        lineas.push(`  Medios de verificación: ${(m.mediosVerificacion || '').replace(/\n/g, ' ')}`);
        lineas.push(`  Evidencias con documento: ${e.detalle} Faltan: ${e.req.tipo === 'conteo' ? e.faltan : (e.faltan ? 'documentos de respaldo' : 'nada')}.`);
        if (e.actsCal.length) lineas.push(`  Actividades del calendario asociadas sin documento: ${e.actsCal.map(a => `${a.fecha} ${a.titulo}`).join('; ')}`);
    });
    lineas.push('', 'EVIDENCIAS DOCUMENTALES CARGADAS:');
    asEvidencias().forEach(ev => {
        lineas.push(`- [${ESTADOS_EVIDENCIA[ev.estado]?.nombre || ev.estado}] Meta ${asNumMeta(ev.metaId)} | ${ev.fechaTexto} | ${ev.titulo} | ${ev.tipoDocumento} | participantes: ${ev.participantes} | responsable: ${ev.responsable} | ${ev.resumen}`);
    });
    return lineas.join('\n');
}

function asTextoPlano(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
}

function asFormatoIA(texto) {
    // Markdown mínimo: negritas, listas y saltos de línea
    let h = asEscape(texto)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^#{1,4}\s*(.+)$/gm, '<strong>$1</strong>');
    const lineas = h.split('\n');
    let out = '', enLista = false;
    lineas.forEach(l => {
        const m = l.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
        if (m) { if (!enLista) { out += '<ul class="as-lista">'; enLista = true; } out += `<li>${m[1]}</li>`; }
        else { if (enLista) { out += '</ul>'; enLista = false; } if (l.trim()) out += `<p>${l}</p>`; }
    });
    if (enLista) out += '</ul>';
    return out;
}

async function asPreguntarIA(texto) {
    const r = await fetch(ASISTENTE_IA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'chat', pregunta: texto, contexto: asContextoIA(), historial: asHistorial.slice(-6) })
    });
    const d = await r.json();
    if (!d || d.error || !d.respuesta) throw new Error((d && d.error) || 'Sin respuesta');
    return d.respuesta;
}

function asSetModo(modo) {
    const el = document.getElementById('asModo');
    if (el) {
        el.textContent = modo === 'ia' ? '● IA conectada' : '● Modo básico';
        el.className = `as-modo ${modo}`;
    }
}

async function asEnviar(texto) {
    if (!texto || !texto.trim()) return;
    asAgregarMensaje(asEscape(texto), 'yo');
    let html = '';
    const pensando = document.createElement('div');
    pensando.className = 'as-msg bot as-pensando';
    pensando.setAttribute('aria-label', 'Escribiendo');
    pensando.innerHTML = '<span></span><span></span><span></span>';

    if (ASISTENTE_USAR_IA && ASISTENTE_IA_URL) {
        const cont = document.getElementById('asMensajes');
        cont.appendChild(pensando);
        cont.scrollTop = cont.scrollHeight;
        try {
            const respuesta = await asPreguntarIA(texto);
            html = asFormatoIA(respuesta);
            asHistorial.push({ role: 'user', content: texto }, { role: 'assistant', content: respuesta });
            asSetModo('ia');
        } catch (e) {
            console.warn('Asistente IA no disponible, uso reglas:', e.message);
            asSetModo('reglas');
        }
        pensando.remove();
    }
    if (!html) {
        html = asResponder(texto);
        asHistorial.push({ role: 'user', content: texto }, { role: 'assistant', content: asTextoPlano(html).slice(0, 1500) });
    }
    asAgregarMensaje(html, 'bot');
}

function initAsistente() {
    const btn = document.getElementById('btnAsistente');
    const panel = document.getElementById('asistentePanel');
    if (!btn || !panel) return;
    const form = document.getElementById('asForm');
    const input = document.getElementById('asInput');
    let iniciado = false;

    const abrir = (abierto) => {
        panel.hidden = !abierto;
        panel.classList.toggle('active', abierto);
        btn.classList.toggle('abierto', abierto);
        btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        if (abierto && !iniciado) { asAgregarMensaje(asRespAyuda(), 'bot'); iniciado = true; }
        if (abierto) setTimeout(() => input.focus(), 50);
    };
    btn.addEventListener('click', () => abrir(!panel.classList.contains('active')));
    document.getElementById('asCerrar').addEventListener('click', () => abrir(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) abrir(false); });
    form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; asEnviar(v); });
    panel.addEventListener('click', e => {
        const chip = e.target.closest('[data-as-pregunta]');
        if (chip) { asEnviar(chip.dataset.asPregunta); return; }
        const link = e.target.closest('[data-as-meta]');
        if (link) { asEnviar(`meta ${asNumMeta(link.dataset.asMeta)}`); }
    });
}

document.addEventListener('DOMContentLoaded', () => setTimeout(initAsistente, 400));

if (typeof window !== 'undefined') {
    window.asResponder = asResponder;
}
