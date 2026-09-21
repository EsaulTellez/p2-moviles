# 4. Arquitectura de MCP (Model Context Protocol)

## 4.1 Especificación Consultada

- **Versión de la Especificación:** Especificación MCP v2025-06-18 (Model Context Protocol Specification).
- **Fecha de Consulta:** Septiembre de 2026.

---

## 4.2 Modelo Host / Cliente / Servidor

La arquitectura de MCP se basa en una topología cliente-servidor clara de tres componentes principales:

```
+-------------------------------------------------------------------+
|                            HOST / CLIENTE                         |
|   (Ejemplo: Google Antigravity / Claude Desktop / VS Code)        |
|                                                                   |
|   +-------------------+                +----------------------+   |
|   |   Motor de LLM    | <============> |     Cliente MCP      |   |
|   +-------------------+                +----------------------+   |
+---------------------------------------------------|---------------+
                                                    | (stdio / Streamable HTTP)
                                                    v
                                  +---------------------------------+
                                  |          SERVIDOR MCP           |
                                  | (Ej: @mcp/server-filesystem)    |
                                  +---------------------------------+
```

1. **Host:** La aplicación de usuario o entorno de desarrollo (ej. Google Antigravity, Claude Desktop, VS Code, Zed) que orquesta la interfaz, gestiona la seguridad y aloja al LLM.
2. **Cliente MCP:** El módulo dentro del Host que mantiene la conexión 1:1 con un servidor MCP específico, manejando la negociación de protocolo y el transporte JSON-RPC.
3. **Servidor MCP:** Un proceso independiente que expone recursos, herramientas y plantillas mediante la interfaz estandarizada de MCP.

---

## 4.3 Primitivas expuestas por el Servidor

Un servidor MCP expone tres capacidades principales a los modelos:

1. **Herramientas (Tools):** Funciones ejecutables que permiten al modelo realizar acciones en el sistema (ej. `read_file`, `write_file`, `execute_command`). Cada tool incluye un nombre, una descripción detallada en lenguaje natural y un JSON Schema que define los parámetros esperados.
2. **Recursos (Resources):** Fuentes de datos pasivas que el cliente puede leer y proporcionar como contexto al modelo (ej. archivos de log, lecturas de base de datos, estados de memoria). Se identifican mediante URIs únicas (ej. `file:///logs/app.log`).
3. **Plantillas de Prompt (Prompts):** Plantillas reutilizables predefinidas por el servidor para guiar al modelo en tareas específicas (ej. "Analizar reporte de errores" o "Refactorizar código").

---

## 4.4 Primitivas del lado del Cliente

El cliente MCP también expone primitivas hacia el servidor:

1. **Raíces de Contexto (Roots):** Permiten al cliente informarle al servidor cuáles son las fronteras de trabajo o directorios autorizados dentro del workspace del usuario.
2. **Solicitud de Información / Aprobación (Elicitation & Sampling):** Permite al servidor solicitar que el cliente ejecute inferencia adicional con el LLM o pida confirmación interactiva al usuario antes de proceder con una acción de riesgo.

---

## 4.5 Transportes de Comunicación

MCP define dos mecanismos de transporte estandarizados:

1. **stdio (Standard Input/Output):** 
   - Diseñado para **servidores locales** que corren en la misma máquina que el cliente como procesos hijo (*child processes*).
   - La comunicación se realiza mediante mensajes JSON-RPC 2.0 delimitados por saltos de línea a través de `stdin` y `stdout`.
2. **Streamable HTTP (con Server-Sent Events / SSE):**
   - Diseñado para **servidores remotos** que residen en la nube o en la red local.
   - Utiliza peticiones HTTP POST para enviar mensajes desde el cliente y un canal SSE continuo para recibir respuestas en tiempo real desde el servidor.
