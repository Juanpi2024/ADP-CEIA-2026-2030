# Asistente de evidencias ADP con IA (OpenAI)

El chat de la app (botón verde 💬, abajo a la derecha) funciona de dos maneras:

- **Modo básico** (siempre disponible, sin costo): responde con reglas usando `data.js` y `evidencias.js`.
  Indica qué evidencias faltan por meta, sugiere a qué meta va un documento y qué debe contener.
- **IA conectada**: envía tu pregunta y un resumen de las metas y evidencias a tu Google Apps Script,
  que consulta a OpenAI con **tu** clave. Si la IA falla o no está configurada, se usa el modo básico.

> 🔒 La clave de OpenAI **nunca** va en el código de la app ni en GitHub (la página es pública).
> Se guarda en las *Propiedades del script* de Apps Script, que solo ve tu cuenta de Google.

## Pasos (una sola vez, unos 10 minutos)

1. Abre tu Google Sheet → **Extensiones → Apps Script**.
2. **Guardar la clave:** engranaje ⚙️ *Configuración del proyecto* → *Propiedades del script* →
   **Agregar propiedad** → Propiedad: `OPENAI_API_KEY` · Valor: tu clave (`sk-...`) → **Guardar**.
3. **Agregar el asistente:** en el panel izquierdo, ➕ junto a *Archivos* → **Secuencia de comandos** →
   nombre `Asistente` → pega todo el contenido de [`apps-script/Asistente.gs`](apps-script/Asistente.gs) → guardar.
4. **Conectar la acción:** en `Código.gs`, dentro de `doPost`, en el `switch(action)`, agrega:

   ```javascript
   case 'chat':
     return jsonResponse(chatADP(data));
   ```

5. **Dar permiso para llamar a OpenAI:** selecciona la función `probarAsistente` y pulsa **Ejecutar**.
   Acepta los permisos (pedirá "conectarse a un servicio externo"). En el *Registro de ejecución*
   debe aparecer `{respuesta=...}`.
6. **Publicar sin cambiar la URL:** **Implementar → Administrar implementaciones** → lápiz ✏️ de la
   implementación actual → *Versión*: **Nueva versión** → **Implementar**.
   (No uses "Nueva implementación", porque cambiaría la URL que usa la app.)

Listo: al abrir el chat y preguntar algo, arriba debe decir **"IA conectada"**.

## Costos y límites

- Modelo: `gpt-4o-mini` (se cambia en `OPENAI_MODELO`). Cada pregunta envía unos 5.000 tokens de
  contexto; con este modelo cuesta menos de 1 centavo de dólar por pregunta.
- `LIMITE_DIARIO = 150` preguntas por día, para que nadie gaste tu saldo aunque la URL sea pública.
- Recomendado: en tu cuenta de OpenAI define un límite mensual de gasto (*Settings → Limits*).

## Si algo falla

- El chat dice "Modo básico": revisa los pasos 4 y 6 (que la nueva versión esté implementada).
- En la consola del navegador aparece `Falta OPENAI_API_KEY`: revisa el paso 2 (nombre exacto).
- `OpenAI respondió 401`: la clave es inválida o fue revocada. `429`: sin saldo o límite de OpenAI.
