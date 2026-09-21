# 5. El Servidor MCP de Sistema de Archivos (Filesystem Server)

## 5.1 Aclaración Esencial: FS no es el Protocolo

Es fundamental distinguir que **Filesystem (FS)** no constituye una parte intrínseca ni obligatoria del protocolo MCP en sí. 
- **MCP** es el estándar de comunicación abstracto (el transporte, las estructuras JSON-RPC y las primitivas).
- **Filesystem Server** (`@modelcontextprotocol/server-filesystem`) es simplemente uno de los muchos **servidores de referencia** creados por la comunidad para ilustrar cómo exponer operaciones del sistema operativo a un modelo de IA bajo la especificación MCP.

Otros servidores de referencia incluyen servidores para GitHub, PostgreSQL, Brave Search, Slack o Google Drive.

---

## 5.2 Herramientas expuestas por el Servidor FS

El servidor de archivos expone un conjunto de herramientas estandarizadas para operar sobre el disco:

- `list_directory`: Lista los archivos y subcarpetas dentro de una ruta permitida.
- `read_file`: Lee el contenido completo de un archivo de texto.
- `write_file`: Crea o sobrescribe un archivo con el contenido proporcionado.
- `edit_file` / `replace_file`: Realiza modificaciones parciales en trozos de archivos.
- `create_directory`: Crea una nueva carpeta en la ruta especificada.
- `move_file`: Renombra o traslada archivos dentro del área permitida.
- `search_files`: Busca archivos por patrón de nombre o coincidencia de contenido.

---

## 5.3 Delimitación de Alcance y Directorios Permitidos

El servidor de sistema de archivos exige que, durante su inicialización, se le pasen uno o más argumentos con las rutas absolutas de los **directorios explícitamente autorizados** (los llamados *allowed directories*).

### ¿Por qué existe este límite?
1. **Principio de Mínimo Privilegio:** Evita que el modelo acceda a partes sensibles del sistema de archivos como `/etc`, `/var`, directorios personales de usuario (`~/.ssh`, `~/.aws`) o archivos de sistema operativo.
2. **Mitigación de Errores del Modelo:** Si el modelo alucina una ruta (ej. `/usr/local/bin`), el servidor MCP intercepta la petición y valida la ruta contra la lista blanca antes de tocar el sistema de archivos real.

### ¿Qué pasaría sin este límite?
Sin un Sandbox estricto delimitado por el servidor MCP, un prompt malicioso o un error del modelo podría resultar en la lectura de claves privadas, la sobrescritura de configuraciones del sistema o la eliminación inadvertida del sistema operativo completo (`rm -rf /`).
