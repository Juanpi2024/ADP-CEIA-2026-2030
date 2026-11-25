// =============================================
// Asistente ADP con IA (OpenAI) - Google Apps Script
// =============================================
// La clave NO va en este archivo. Guárdala en:
//   Configuración del proyecto (engranaje) → Propiedades del script →
//   Propiedad: OPENAI_API_KEY   Valor: sk-...
//
// En doPost(e) de Código.gs agrega dentro del switch(action):
//   case 'chat':
//     return jsonResponse(chatADP(data));

const OPENAI_MODELO = 'gpt-4o-mini';   // económico; puedes cambiarlo
const LIMITE_DIARIO = 150;             // máximo de preguntas por día (protege tu saldo)

function chatADP(data) {
  const clave = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!clave) return { error: 'Falta OPENAI_API_KEY en las propiedades del script' };

  // Límite diario simple para que nadie gaste tu saldo
  const props = PropertiesService.getScriptProperties();
  const hoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
  const llave = 'uso_' + hoy;
  const usos = parseInt(props.getProperty(llave) || '0', 10);
  if (usos >= LIMITE_DIARIO) return { error: 'Se alcanzó el límite diario de preguntas al asistente' };
  props.setProperty(llave, String(usos + 1));

  const pregunta = String(data.pregunta || '').slice(0, 2000);
  const contexto = String(data.contexto || '').slice(0, 30000);
  const historial = Array.isArray(data.historial) ? data.historial.slice(-6) : [];

  const sistema =
    'Eres el asistente del Panel de Gestión ADP del CEIA Juanita Zúñiga Fuentes (SLEP Los Álamos), ' +
    'que apoya al director en su Convenio de Desempeño 2026-2030. Respondes en español de Chile, claro y breve. ' +
    'Ayudas a: (1) identificar qué evidencias faltan por meta, (2) clasificar un documento o actividad en la meta ' +
    'y dimensión correctas y decir qué debe contener para servir como medio de verificación, (3) redactar o ' +
    'mejorar fichas e informes de evidencia. Usa SOLO los datos del CONTEXTO para afirmar qué está cargado o ' +
    'qué falta; si algo no está en el contexto, dilo. Cita metas como "Meta N: nombre". No inventes cifras.\n\n' +
    'CONTEXTO:\n' + contexto;

  const mensajes = [{ role: 'system', content: sistema }];
  historial.forEach(function (m) {
    if (m && (m.role === 'user' || m.role === 'assistant')) {
      mensajes.push({ role: m.role, content: String(m.content || '').slice(0, 2000) });
    }
  });
  mensajes.push({ role: 'user', content: pregunta });

  const resp = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + clave },
    payload: JSON.stringify({ model: OPENAI_MODELO, messages: mensajes, temperature: 0.3, max_tokens: 800 }),
    muteHttpExceptions: true
  });

  const codigo = resp.getResponseCode();
  const cuerpo = JSON.parse(resp.getContentText());
  if (codigo !== 200) {
    return { error: 'OpenAI respondió ' + codigo + ': ' + (cuerpo.error && cuerpo.error.message ? cuerpo.error.message : '') };
  }
  return { respuesta: cuerpo.choices[0].message.content };
}

// Para probar desde el editor: Ejecutar → probarAsistente (ver Registro de ejecución)
function probarAsistente() {
  Logger.log(chatADP({ pregunta: '¿Qué puedes hacer?', contexto: 'Sin datos (prueba).' }));
}
