/**
 * Panel de Gestión ADP - Aplicación Principal
 * Convenio de Desempeño Director - CEIA 2026-2030
 */

// Estado de la aplicación
let state = {
    currentYear: 2026,
    currentMonth: new Date().getMonth(),
    currentCalendarYear: 2026,
    metas: [],
    hitos: [],
    filtros: {
        dimension: 'all',
        estado: 'all'
    },
    charts: {}
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Cargar datos desde localStorage o usar los iniciales
    loadData();

    // Configurar event listeners
    setupEventListeners();

    // Renderizar la pestaña inicial (Metas)
    renderMetas();
    updateDimensionSummary();

    // Inicializar calendario
    initCalendar();

    // Inicializar dashboard
    initDashboard();
}

// ============================================
// Gestión de Datos
// ============================================

function loadData() {
    // Intentar cargar desde localStorage
    const savedMetas = localStorage.getItem('adp_metas');
    const savedHitos = localStorage.getItem('adp_hitos');

    if (savedMetas) {
        state.metas = JSON.parse(savedMetas);
    } else {
        state.metas = JSON.parse(JSON.stringify(METAS_INICIALES));
    }

    if (savedHitos) {
        state.hitos = JSON.parse(savedHitos);
    } else {
        state.hitos = JSON.parse(JSON.stringify(HITOS_INICIALES));
    }
}

function saveData() {
    localStorage.setItem('adp_metas', JSON.stringify(state.metas));
    localStorage.setItem('adp_hitos', JSON.stringify(state.hitos));
}

function generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Navegación de pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Selector de año
    document.getElementById('yearSelect').addEventListener('change', (e) => {
        state.currentYear = parseInt(e.target.value);
        updateYearDependentViews();
    });

    // Filtros de metas
    document.getElementById('filterDimension').addEventListener('change', (e) => {
        state.filtros.dimension = e.target.value;
        renderMetas();
    });

    document.getElementById('filterEstado').addEventListener('change', (e) => {
        state.filtros.estado = e.target.value;
        renderMetas();
    });


    // Botón de agregar hito
    document.getElementById('btnAddHito').addEventListener('click', () => openHitoModal());

    // Navegación del calendario
    document.getElementById('prevMonth').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => navigateMonth(1));

    // Modales
    setupModalListeners();

    // Dimensión cards click
    document.querySelectorAll('.dimension-card').forEach(card => {
        card.addEventListener('click', () => {
            const dimension = card.dataset.dimension;
            document.getElementById('filterDimension').value = dimension;
            state.filtros.dimension = dimension;
            renderMetas();
        });
    });
}

function setupModalListeners() {
    // Modal Meta
    document.getElementById('closeModalMeta').addEventListener('click', closeMetaModal);
    document.getElementById('cancelMeta').addEventListener('click', closeMetaModal);
    document.getElementById('formMeta').addEventListener('submit', handleMetaSubmit);
    document.getElementById('modalMeta').addEventListener('click', (e) => {
        if (e.target.id === 'modalMeta') closeMetaModal();
    });

    // Modal Hito
    document.getElementById('closeModalHito').addEventListener('click', closeHitoModal);
    document.getElementById('cancelHito').addEventListener('click', closeHitoModal);
    document.getElementById('formHito').addEventListener('submit', handleHitoSubmit);
    document.getElementById('modalHito').addEventListener('click', (e) => {
        if (e.target.id === 'modalHito') closeHitoModal();
    });

    // Modal Detalle
    document.getElementById('closeModalDetalle').addEventListener('click', closeDetalleModal);
    document.getElementById('modalDetalle').addEventListener('click', (e) => {
        if (e.target.id === 'modalDetalle') closeDetalleModal();
    });
}

// ============================================
// Navegación de Pestañas
// ============================================

function switchTab(tabId) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });

    // Actualizar gráficos si es dashboard
    if (tabId === 'dashboard') {
        updateDashboard();
    }
}

function updateYearDependentViews() {
    renderMetas();
    updateDimensionSummary();
    renderCalendar();
    renderUpcomingEvents();
    updateDashboard();
}

// ============================================
// Metas de Gestión
// ============================================

function renderMetas() {
    const container = document.getElementById('metasList');
    const filteredMetas = filterMetas();

    if (filteredMetas.length === 0) {
        container.innerHTML = `
            <div class="empty-state glass-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <h3>No hay metas para mostrar</h3>
                <p>Ajusta los filtros o crea una nueva meta.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredMetas.map(meta => createMetaCard(meta)).join('');

    // Agregar event listeners a las tarjetas
    container.querySelectorAll('.meta-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn')) {
                openDetalleModal(card.dataset.id);
            }
        });
    });

    // Event listeners para acciones
    container.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMetaModal(btn.dataset.id);
        });
    });
}

function filterMetas() {
    return state.metas.filter(meta => {
        const dimensionMatch = state.filtros.dimension === 'all' ||
            meta.dimension === state.filtros.dimension;
        const estadoMatch = state.filtros.estado === 'all' ||
            meta.estado === state.filtros.estado;
        return dimensionMatch && estadoMatch;
    });
}

function createMetaCard(meta) {
    const dimension = DIMENSIONES[meta.dimension];
    const estado = ESTADOS[meta.estado];
    const metaAnual = meta.metaAnual ? meta.metaAnual[state.currentYear] : '';

    return `
        <div class="meta-card glass-card" data-id="${meta.id}" data-dimension="${meta.dimension}">
            <div class="meta-header">
                <div>
                    <div class="meta-title">${meta.nombre}</div>
                    <div class="meta-dimension">${dimension.nombre}</div>
                </div>
                <span class="meta-status ${meta.estado}">${estado.nombre}</span>
            </div>
            <div class="meta-body">
                <p class="meta-indicador">${meta.indicador}</p>
                ${metaAnual ? `<p class="meta-indicador" style="margin-top: 8px; color: var(--accent-cyan);"><strong>Meta ${state.currentYear}:</strong> ${metaAnual}</p>` : ''}
            </div>
            <div class="meta-footer">
                <div class="meta-info">
                    <div class="meta-info-item">
                        <span class="meta-info-label">Ponderación</span>
                        <span class="meta-info-value">${meta.ponderacion}%</span>
                    </div>
                    <div class="meta-info-item">
                        <span class="meta-info-label">Vencimiento</span>
                        <span class="meta-info-value">${formatDate(meta.fechaCumplimiento)}</span>
                    </div>
                </div>
                <div class="meta-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${meta.avance}%"></div>
                    </div>
                    <span class="progress-text">${meta.avance}%</span>
                </div>
                <div class="meta-actions">
                    <button class="action-btn edit" data-id="${meta.id}" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateDimensionSummary() {
    Object.keys(DIMENSIONES).forEach(dimId => {
        const card = document.querySelector(`.dimension-card[data-dimension="${dimId}"]`);
        if (!card) return;

        const metasDimension = state.metas.filter(m => m.dimension === dimId);
        const totalPonderacion = metasDimension.reduce((sum, m) => sum + m.ponderacion, 0);
        const avancePonderado = metasDimension.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
        const porcentaje = totalPonderacion > 0 ? Math.round((avancePonderado / totalPonderacion) * 100) : 0;

        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');

        if (progressFill) progressFill.style.width = `${porcentaje}%`;
        if (progressText) progressText.textContent = `${porcentaje}%`;
    });
}

// ============================================
// Modal de Metas
// ============================================

function openMetaModal(metaId = null) {
    const modal = document.getElementById('modalMeta');
    const title = document.getElementById('modalMetaTitle');
    const form = document.getElementById('formMeta');

    form.reset();

    if (metaId) {
        const meta = state.metas.find(m => m.id === metaId);
        if (meta) {
            title.textContent = 'Editar Meta';
            document.getElementById('metaId').value = meta.id;
            document.getElementById('metaDimension').value = meta.dimension;
            document.getElementById('metaNombre').value = meta.nombre;
            document.getElementById('metaIndicador').value = meta.indicador;
            document.getElementById('metaPonderacion').value = meta.ponderacion;
            document.getElementById('metaAvance').value = meta.avance;
            document.getElementById('metaFecha').value = meta.fechaCumplimiento;
            document.getElementById('metaEstado').value = meta.estado;
            document.getElementById('metaVerificacion').value = meta.mediosVerificacion || '';
        }
    } else {
        title.textContent = 'Nueva Meta';
        document.getElementById('metaId').value = '';
    }

    modal.classList.add('active');
}

function closeMetaModal() {
    document.getElementById('modalMeta').classList.remove('active');
}

function handleMetaSubmit(e) {
    e.preventDefault();

    const metaId = document.getElementById('metaId').value;
    const metaData = {
        dimension: document.getElementById('metaDimension').value,
        nombre: document.getElementById('metaNombre').value,
        indicador: document.getElementById('metaIndicador').value,
        ponderacion: parseFloat(document.getElementById('metaPonderacion').value),
        avance: parseInt(document.getElementById('metaAvance').value) || 0,
        fechaCumplimiento: document.getElementById('metaFecha').value,
        estado: document.getElementById('metaEstado').value,
        mediosVerificacion: document.getElementById('metaVerificacion').value
    };

    // Actualizar estado automáticamente basado en avance
    if (metaData.avance >= 100) {
        metaData.estado = 'lograda';
    } else if (metaData.avance > 0) {
        metaData.estado = 'progreso';
    }

    if (metaId) {
        // Editar meta existente
        const index = state.metas.findIndex(m => m.id === metaId);
        if (index !== -1) {
            state.metas[index] = { ...state.metas[index], ...metaData };
        }
    } else {
        // Crear nueva meta
        metaData.id = generateId('meta');
        metaData.metaAnual = {};
        state.metas.push(metaData);
    }

    saveData();
    closeMetaModal();
    renderMetas();
    updateDimensionSummary();
    updateDashboard();
}

function deleteMeta(metaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
        state.metas = state.metas.filter(m => m.id !== metaId);
        saveData();
        renderMetas();
        updateDimensionSummary();
        updateDashboard();
    }
}

// ============================================
// Modal de Detalle
// ============================================

function openDetalleModal(metaId) {
    const meta = state.metas.find(m => m.id === metaId);
    if (!meta) return;

    const modal = document.getElementById('modalDetalle');
    const content = document.getElementById('detalleContent');
    const dimension = DIMENSIONES[meta.dimension];
    const estado = ESTADOS[meta.estado];

    content.innerHTML = `
        <div class="detalle-section">
            <h4>Meta</h4>
            <p><strong>${meta.nombre}</strong></p>
        </div>
        
        <div class="detalle-grid">
            <div class="detalle-item">
                <label>Dimensión</label>
                <span style="color: ${dimension.color}">${dimension.nombre}</span>
            </div>
            <div class="detalle-item">
                <label>Estado</label>
                <span class="meta-status ${meta.estado}" style="display: inline-block">${estado.nombre}</span>
            </div>
            <div class="detalle-item">
                <label>Ponderación</label>
                <span>${meta.ponderacion}%</span>
            </div>
            <div class="detalle-item">
                <label>Avance</label>
                <span>${meta.avance}%</span>
            </div>
            <div class="detalle-item">
                <label>Fecha Cumplimiento</label>
                <span>${formatDate(meta.fechaCumplimiento)}</span>
            </div>
        </div>
        
        <div class="detalle-section" style="margin-top: var(--spacing-lg)">
            <h4>Indicador</h4>
            <p>${meta.indicador}</p>
        </div>
        
        ${meta.metaAnual ? `
        <div class="detalle-section">
            <h4>Metas por Año</h4>
            <div class="detalle-grid">
                ${Object.entries(meta.metaAnual).map(([year, value]) => `
                    <div class="detalle-item" style="${year == state.currentYear ? 'border: 1px solid var(--accent-cyan);' : ''}">
                        <label>${year}</label>
                        <span style="font-size: 0.85rem">${value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${meta.mediosVerificacion ? `
        <div class="detalle-section">
            <h4>Medios de Verificación</h4>
            <p style="white-space: pre-line">${meta.mediosVerificacion}</p>
        </div>
        ` : ''}
        
        <div class="detalle-section" style="margin-top: var(--spacing-lg)">
            <h4>Progreso</h4>
            <div class="meta-progress" style="width: 100%">
                <div class="progress-bar" style="height: 16px">
                    <div class="progress-fill" style="width: ${meta.avance}%"></div>
                </div>
                <span class="progress-text" style="font-size: 1.2rem">${meta.avance}%</span>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeDetalleModal() {
    document.getElementById('modalDetalle').classList.remove('active');
}

// ============================================
// Calendario de Hitos
// ============================================

function initCalendar() {
    // Establecer el mes/año actual
    state.currentMonth = 2; // Marzo (inicio año escolar)
    state.currentCalendarYear = state.currentYear;

    renderCalendar();
    renderUpcomingEvents();
}

function navigateMonth(direction) {
    state.currentMonth += direction;

    if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentCalendarYear++;
    } else if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentCalendarYear--;
    }

    renderCalendar();
}

function renderCalendar() {
    const monthTitle = document.getElementById('currentMonth');
    monthTitle.textContent = `${MESES[state.currentMonth]} ${state.currentCalendarYear}`;

    const container = document.getElementById('calendarDays');
    const firstDay = new Date(state.currentCalendarYear, state.currentMonth, 1);
    const lastDay = new Date(state.currentCalendarYear, state.currentMonth + 1, 0);
    const startDay = firstDay.getDay(); // 0 = Domingo
    const daysInMonth = lastDay.getDate();

    // Obtener días del mes anterior
    const prevMonthLastDay = new Date(state.currentCalendarYear, state.currentMonth, 0).getDate();

    let html = '';

    // Días del mes anterior
    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        html += `<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`;
    }

    // Días del mes actual
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${state.currentCalendarYear}-${String(state.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getFullYear() === state.currentCalendarYear &&
            today.getMonth() === state.currentMonth &&
            today.getDate() === day;

        const dayEvents = state.hitos.filter(h => h.fecha === dateStr);

        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateStr}">
                <span class="day-number">${day}</span>
                <div class="day-events">
                    ${dayEvents.slice(0, 3).map(e => `
                        <div class="day-event ${e.categoria}" title="${e.titulo}">
                            ${e.titulo}
                        </div>
                    `).join('')}
                    ${dayEvents.length > 3 ? `<div class="day-event" style="background: #888">+${dayEvents.length - 3} más</div>` : ''}
                </div>
            </div>
        `;
    }

    // Días del mes siguiente
    const remainingDays = 42 - (startDay + daysInMonth); // 6 filas x 7 días
    for (let day = 1; day <= remainingDays; day++) {
        html += `<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`;
    }

    container.innerHTML = html;

    // Event listeners para días
    container.querySelectorAll('.calendar-day:not(.other-month)').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            const date = dayEl.dataset.date;
            if (date) {
                document.getElementById('hitoFecha').value = date;
                openHitoModal();
            }
        });
    });
}

function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filtrar hitos del año seleccionado y ordenar por fecha
    const upcomingHitos = state.hitos
        .filter(h => {
            const hitoDate = new Date(h.fecha);
            return hitoDate >= today && h.fecha.startsWith(state.currentYear);
        })
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 5);

    if (upcomingHitos.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: var(--spacing-lg)">
                <p>No hay hitos próximos para ${state.currentYear}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = upcomingHitos.map(hito => {
        const date = new Date(hito.fecha);
        return `
            <div class="event-item ${hito.categoria}" data-id="${hito.id}">
                <div class="event-date">
                    <span class="day">${date.getDate()}</span>
                    <span class="month">${MESES[date.getMonth()].substring(0, 3)}</span>
                </div>
                <div class="event-info">
                    <div class="event-title">${hito.titulo}</div>
                    <div class="event-description">${hito.descripcion || ''}</div>
                </div>
                <div class="meta-actions">
                    <button class="action-btn edit" data-id="${hito.id}" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="action-btn delete" data-id="${hito.id}" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Event listeners
    container.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openHitoModal(btn.dataset.id);
        });
    });

    container.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHito(btn.dataset.id);
        });
    });
}

// ============================================
// Modal de Hitos
// ============================================

function openHitoModal(hitoId = null) {
    const modal = document.getElementById('modalHito');
    const title = document.getElementById('modalHitoTitle');
    const form = document.getElementById('formHito');

    // No resetear el form si hay una fecha pre-establecida
    const presetDate = document.getElementById('hitoFecha').value;
    form.reset();
    if (presetDate && !hitoId) {
        document.getElementById('hitoFecha').value = presetDate;
    }

    if (hitoId) {
        const hito = state.hitos.find(h => h.id === hitoId);
        if (hito) {
            title.textContent = 'Editar Hito';
            document.getElementById('hitoId').value = hito.id;
            document.getElementById('hitoTitulo').value = hito.titulo;
            document.getElementById('hitoDescripcion').value = hito.descripcion || '';
            document.getElementById('hitoFecha').value = hito.fecha;
            document.getElementById('hitoCategoria').value = hito.categoria;
            document.getElementById('hitoResponsable').value = hito.responsable || '';
        }
    } else {
        title.textContent = 'Nuevo Hito';
        document.getElementById('hitoId').value = '';
    }

    modal.classList.add('active');
}

function closeHitoModal() {
    document.getElementById('modalHito').classList.remove('active');
}

function handleHitoSubmit(e) {
    e.preventDefault();

    const hitoId = document.getElementById('hitoId').value;
    const hitoData = {
        titulo: document.getElementById('hitoTitulo').value,
        descripcion: document.getElementById('hitoDescripcion').value,
        fecha: document.getElementById('hitoFecha').value,
        categoria: document.getElementById('hitoCategoria').value,
        responsable: document.getElementById('hitoResponsable').value
    };

    if (hitoId) {
        // Editar hito existente
        const index = state.hitos.findIndex(h => h.id === hitoId);
        if (index !== -1) {
            state.hitos[index] = { ...state.hitos[index], ...hitoData };
        }
    } else {
        // Crear nuevo hito
        hitoData.id = generateId('hito');
        state.hitos.push(hitoData);
    }

    saveData();
    closeHitoModal();
    renderCalendar();
    renderUpcomingEvents();
    updateDashboard();
}

function deleteHito(hitoId) {
    if (confirm('¿Estás seguro de que deseas eliminar este hito?')) {
        state.hitos = state.hitos.filter(h => h.id !== hitoId);
        saveData();
        renderCalendar();
        renderUpcomingEvents();
        updateDashboard();
    }
}

// ============================================
// Dashboard Ejecutivo
// ============================================

function initDashboard() {
    createCharts();
    updateDashboard();
}

function createCharts() {
    // Configuración común para Chart.js
    Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

    // Gráfico de barras - Cumplimiento por Dimensión
    const ctxDimensiones = document.getElementById('chartDimensiones').getContext('2d');
    state.charts.dimensiones = new Chart(ctxDimensiones, {
        type: 'bar',
        data: {
            labels: Object.values(DIMENSIONES).map(d => d.nombre),
            datasets: [{
                label: 'Avance %',
                data: [0, 0, 0, 0, 0],
                backgroundColor: Object.values(DIMENSIONES).map(d => d.color + '80'),
                borderColor: Object.values(DIMENSIONES).map(d => d.color),
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });

    // Gráfico de dona - Distribución de Estados
    const ctxEstados = document.getElementById('chartEstados').getContext('2d');
    state.charts.estados = new Chart(ctxEstados, {
        type: 'doughnut',
        data: {
            labels: Object.values(ESTADOS).map(e => e.nombre),
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: Object.values(ESTADOS).map(e => e.color + '80'),
                borderColor: Object.values(ESTADOS).map(e => e.color),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { padding: 20 }
                }
            },
            cutout: '60%'
        }
    });

    // Gráfico de línea - Evolución Trimestral
    const ctxEvolucion = document.getElementById('chartEvolucion').getContext('2d');
    state.charts.evolucion = new Chart(ctxEvolucion, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4'],
            datasets: [
                {
                    label: 'Cumplimiento',
                    data: [0, 0, 0, 0],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Meta Mínima (60%)',
                    data: [60, 60, 60, 60],
                    borderColor: '#ff4b2b',
                    borderDash: [5, 5],
                    tension: 0,
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function updateDashboard() {
    updateKPIs();
    updateCharts();
    updateAlerts();
    updateSummaryTable();
}

function updateKPIs() {
    // Calcular cumplimiento general ponderado
    const totalPonderacion = state.metas.reduce((sum, m) => sum + m.ponderacion, 0);
    const avancePonderado = state.metas.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
    const cumplimiento = totalPonderacion > 0 ? Math.round((avancePonderado / totalPonderacion) * 100) : 0;

    // Contar estados
    const logradas = state.metas.filter(m => m.estado === 'lograda').length;
    const enProgreso = state.metas.filter(m => m.estado === 'progreso').length;
    const total = state.metas.length;

    // Calcular alertas (vencimientos próximos)
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const alertas = state.metas.filter(m => {
        const fecha = new Date(m.fechaCumplimiento);
        return fecha <= thirtyDaysFromNow && m.estado !== 'lograda';
    }).length;

    // Actualizar KPIs en el DOM
    document.getElementById('kpiCumplimiento').textContent = `${cumplimiento}%`;
    document.getElementById('kpiLogradas').textContent = `${logradas}/${total}`;
    document.getElementById('kpiProgreso').textContent = enProgreso;
    document.getElementById('kpiAlertas').textContent = alertas;

    // Cambiar color del KPI de cumplimiento según el valor
    const kpiCard = document.getElementById('kpiCumplimiento').closest('.kpi-card');
    if (cumplimiento >= 60) {
        kpiCard.style.borderColor = '#38ef7d';
    } else if (cumplimiento >= 40) {
        kpiCard.style.borderColor = '#ffd700';
    } else {
        kpiCard.style.borderColor = '#ff4b2b';
    }
}

function updateCharts() {
    // Actualizar gráfico de dimensiones
    const dimensionData = Object.keys(DIMENSIONES).map(dimId => {
        const metasDimension = state.metas.filter(m => m.dimension === dimId);
        const totalPond = metasDimension.reduce((sum, m) => sum + m.ponderacion, 0);
        const avancePond = metasDimension.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
        return totalPond > 0 ? Math.round((avancePond / totalPond) * 100) : 0;
    });

    state.charts.dimensiones.data.datasets[0].data = dimensionData;
    state.charts.dimensiones.update();

    // Actualizar gráfico de estados
    const estadoData = Object.keys(ESTADOS).map(estado => {
        return state.metas.filter(m => m.estado === estado).length;
    });

    state.charts.estados.data.datasets[0].data = estadoData;
    state.charts.estados.update();

    // Actualizar gráfico de evolución
    const evolucionData = EVOLUCION_TRIMESTRAL[state.currentYear];
    if (evolucionData) {
        state.charts.evolucion.data.datasets[0].data = evolucionData.cumplimiento;
        state.charts.evolucion.update();
    }
}

function updateAlerts() {
    const container = document.getElementById('alertsList');
    const today = new Date();

    const alertas = state.metas
        .filter(m => m.estado !== 'lograda')
        .map(m => {
            const fecha = new Date(m.fechaCumplimiento);
            const diasRestantes = Math.ceil((fecha - today) / (1000 * 60 * 60 * 24));
            return { ...m, diasRestantes };
        })
        .filter(m => m.diasRestantes <= 30)
        .sort((a, b) => a.diasRestantes - b.diasRestantes);

    if (alertas.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: var(--spacing-lg)">
                <p>No hay alertas de vencimiento próximo.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = alertas.map(alerta => {
        const isUrgent = alerta.diasRestantes <= 7;
        return `
            <div class="alert-item ${isUrgent ? '' : 'warning'}">
                <div class="alert-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alerta.nombre}</div>
                    <div class="alert-detail">${DIMENSIONES[alerta.dimension].nombre} - Avance: ${alerta.avance}%</div>
                </div>
                <div class="alert-date">
                    ${alerta.diasRestantes <= 0 ? 'Vencido' : `${alerta.diasRestantes} días`}
                </div>
            </div>
        `;
    }).join('');
}

function updateSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');

    const rows = Object.entries(DIMENSIONES).map(([dimId, dim]) => {
        const metasDim = state.metas.filter(m => m.dimension === dimId);
        const total = metasDim.length;
        const logradas = metasDim.filter(m => m.estado === 'lograda').length;
        const enProgreso = metasDim.filter(m => m.estado === 'progreso').length;

        const totalPond = metasDim.reduce((sum, m) => sum + m.ponderacion, 0);
        const avancePond = metasDim.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
        const avance = totalPond > 0 ? Math.round((avancePond / totalPond) * 100) : 0;

        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 12px; height: 12px; background: ${dim.color}; border-radius: 3px;"></span>
                        ${dim.nombre}
                    </div>
                </td>
                <td>${dim.peso}%</td>
                <td>${total}</td>
                <td>${logradas}</td>
                <td>${enProgreso}</td>
                <td>
                    <div class="meta-progress" style="min-width: 100px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${avance}%"></div>
                        </div>
                        <span class="progress-text">${avance}%</span>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = rows.join('');
}

// ============================================
// Utilidades
// ============================================

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Exponer funciones globalmente para debugging
window.appState = state;
window.saveData = saveData;
window.loadData = loadData;

// ============================================
// Exportación de Reportes
// ============================================

function setupReportListeners() {
    document.getElementById('btnExportPDF').addEventListener('click', exportToPDF);
    document.getElementById('btnExportExcel').addEventListener('click', exportToExcel);
    document.getElementById('btnPrintReport').addEventListener('click', printReport);
}

function generateReportHTML() {
    const today = new Date().toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Calcular estadísticas
    const totalMetas = state.metas.length;
    const logradas = state.metas.filter(m => m.estado === 'lograda').length;
    const enProgreso = state.metas.filter(m => m.estado === 'progreso').length;
    const pendientes = state.metas.filter(m => m.estado === 'pendiente').length;
    const noLogradas = state.metas.filter(m => m.estado === 'no-lograda').length;

    const totalPonderacion = state.metas.reduce((sum, m) => sum + m.ponderacion, 0);
    const avancePonderado = state.metas.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
    const cumplimiento = totalPonderacion > 0 ? Math.round((avancePonderado / totalPonderacion) * 100) : 0;

    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte de Seguimiento - Convenio ADP ${state.currentYear}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #333; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
                .header h1 { color: #667eea; font-size: 24px; margin-bottom: 5px; }
                .header h2 { color: #666; font-size: 16px; font-weight: normal; }
                .header .info { margin-top: 15px; font-size: 14px; color: #888; }
                .section { margin-bottom: 25px; }
                .section h3 { background: #667eea; color: white; padding: 10px 15px; margin-bottom: 15px; font-size: 14px; }
                .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
                .kpi-box { border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 8px; }
                .kpi-box .value { font-size: 28px; font-weight: bold; color: #667eea; }
                .kpi-box .label { font-size: 12px; color: #666; }
                .kpi-box.success .value { color: #38ef7d; }
                .kpi-box.warning .value { color: #ffc107; }
                .kpi-box.danger .value { color: #ff4b2b; }
                table { width: 100%; border-collapse: collapse; font-size: 12px; }
                th { background: #f5f5f5; padding: 10px; text-align: left; border: 1px solid #ddd; font-weight: 600; }
                td { padding: 8px 10px; border: 1px solid #ddd; vertical-align: top; }
                tr:nth-child(even) { background: #fafafa; }
                .status { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; }
                .status.pendiente { background: #e0e0e0; color: #666; }
                .status.progreso { background: #e3f2fd; color: #1976d2; }
                .status.lograda { background: #e8f5e9; color: #388e3c; }
                .status.no-lograda { background: #ffebee; color: #d32f2f; }
                .progress-bar { width: 100%; height: 16px; background: #e0e0e0; border-radius: 8px; overflow: hidden; }
                .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); }
                .dimension-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; color: white; }
                .dimension-tag.pedagogica { background: #667eea; }
                .dimension-tag.recursos { background: #f093fb; }
                .dimension-tag.liderazgo { background: #ffd700; color: #333; }
                .dimension-tag.convivencia { background: #ff6b6b; }
                .dimension-tag.resultados { background: #38ef7d; color: #333; }
                .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 11px; color: #888; text-align: center; }
                .summary-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px; }
                .summary-item { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .summary-item .name { font-size: 11px; color: #666; margin-bottom: 5px; }
                .summary-item .peso { font-size: 10px; color: #999; }
                .summary-item .avance { font-size: 20px; font-weight: bold; }
                @media print { body { padding: 10px; } .kpi-grid { grid-template-columns: repeat(4, 1fr); } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>REPORTE DE SEGUIMIENTO</h1>
                <h2>Convenio de Desempeño Director - ${INFO_CONVENIO.establecimiento}</h2>
                <div class="info">
                    <strong>Director:</strong> ${INFO_CONVENIO.director} | 
                    <strong>Año Evaluado:</strong> ${state.currentYear} | 
                    <strong>Fecha Reporte:</strong> ${today}
                </div>
            </div>

            <div class="section">
                <h3>📊 INDICADORES CLAVE</h3>
                <div class="kpi-grid">
                    <div class="kpi-box ${cumplimiento >= 60 ? 'success' : cumplimiento >= 40 ? 'warning' : 'danger'}">
                        <div class="value">${cumplimiento}%</div>
                        <div class="label">Cumplimiento General</div>
                    </div>
                    <div class="kpi-box success">
                        <div class="value">${logradas}</div>
                        <div class="label">Metas Logradas</div>
                    </div>
                    <div class="kpi-box">
                        <div class="value">${enProgreso}</div>
                        <div class="label">En Progreso</div>
                    </div>
                    <div class="kpi-box ${pendientes + noLogradas > 0 ? 'warning' : ''}">
                        <div class="value">${pendientes + noLogradas}</div>
                        <div class="label">Pendientes / No Logradas</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3>📈 AVANCE POR DIMENSIÓN</h3>
                <div class="summary-grid">
                    ${Object.entries(DIMENSIONES).map(([dimId, dim]) => {
        const metasDim = state.metas.filter(m => m.dimension === dimId);
        const totalPond = metasDim.reduce((sum, m) => sum + m.ponderacion, 0);
        const avancePond = metasDim.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
        const avance = totalPond > 0 ? Math.round((avancePond / totalPond) * 100) : 0;
        return `
                            <div class="summary-item">
                                <div class="name">${dim.nombre}</div>
                                <div class="peso">Peso: ${dim.peso}%</div>
                                <div class="avance" style="color: ${avance >= 60 ? '#38ef7d' : '#ffc107'}">${avance}%</div>
                            </div>
                        `;
    }).join('')}
                </div>
            </div>

            <div class="section">
                <h3>📋 DETALLE DE METAS</h3>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 5%">#</th>
                            <th style="width: 20%">Meta</th>
                            <th style="width: 12%">Dimensión</th>
                            <th style="width: 8%">Pond.</th>
                            <th style="width: 25%">Meta ${state.currentYear}</th>
                            <th style="width: 10%">Estado</th>
                            <th style="width: 10%">Avance</th>
                            <th style="width: 10%">Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.metas.map((meta, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td><strong>${meta.nombre}</strong></td>
                                <td><span class="dimension-tag ${meta.dimension}">${DIMENSIONES[meta.dimension].nombre}</span></td>
                                <td>${meta.ponderacion}%</td>
                                <td>${meta.metaAnual ? meta.metaAnual[state.currentYear] || '-' : '-'}</td>
                                <td><span class="status ${meta.estado}">${ESTADOS[meta.estado].nombre}</span></td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${meta.avance}%"></div>
                                    </div>
                                    <div style="text-align: center; font-size: 10px; margin-top: 2px;">${meta.avance}%</div>
                                </td>
                                <td>${formatDate(meta.fechaCumplimiento)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h3>📅 PRÓXIMOS HITOS</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hito</th>
                            <th>Categoría</th>
                            <th>Responsable</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.hitos.filter(h => h.fecha.startsWith(state.currentYear)).slice(0, 10).map(hito => `
                            <tr>
                                <td>${formatDate(hito.fecha)}</td>
                                <td><strong>${hito.titulo}</strong><br><small>${hito.descripcion || ''}</small></td>
                                <td>${CATEGORIAS_HITOS[hito.categoria].nombre}</td>
                                <td>${hito.responsable || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="footer">
                <p><strong>${INFO_CONVENIO.titulo}</strong> - ${INFO_CONVENIO.sostenedor}</p>
                <p>Reporte generado el ${today} | Panel de Gestión ADP v1.0</p>
                <p style="margin-top: 10px;">App creada por <strong>Juan P. Ramírez</strong> - Product Manager</p>
            </div>
        </body>
        </html>
    `;

    return html;
}

function exportToPDF() {
    const html = generateReportHTML();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();

    // Esperar a que cargue y luego abrir diálogo de impresión
    printWindow.onload = function () {
        printWindow.print();
    };

    showNotification('Reporte PDF generado. Use "Guardar como PDF" en el diálogo de impresión.', 'success');
}

function exportToExcel() {
    const today = new Date().toISOString().split('T')[0];

    // Crear contenido CSV
    let csv = 'REPORTE DE SEGUIMIENTO - CONVENIO ADP\n';
    csv += `Establecimiento:,${INFO_CONVENIO.establecimiento}\n`;
    csv += `Director:,${INFO_CONVENIO.director}\n`;
    csv += `Año Evaluado:,${state.currentYear}\n`;
    csv += `Fecha Reporte:,${today}\n\n`;

    // Resumen
    const totalMetas = state.metas.length;
    const logradas = state.metas.filter(m => m.estado === 'lograda').length;
    const totalPonderacion = state.metas.reduce((sum, m) => sum + m.ponderacion, 0);
    const avancePonderado = state.metas.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
    const cumplimiento = totalPonderacion > 0 ? Math.round((avancePonderado / totalPonderacion) * 100) : 0;

    csv += 'RESUMEN\n';
    csv += `Cumplimiento General:,${cumplimiento}%\n`;
    csv += `Metas Logradas:,${logradas} de ${totalMetas}\n\n`;

    // Metas
    csv += 'DETALLE DE METAS\n';
    csv += 'N°,Meta,Dimensión,Ponderación,Meta Anual,Estado,Avance,Fecha Vencimiento\n';

    state.metas.forEach((meta, index) => {
        const metaAnual = meta.metaAnual ? (meta.metaAnual[state.currentYear] || '') : '';
        // Escapar comas y comillas en los campos
        const nombre = `"${meta.nombre.replace(/"/g, '""')}"`;
        const dimension = DIMENSIONES[meta.dimension].nombre;
        const estado = ESTADOS[meta.estado].nombre;
        const metaAnualClean = `"${metaAnual.replace(/"/g, '""')}"`;

        csv += `${index + 1},${nombre},${dimension},${meta.ponderacion}%,${metaAnualClean},${estado},${meta.avance}%,${meta.fechaCumplimiento}\n`;
    });

    csv += '\nHITOS DEL CALENDARIO\n';
    csv += 'Fecha,Título,Categoría,Responsable,Descripción\n';

    state.hitos.filter(h => h.fecha.startsWith(state.currentYear)).forEach(hito => {
        const titulo = `"${hito.titulo.replace(/"/g, '""')}"`;
        const desc = `"${(hito.descripcion || '').replace(/"/g, '""')}"`;
        csv += `${hito.fecha},${titulo},${CATEGORIAS_HITOS[hito.categoria].nombre},${hito.responsable || ''},${desc}\n`;
    });

    // Crear y descargar archivo
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_ADP_${state.currentYear}_${today}.csv`;
    link.click();

    showNotification('Reporte Excel (CSV) descargado correctamente.', 'success');
}

function printReport() {
    const html = generateReportHTML();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.print();
    };
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success'
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
        </svg>
        <span>${message}</span>
    `;

    // Agregar estilos inline
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    notification.querySelector('svg').style.cssText = 'width: 24px; height: 24px;';

    document.body.appendChild(notification);

    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Agregar animaciones para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Inicializar event listeners de reportes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento para asegurar que los elementos existen
    setTimeout(setupReportListeners, 100);
    // Inicializar Calendario CEIA
    setTimeout(initCalendarioCEIA, 150);
});

// ============================================
// Calendario CEIA
// ============================================

// Estado del filtro CEIA
let filtrosCEIA = {
    tipo: 'all',
    mes: 'all',
    soloEvidencias: false
};

function initCalendarioCEIA() {
    // Setup event listeners para filtros CEIA
    const filterTipo = document.getElementById('filterTipoCEIA');
    const filterMes = document.getElementById('filterMesCEIA');
    const filterEvidencias = document.getElementById('filterSoloEvidencias');
    const btnSincronizar = document.getElementById('btnSincronizarCEIA');

    if (filterTipo) {
        filterTipo.addEventListener('change', (e) => {
            filtrosCEIA.tipo = e.target.value;
            renderCalendarioCEIA();
        });
    }

    if (filterMes) {
        filterMes.addEventListener('change', (e) => {
            filtrosCEIA.mes = e.target.value;
            renderCalendarioCEIA();
        });
    }

    if (filterEvidencias) {
        filterEvidencias.addEventListener('change', (e) => {
            filtrosCEIA.soloEvidencias = e.target.checked;
            renderCalendarioCEIA();
        });
    }

    if (btnSincronizar) {
        btnSincronizar.addEventListener('click', sincronizarConHitos);
    }

    // Renderizar inicialmente
    renderCalendarioCEIA();
}

function renderCalendarioCEIA() {
    const container = document.getElementById('ceiaList');
    if (!container) return;

    // Filtrar actividades
    const actividadesFiltradas = CALENDARIO_CEIA.filter(act => {
        // Filtro por tipo
        if (filtrosCEIA.tipo !== 'all' && act.tipo !== filtrosCEIA.tipo) {
            return false;
        }

        // Filtro por mes
        if (filtrosCEIA.mes !== 'all') {
            const mes = parseInt(act.fecha.split('-')[1]);
            if (mes !== parseInt(filtrosCEIA.mes)) {
                return false;
            }
        }

        // Filtro solo evidencias
        if (filtrosCEIA.soloEvidencias && !act.esEvidenciaADP) {
            return false;
        }

        return true;
    });

    // Actualizar contadores
    updateCEIAStats(actividadesFiltradas);

    // Agrupar por mes
    const actividadesPorMes = agruparPorMes(actividadesFiltradas);

    if (Object.keys(actividadesPorMes).length === 0) {
        container.innerHTML = `
            <div class="empty-state glass-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3>No hay actividades para mostrar</h3>
                <p>Ajusta los filtros para ver más actividades.</p>
            </div>
        `;
        return;
    }

    let html = '';
    const nombresMeses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    Object.keys(actividadesPorMes).sort((a, b) => a - b).forEach(mes => {
        const actividades = actividadesPorMes[mes];
        const evidenciasEnMes = actividades.filter(a => a.esEvidenciaADP).length;

        html += `
            <div class="ceia-month-group">
                <div class="ceia-month-header">
                    <h3>
                        📅 ${nombresMeses[parseInt(mes)]} 2026
                        <span class="month-count">(${actividades.length} actividades${evidenciasEnMes > 0 ? `, ${evidenciasEnMes} evidencias` : ''})</span>
                    </h3>
                </div>
                <div class="ceia-month-activities">
        `;

        actividades.forEach(act => {
            const fecha = new Date(act.fecha + 'T12:00:00');
            const dia = fecha.getDate();
            const diaSemana = diasSemana[fecha.getDay()];
            const categoria = CATEGORIAS_CEIA[act.tipo] || { nombre: act.tipo, icon: '📋' };

            // Buscar el nombre de la meta relacionada
            let nombreMeta = '';
            if (act.metaRelacionada) {
                const meta = METAS_INICIALES.find(m => m.id === act.metaRelacionada);
                if (meta) {
                    nombreMeta = meta.nombre;
                }
            }

            html += `
                <div class="ceia-activity ${act.tipo}">
                    <div class="activity-date">
                        <span class="day">${dia}</span>
                        <span class="weekday">${diaSemana}</span>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            ${categoria.icon || ''} ${act.titulo}
                            <span class="tipo-badge ${act.tipo}">${categoria.nombre}</span>
                        </div>
                        ${act.esEvidenciaADP && nombreMeta ? `
                            <div class="activity-meta">
                                📎 Meta ADP: <strong>${nombreMeta}</strong>
                            </div>
                        ` : ''}
                    </div>
                    ${act.esEvidenciaADP ? `
                        <div class="activity-evidencia">
                            <span class="evidencia-tag">
                                <span class="star">⭐</span> Evidencia ADP
                            </span>
                            ${act.dimensionADP ? `
                                <span class="dimension-tag ${act.dimensionADP}">
                                    ${DIMENSIONES[act.dimensionADP]?.nombre || act.dimensionADP}
                                </span>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function agruparPorMes(actividades) {
    const grupos = {};
    actividades.forEach(act => {
        const mes = act.fecha.split('-')[1];
        if (!grupos[mes]) {
            grupos[mes] = [];
        }
        grupos[mes].push(act);
    });

    // Ordenar cada grupo por fecha
    Object.keys(grupos).forEach(mes => {
        grupos[mes].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    });

    return grupos;
}

function updateCEIAStats(actividades) {
    const totalEl = document.getElementById('totalActividades');
    const evidenciasEl = document.getElementById('totalEvidencias');

    if (totalEl) {
        totalEl.textContent = actividades.length;
    }

    if (evidenciasEl) {
        const evidencias = actividades.filter(a => a.esEvidenciaADP).length;
        evidenciasEl.textContent = evidencias;
    }
}

function sincronizarConHitos() {
    // Agregar actividades CEIA al calendario de hitos (solo las que son evidencia ADP)
    const evidenciasADP = CALENDARIO_CEIA.filter(act => act.esEvidenciaADP);
    let agregados = 0;

    evidenciasADP.forEach(act => {
        // Verificar si ya existe un hito con la misma fecha y título similar
        const existe = state.hitos.some(h =>
            h.fecha === act.fecha &&
            (h.titulo.includes(act.titulo) || act.titulo.includes(h.titulo) || h.id.startsWith('ceia-sync-'))
        );

        if (!existe) {
            // Mapear tipo CEIA a categoría de hitos
            const categoriaMap = {
                'consejo': 'reunion',
                'administrativo': 'informe',
                'evaluacion': 'evaluacion',
                'celebracion': 'informe',
                'entrega': 'entrega'
            };

            state.hitos.push({
                id: `ceia-sync-${act.id}`,
                titulo: `[CEIA] ${act.titulo}`,
                descripcion: `Actividad del calendario CEIA - Evidencia ADP para dimensión: ${DIMENSIONES[act.dimensionADP]?.nombre || act.dimensionADP}`,
                fecha: act.fecha,
                categoria: categoriaMap[act.tipo] || 'informe',
                responsable: 'Director'
            });
            agregados++;
        }
    });

    // Guardar cambios
    saveData();

    // Actualizar calendario de hitos
    renderCalendar();
    renderUpcomingEvents();

    // Mostrar notificación
    showSyncToast(agregados);
}

function showSyncToast(cantidad) {
    // Remover toast anterior si existe
    const existingToast = document.querySelector('.sync-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'sync-toast';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${cantidad > 0
            ? `✅ ${cantidad} actividades sincronizadas al calendario de hitos`
            : '✓ El calendario ya está sincronizado'}
    `;

    document.body.appendChild(toast);

    // Remover después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================
// Sistema de Reportes PDF
// ============================================

// Inicializar event listeners de reportes
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const btnPDF = document.getElementById('btnExportPDF');
        const btnExcel = document.getElementById('btnExportExcel');
        const btnPrint = document.getElementById('btnPrintReport');

        if (btnPDF) btnPDF.addEventListener('click', generarReportePDF);
        if (btnExcel) btnExcel.addEventListener('click', exportarExcel);
        if (btnPrint) btnPrint.addEventListener('click', imprimirReporte);
    }, 200);
});

function generarReportePDF() {
    const reportWindow = window.open('', '_blank');
    const fechaActual = new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calcular estadísticas
    const stats = calcularEstadisticasReporte();

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Seguimiento ADP - ${state.currentYear}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            padding: 40px;
            max-width: 210mm;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #667eea;
            font-size: 24px;
            margin-bottom: 5px;
        }
        .header h2 {
            color: #555;
            font-size: 18px;
            font-weight: normal;
        }
        .header .fecha {
            margin-top: 10px;
            color: #777;
            font-size: 14px;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 25px;
        }
        .info-box h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .info-item {
            font-size: 14px;
        }
        .info-item strong {
            color: #555;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-box {
            text-align: center;
            padding: 20px 10px;
            border-radius: 8px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        .stat-box.success { background: linear-gradient(135deg, #11998e, #38ef7d); }
        .stat-box.warning { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .stat-box.info { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            display: block;
        }
        .stat-label {
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.9;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h3 {
            color: #667eea;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 15px;
            font-size: 18px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px 8px;
            text-align: left;
        }
        th {
            background: #667eea;
            color: white;
            font-weight: 600;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background: #eee;
            border-radius: 10px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 10px;
            transition: width 0.3s;
        }
        .status {
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status.pendiente { background: #eee; color: #666; }
        .status.progreso { background: #e3f2fd; color: #1976d2; }
        .status.lograda { background: #e8f5e9; color: #388e3c; }
        .status.no-lograda { background: #ffebee; color: #d32f2f; }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #777;
            font-size: 12px;
        }
        .dimension-section {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .dimension-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .dimension-name {
            font-weight: 600;
            color: #333;
        }
        .dimension-progress {
            font-weight: bold;
            color: #667eea;
        }
        @media print {
            body { padding: 20px; }
            .stat-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .progress-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Reporte de Seguimiento y Monitoreo</h1>
        <h2>Convenio de Desempeño - Alta Dirección Pública</h2>
        <p class="fecha">Generado el ${fechaActual}</p>
    </div>

    <div class="info-box">
        <h3>Información del Convenio</h3>
        <div class="info-grid">
            <div class="info-item"><strong>Establecimiento:</strong> ${INFO_CONVENIO.establecimiento}</div>
            <div class="info-item"><strong>Director:</strong> ${INFO_CONVENIO.director}</div>
            <div class="info-item"><strong>Sostenedor:</strong> ${INFO_CONVENIO.sostenedor}</div>
            <div class="info-item"><strong>Período:</strong> ${INFO_CONVENIO.duracion}</div>
            <div class="info-item"><strong>Año en revisión:</strong> ${state.currentYear}</div>
            <div class="info-item"><strong>Meta mínima:</strong> ${INFO_CONVENIO.metaMinimaCumplimiento}%</div>
        </div>
    </div>

    <div class="stats-grid">
        <div class="stat-box">
            <span class="stat-number">${stats.cumplimientoGeneral}%</span>
            <span class="stat-label">Cumplimiento General</span>
        </div>
        <div class="stat-box success">
            <span class="stat-number">${stats.metasLogradas}</span>
            <span class="stat-label">Metas Logradas</span>
        </div>
        <div class="stat-box info">
            <span class="stat-number">${stats.metasEnProgreso}</span>
            <span class="stat-label">En Progreso</span>
        </div>
        <div class="stat-box warning">
            <span class="stat-number">${stats.metasPendientes}</span>
            <span class="stat-label">Pendientes</span>
        </div>
    </div>

    <div class="section">
        <h3>📈 Avance por Dimensión</h3>
        ${generarSeccionesDimensiones()}
    </div>

    <div class="section">
        <h3>📋 Detalle de Metas</h3>
        <table>
            <thead>
                <tr>
                    <th style="width: 25%">Meta</th>
                    <th style="width: 20%">Dimensión</th>
                    <th style="width: 10%">Peso</th>
                    <th style="width: 15%">Avance</th>
                    <th style="width: 15%">Estado</th>
                    <th style="width: 15%">Vencimiento</th>
                </tr>
            </thead>
            <tbody>
                ${generarFilasMetas()}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h3>📅 Próximos Hitos del Calendario</h3>
        <table>
            <thead>
                <tr>
                    <th style="width: 15%">Fecha</th>
                    <th style="width: 35%">Hito</th>
                    <th style="width: 25%">Categoría</th>
                    <th style="width: 25%">Responsable</th>
                </tr>
            </thead>
            <tbody>
                ${generarFilasHitos()}
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p><strong>Convenio de Desempeño - Ley 20.501</strong></p>
        <p>DAEM Ilustre Municipalidad de Parral</p>
        <p style="margin-top: 10px; font-size: 11px;">
            Este reporte fue generado automáticamente por el Panel de Gestión ADP<br>
            Desarrollado por Juan P. Ramírez - Product Manager
        </p>
    </div>

    <script>
        // Auto-abrir diálogo de impresión/guardar como PDF
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        }
    </script>
</body>
</html>
    `;

    reportWindow.document.write(htmlContent);
    reportWindow.document.close();
}

function calcularEstadisticasReporte() {
    const totalMetas = state.metas.length;
    const metasLogradas = state.metas.filter(m => m.estado === 'lograda').length;
    const metasEnProgreso = state.metas.filter(m => m.estado === 'progreso').length;
    const metasPendientes = state.metas.filter(m => m.estado === 'pendiente').length;
    const metasNoLogradas = state.metas.filter(m => m.estado === 'no-lograda').length;

    // Calcular cumplimiento general ponderado
    let cumplimientoGeneral = 0;
    let totalPonderacion = 0;
    state.metas.forEach(meta => {
        cumplimientoGeneral += (meta.avance * meta.ponderacion) / 100;
        totalPonderacion += meta.ponderacion;
    });
    cumplimientoGeneral = totalPonderacion > 0 ? Math.round((cumplimientoGeneral / totalPonderacion) * 100) : 0;

    return {
        totalMetas,
        metasLogradas,
        metasEnProgreso,
        metasPendientes,
        metasNoLogradas,
        cumplimientoGeneral
    };
}

function generarSeccionesDimensiones() {
    let html = '';
    Object.keys(DIMENSIONES).forEach(dimId => {
        const dim = DIMENSIONES[dimId];
        const metasDim = state.metas.filter(m => m.dimension === dimId);
        const totalPond = metasDim.reduce((sum, m) => sum + m.ponderacion, 0);
        const avancePond = metasDim.reduce((sum, m) => sum + (m.avance * m.ponderacion / 100), 0);
        const porcentaje = totalPond > 0 ? Math.round((avancePond / totalPond) * 100) : 0;

        html += `
            <div class="dimension-section">
                <div class="dimension-header">
                    <span class="dimension-name">${dim.nombre} (Peso: ${dim.peso}%)</span>
                    <span class="dimension-progress">${porcentaje}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${porcentaje}%"></div>
                </div>
            </div>
        `;
    });
    return html;
}

function generarFilasMetas() {
    return state.metas.map(meta => {
        const dim = DIMENSIONES[meta.dimension];
        const estadoNombre = ESTADOS[meta.estado]?.nombre || meta.estado;
        return `
            <tr>
                <td>${meta.nombre}</td>
                <td>${dim?.nombre || meta.dimension}</td>
                <td>${meta.ponderacion}%</td>
                <td>
                    <div class="progress-bar" style="height: 15px;">
                        <div class="progress-fill" style="width: ${meta.avance}%"></div>
                    </div>
                    ${meta.avance}%
                </td>
                <td><span class="status ${meta.estado}">${estadoNombre}</span></td>
                <td>${formatDate(meta.fechaCumplimiento)}</td>
            </tr>
        `;
    }).join('');
}

function generarFilasHitos() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const proximosHitos = state.hitos
        .filter(h => new Date(h.fecha) >= today)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 10);

    if (proximosHitos.length === 0) {
        return '<tr><td colspan="4" style="text-align: center; color: #777;">No hay hitos próximos</td></tr>';
    }

    return proximosHitos.map(hito => {
        const cat = CATEGORIAS_HITOS[hito.categoria];
        return `
            <tr>
                <td>${formatDate(hito.fecha)}</td>
                <td>${hito.titulo}</td>
                <td>${cat?.nombre || hito.categoria}</td>
                <td>${hito.responsable || '-'}</td>
            </tr>
        `;
    }).join('');
}

function exportarExcel() {
    // Generar CSV para Excel
    let csv = 'Meta,Dimensión,Indicador,Ponderación,Avance,Estado,Fecha Cumplimiento\n';

    state.metas.forEach(meta => {
        const dim = DIMENSIONES[meta.dimension]?.nombre || meta.dimension;
        const estado = ESTADOS[meta.estado]?.nombre || meta.estado;
        const indicador = meta.indicador.replace(/"/g, '""').replace(/\n/g, ' ');
        csv += `"${meta.nombre}","${dim}","${indicador}",${meta.ponderacion}%,${meta.avance}%,"${estado}","${meta.fechaCumplimiento}"\n`;
    });

    // Descargar archivo
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_ADP_${state.currentYear}.csv`;
    link.click();

    // Notificación
    showNotification('✅ Archivo Excel descargado correctamente', 'success');
}

function imprimirReporte() {
    generarReportePDF();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'sync-toast';
    notification.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${message}
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ============================================
// Modal Actividades CEIA
// ============================================

// Estado para actividades CEIA personalizadas
let actividadesCEIAPersonalizadas = [];

// Cargar actividades personalizadas de localStorage
function loadActividadesCEIA() {
    const saved = localStorage.getItem('actividadesCEIA');
    if (saved) {
        actividadesCEIAPersonalizadas = JSON.parse(saved);
    }
}

// Guardar actividades personalizadas en localStorage
function saveActividadesCEIA() {
    localStorage.setItem('actividadesCEIA', JSON.stringify(actividadesCEIAPersonalizadas));
}

// Obtener todas las actividades CEIA (base + personalizadas)
function getTodasActividadesCEIA() {
    return [...CALENDARIO_CEIA, ...actividadesCEIAPersonalizadas];
}

// Inicializar modal de actividades CEIA
function initModalActividadCEIA() {
    const btnAdd = document.getElementById('btnAddActividadCEIA');
    const modal = document.getElementById('modalActividadCEIA');
    const closeBtn = document.getElementById('closeModalActividadCEIA');
    const cancelBtn = document.getElementById('cancelActividadCEIA');
    const form = document.getElementById('formActividadCEIA');
    const checkboxEvidencia = document.getElementById('actividadEsEvidencia');
    const adpFields = document.getElementById('adpFields');
    const dimensionSelect = document.getElementById('actividadDimension');
    const metaSelect = document.getElementById('actividadMeta');

    // Cargar actividades guardadas
    loadActividadesCEIA();

    // Abrir modal
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            openModalActividadCEIA();
        });
    }

    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalActividadCEIA);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModalActividadCEIA);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalActividadCEIA();
            }
        });
    }

    // Toggle campos ADP
    if (checkboxEvidencia) {
        checkboxEvidencia.addEventListener('change', (e) => {
            if (adpFields) {
                adpFields.style.display = e.target.checked ? 'block' : 'none';
            }
            if (e.target.checked) {
                cargarMetasEnSelector();
            }
        });
    }

    // Filtrar metas por dimensión
    if (dimensionSelect) {
        dimensionSelect.addEventListener('change', (e) => {
            cargarMetasEnSelector(e.target.value);
        });
    }

    // Submit form
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarActividadCEIA();
        });
    }
}

function openModalActividadCEIA() {
    const modal = document.getElementById('modalActividadCEIA');
    const form = document.getElementById('formActividadCEIA');
    const adpFields = document.getElementById('adpFields');
    const checkboxEvidencia = document.getElementById('actividadEsEvidencia');

    // Reset form
    if (form) form.reset();
    if (adpFields) adpFields.style.display = 'none';
    if (checkboxEvidencia) checkboxEvidencia.checked = false;

    // Establecer fecha de hoy como default
    const fechaInput = document.getElementById('actividadFecha');
    if (fechaInput) {
        fechaInput.value = new Date().toISOString().split('T')[0];
    }

    // Mostrar modal
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModalActividadCEIA() {
    const modal = document.getElementById('modalActividadCEIA');
    if (modal) {
        modal.classList.remove('active');
    }
}

function cargarMetasEnSelector(dimensionFiltro = '') {
    const metaSelect = document.getElementById('actividadMeta');
    if (!metaSelect) return;

    // Limpiar opciones
    metaSelect.innerHTML = '<option value="">Seleccione meta...</option>';

    // Filtrar metas
    let metasFiltradas = state.metas;
    if (dimensionFiltro) {
        metasFiltradas = metasFiltradas.filter(m => m.dimension === dimensionFiltro);
    }

    // Agregar opciones
    metasFiltradas.forEach(meta => {
        const option = document.createElement('option');
        option.value = meta.id;
        option.textContent = meta.nombre;
        metaSelect.appendChild(option);
    });
}

function guardarActividadCEIA() {
    const titulo = document.getElementById('actividadTitulo').value.trim();
    const fecha = document.getElementById('actividadFecha').value;
    const tipo = document.getElementById('actividadTipo').value;
    const esEvidencia = document.getElementById('actividadEsEvidencia').checked;
    const dimension = document.getElementById('actividadDimension').value;
    const metaId = document.getElementById('actividadMeta').value;

    if (!titulo || !fecha || !tipo) {
        showNotification('⚠️ Complete todos los campos obligatorios', 'warning');
        return;
    }

    // Crear nueva actividad
    const nuevaActividad = {
        id: `ceia-custom-${Date.now()}`,
        titulo: titulo,
        fecha: fecha,
        tipo: tipo,
        esEvidenciaADP: esEvidencia,
        dimensionADP: esEvidencia ? dimension : null,
        metaRelacionada: esEvidencia ? metaId : null,
        esPersonalizada: true
    };

    // Agregar a la lista
    actividadesCEIAPersonalizadas.push(nuevaActividad);

    // Guardar en localStorage
    saveActividadesCEIA();

    // Cerrar modal
    closeModalActividadCEIA();

    // Actualizar vista
    renderCalendarioCEIA();

    // Notificación
    showNotification(`✅ Actividad "${titulo}" agregada al calendario`, 'success');
}

// Modificar renderCalendarioCEIA para usar todas las actividades
const originalRenderCalendarioCEIA = renderCalendarioCEIA;
renderCalendarioCEIA = function () {
    const container = document.getElementById('ceiaList');
    if (!container) return;

    // Obtener todas las actividades (base + personalizadas)
    const todasActividades = getTodasActividadesCEIA();

    // Filtrar actividades
    const actividadesFiltradas = todasActividades.filter(act => {
        // Filtro por tipo
        if (filtrosCEIA.tipo !== 'all' && act.tipo !== filtrosCEIA.tipo) {
            return false;
        }

        // Filtro por mes
        if (filtrosCEIA.mes !== 'all') {
            const mes = parseInt(act.fecha.split('-')[1]);
            if (mes !== parseInt(filtrosCEIA.mes)) {
                return false;
            }
        }

        // Filtro solo evidencias
        if (filtrosCEIA.soloEvidencias && !act.esEvidenciaADP) {
            return false;
        }

        return true;
    });

    // Actualizar contadores
    updateCEIAStats(actividadesFiltradas);

    // Agrupar por mes
    const actividadesPorMes = agruparPorMes(actividadesFiltradas);

    if (Object.keys(actividadesPorMes).length === 0) {
        container.innerHTML = `
            <div class="empty-state glass-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3>No hay actividades para mostrar</h3>
                <p>Ajusta los filtros o agrega nuevas actividades.</p>
            </div>
        `;
        return;
    }

    let html = '';
    const nombresMeses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    Object.keys(actividadesPorMes).sort((a, b) => a - b).forEach(mes => {
        const actividades = actividadesPorMes[mes];
        const evidenciasEnMes = actividades.filter(a => a.esEvidenciaADP).length;

        html += `
            <div class="ceia-month-group">
                <div class="ceia-month-header">
                    <h3>
                        📅 ${nombresMeses[parseInt(mes)]} 2026
                        <span class="month-count">(${actividades.length} actividades${evidenciasEnMes > 0 ? `, ${evidenciasEnMes} evidencias` : ''})</span>
                    </h3>
                </div>
                <div class="ceia-month-activities">
        `;

        actividades.forEach(act => {
            const fecha = new Date(act.fecha + 'T12:00:00');
            const dia = fecha.getDate();
            const diaSemana = diasSemana[fecha.getDay()];
            const categoria = CATEGORIAS_CEIA[act.tipo] || { nombre: act.tipo, icon: '📋' };

            // Buscar el nombre de la meta relacionada
            let nombreMeta = '';
            if (act.metaRelacionada) {
                const meta = METAS_INICIALES.find(m => m.id === act.metaRelacionada) ||
                    state.metas.find(m => m.id === act.metaRelacionada);
                if (meta) {
                    nombreMeta = meta.nombre;
                }
            }

            const esPersonalizada = act.esPersonalizada ? ' ✨' : '';

            html += `
                <div class="ceia-activity ${act.tipo}">
                    <div class="activity-date">
                        <span class="day">${dia}</span>
                        <span class="weekday">${diaSemana}</span>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            ${categoria.icon || ''} ${act.titulo}${esPersonalizada}
                            <span class="tipo-badge ${act.tipo}">${categoria.nombre}</span>
                        </div>
                        ${act.esEvidenciaADP && nombreMeta ? `
                            <div class="activity-meta">
                                📎 Meta ADP: <strong>${nombreMeta}</strong>
                            </div>
                        ` : ''}
                    </div>
                    ${act.esEvidenciaADP ? `
                        <div class="activity-evidencia">
                            <span class="evidencia-tag">
                                <span class="star">⭐</span> Evidencia ADP
                            </span>
                            ${act.dimensionADP ? `
                                <span class="dimension-tag ${act.dimensionADP}">
                                    ${DIMENSIONES[act.dimensionADP]?.nombre || act.dimensionADP}
                                </span>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

// Inicializar modal cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initModalActividadCEIA, 250);
});

