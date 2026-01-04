# Conexión a Google Sheets - Paso a Paso

## Paso 1: Abrir el Editor de Scripts

1. Abre tu Google Sheet: <https://docs.google.com/spreadsheets/d/18zUFvxod5gdDEZ2dEDyb4FQiUi1DUrldVdG0zcbFRnU/edit>
2. Ve a **Extensiones** → **Apps Script**
3. Se abrirá el editor de scripts

---

## Paso 2: Copiar el Script

Borra todo el contenido del archivo `Código.gs` y pega el siguiente código:

```javascript
// =============================================
// API Panel de Gestión ADP - Google Sheets
// =============================================

const SHEET_METAS = 'Metas';
const SHEET_HITOS = 'Hitos';
const SHEET_ACTIVIDADES = 'ActividadesCEIA';

// Función que se ejecuta al recibir peticiones GET
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getMetas':
        return jsonResponse(getMetas());
      case 'getHitos':
        return jsonResponse(getHitos());
      case 'getActividades':
        return jsonResponse(getActividades());
      case 'getAll':
        return jsonResponse({
          metas: getMetas(),
          hitos: getHitos(),
          actividades: getActividades()
        });
      default:
        return jsonResponse({ error: 'Acción no válida' });
    }
  } catch(error) {
    return jsonResponse({ error: error.toString() });
  }
}

// Función que se ejecuta al recibir peticiones POST
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'saveMetas':
        return jsonResponse(saveMetas(data.metas));
      case 'saveHitos':
        return jsonResponse(saveHitos(data.hitos));
      case 'saveActividades':
        return jsonResponse(saveActividades(data.actividades));
      case 'updateMeta':
        return jsonResponse(updateMeta(data.meta));
      case 'saveAll':
        saveMetas(data.metas || []);
        saveHitos(data.hitos || []);
        saveActividades(data.actividades || []);
        return jsonResponse({ success: true, message: 'Datos guardados' });
      default:
        return jsonResponse({ error: 'Acción no válida' });
    }
  } catch(error) {
    return jsonResponse({ error: error.toString() });
  }
}

// Respuesta en formato JSON
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================
// METAS
// =============================================

function getMetas() {
  const sheet = getOrCreateSheet(SHEET_METAS, [
    'id', 'nombre', 'dimension', 'indicador', 'ponderacion', 
    'avance', 'estado', 'fechaCumplimiento', 'verificacion'
  ]);
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

function saveMetas(metas) {
  const sheet = getOrCreateSheet(SHEET_METAS, [
    'id', 'nombre', 'dimension', 'indicador', 'ponderacion', 
    'avance', 'estado', 'fechaCumplimiento', 'verificacion'
  ]);
  
  // Limpiar datos existentes (excepto encabezados)
  if (sheet.getLastRow() > 1) {
    sheet.deleteRows(2, sheet.getLastRow() - 1);
  }
  
  // Agregar nuevos datos
  metas.forEach(meta => {
    sheet.appendRow([
      meta.id,
      meta.nombre,
      meta.dimension,
      meta.indicador,
      meta.ponderacion,
      meta.avance,
      meta.estado,
      meta.fechaCumplimiento,
      meta.verificacion
    ]);
  });
  
  return { success: true, count: metas.length };
}

function updateMeta(meta) {
  const sheet = getOrCreateSheet(SHEET_METAS, [
    'id', 'nombre', 'dimension', 'indicador', 'ponderacion', 
    'avance', 'estado', 'fechaCumplimiento', 'verificacion'
  ]);
  
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === meta.id) {
      sheet.getRange(i + 1, 1, 1, 9).setValues([[
        meta.id,
        meta.nombre,
        meta.dimension,
        meta.indicador,
        meta.ponderacion,
        meta.avance,
        meta.estado,
        meta.fechaCumplimiento,
        meta.verificacion
      ]]);
      return { success: true, updated: meta.id };
    }
  }
  
  return { success: false, error: 'Meta no encontrada' };
}

// =============================================
// HITOS
// =============================================

function getHitos() {
  const sheet = getOrCreateSheet(SHEET_HITOS, [
    'id', 'titulo', 'descripcion', 'fecha', 'categoria', 'responsable'
  ]);
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

function saveHitos(hitos) {
  const sheet = getOrCreateSheet(SHEET_HITOS, [
    'id', 'titulo', 'descripcion', 'fecha', 'categoria', 'responsable'
  ]);
  
  if (sheet.getLastRow() > 1) {
    sheet.deleteRows(2, sheet.getLastRow() - 1);
  }
  
  hitos.forEach(hito => {
    sheet.appendRow([
      hito.id,
      hito.titulo,
      hito.descripcion,
      hito.fecha,
      hito.categoria,
      hito.responsable
    ]);
  });
  
  return { success: true, count: hitos.length };
}

// =============================================
// ACTIVIDADES CEIA
// =============================================

function getActividades() {
  const sheet = getOrCreateSheet(SHEET_ACTIVIDADES, [
    'id', 'titulo', 'fecha', 'tipo', 'esEvidenciaADP', 
    'dimensionADP', 'metaRelacionada', 'esPersonalizada'
  ]);
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      // Convertir booleanos correctamente
      if (header === 'esEvidenciaADP' || header === 'esPersonalizada') {
        obj[header] = row[i] === true || row[i] === 'TRUE' || row[i] === 'true';
      } else {
        obj[header] = row[i];
      }
    });
    return obj;
  });
}

function saveActividades(actividades) {
  const sheet = getOrCreateSheet(SHEET_ACTIVIDADES, [
    'id', 'titulo', 'fecha', 'tipo', 'esEvidenciaADP', 
    'dimensionADP', 'metaRelacionada', 'esPersonalizada'
  ]);
  
  if (sheet.getLastRow() > 1) {
    sheet.deleteRows(2, sheet.getLastRow() - 1);
  }
  
  actividades.forEach(act => {
    sheet.appendRow([
      act.id,
      act.titulo,
      act.fecha,
      act.tipo,
      act.esEvidenciaADP || false,
      act.dimensionADP || '',
      act.metaRelacionada || '',
      act.esPersonalizada || false
    ]);
  });
  
  return { success: true, count: actividades.length };
}

// =============================================
// UTILIDADES
// =============================================

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    // Formatear encabezados
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('white')
      .setFontWeight('bold');
  }
  
  return sheet;
}

// Función para inicializar las hojas manualmente
function inicializarHojas() {
  getOrCreateSheet(SHEET_METAS, [
    'id', 'nombre', 'dimension', 'indicador', 'ponderacion', 
    'avance', 'estado', 'fechaCumplimiento', 'verificacion'
  ]);
  
  getOrCreateSheet(SHEET_HITOS, [
    'id', 'titulo', 'descripcion', 'fecha', 'categoria', 'responsable'
  ]);
  
  getOrCreateSheet(SHEET_ACTIVIDADES, [
    'id', 'titulo', 'fecha', 'tipo', 'esEvidenciaADP', 
    'dimensionADP', 'metaRelacionada', 'esPersonalizada'
  ]);
  
  SpreadsheetApp.getUi().alert('¡Hojas creadas correctamente!');
}
```

---

## Paso 3: Crear las Hojas

1. En el editor de Apps Script, ve al menú **Ejecutar**
2. Selecciona la función **inicializarHojas**
3. La primera vez pedirá permisos, haz clic en **Revisar permisos** → tu cuenta → **Permitir**
4. Esto creará 3 hojas: `Metas`, `Hitos`, `ActividadesCEIA`

---

## Paso 4: Publicar como Web App

1. Ve a **Implementar** → **Nueva implementación**
2. Haz clic en el ícono de engranaje y selecciona **Aplicación web**
3. Configura:
   - **Descripción**:
   - **Ejecutar como**: Yo
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **¡IMPORTANTE!** Copia la URL que aparece (algo como `https://script.google.com/macros/s/xxx/exec`)
6. Pega esa URL aquí para que pueda conectar la aplicación

---

## Paso 5: Proporcionar la URL

Una vez que tengas la URL de la Web App, dámela para integrarla en la aplicación.
