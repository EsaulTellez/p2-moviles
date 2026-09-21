# 7. Casos de Uso y Herramientas que Implementan MCP

## 7.1 Tres Herramientas Actuales que Implementan MCP

1. **Google Antigravity:**
   - **Descripción:** Entorno de desarrollo agéntico avanzado (IDE / CLI) desarrollado por Google DeepMind.
   - **Uso de MCP:** Integra clientes MCP nativos para conectar herramientas agénticas con el sistema de archivos local, ejecutores de comandos de terminal, servidores de depuración y herramientas de búsqueda web, permitiendo al agente planificar, ejecutar y verificar cambios complejos de código en tiempo real.

2. **Claude Code:**
   - **Descripción:** Herramienta de interfaz de línea de comandos (CLI) desarrollada por Anthropic para asistencia en programación dentro de la terminal.
   - **Uso de MCP:** Utiliza el protocolo MCP para comunicarse de manera estándar con servidores locales (como el servidor de sistema de archivos, repositorios de Git y bases de datos), permitiendo al modelo inspeccionar el código del proyecto y realizar cambios directamente desde la terminal.

3. **Zed Editor:**
   - **Descripción:** Editor de código abierto de alto rendimiento construido en Rust.
   - **Uso de MCP:** Implementa el cliente MCP para permitir que sus asistentes de IA integrados interactúen de forma transparente con los archivos del workspace del usuario y herramientas personalizadas del desarrollador sin acoplamiento propietario.

*(Nota de precisión conceptual: Se excluyen de esta lista nombres de familias de modelos como Qwen o Gemini, ya que corresponden a modelos de lenguaje y no a entornos/clientes de desarrollo).*

---

## 7.2 ¿Cómo editan estas herramientas repositorios completos sin subida manual?

En las interfaces tradicionales de IA (chat web), la persona debía copiar el contenido de un archivo, pegarlo en la ventana de chat, esperar la respuesta y copiar de vuelta el código al editor.

Las herramientas agénticas modernas con MCP eliminan este proceso manual mediante la siguiente arquitectura automatizada:

1. **Descubrimiento de la Estructura:** El agente invoca `list_directory` o `search_files` para comprender la arquitectura del proyecto y mapear los archivos relevantes.
2. **Lectura Selectiva:** En lugar de cargar todo el repositorio a la ventana de contexto del LLM (lo cual sería costoso e ineficiente), el agente utiliza `read_file` para inspeccionar únicamente los componentes que necesita modificar.
3. **Generación de Cambios Estructurados:** El LLM genera el bloque exacto de reemplazo o el archivo completo.
4. **Escritura y Verificación Directa:** La herramienta invoca `write_file` o `edit_file` a través del Servidor MCP de Filesystem para aplicar los cambios directamente en el disco duro del usuario, y posteriormente ejecuta comandos de verificación (como `npm test` o `build`) para confirmar que el código compila adecuadamente.
