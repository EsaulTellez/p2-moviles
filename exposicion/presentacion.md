# Diapositivas de Exposición: Tarea 1 - MCP y Sistema de Archivos

**Ponente:** Esaúl Téllez de la Cruz  
**Boleta:** 2023630692 | **Grupo:** 7CV4  
**Asignatura:** Desarrollo de Aplicaciones Móviles II  
**Tiempo estimado:** 5 - 7 Minutos  

---

## Diapositiva 1: Portada e Introducción
- **Título:** De la IA Aislada a la IA Agéntica: Model Context Protocol (MCP)
- **Mensaje clave:** La transición de copiar y pegar texto a permitir que la IA opere de forma segura y estandarizada en nuestro entorno local.

---

## Diapositiva 2: El Problema del Aislamiento
- **¿Por qué los LLMs no pueden ver tu disco duro por sí solos?**
  - **Arquitectura:** El modelo es apátrida (stateless) y corre en clusters remotos. Solo procesa secuencias de texto.
  - **Seguridad:** Dar acceso directo expondría el sistema a borrados imprevistos e inyección de prompts.

---

## Diapositiva 3: MCP vs. API Tradicional (Punto Central)
- **API Tradicional:**
  - Contrato estático escrito por un programador en tiempo de desarrollo.
  - Alto acoplamiento.
- **Model Context Protocol (MCP):**
  - Estándar abierto (JSON-RPC 2.0).
  - El modelo **descubre** el catálogo de herramientas en tiempo de ejecución (`tools/list`).
  - **Aclaración:** MCP NO reemplaza a las APIs; es una capa sobre ellas para hacerlas inteligibles por la IA.

---

## Diapositiva 4: Arquitectura y Primitivas
- **Componentes:** Host (IDE/Cliente) <---> Servidor MCP (Proceso hijo o HTTP/SSE).
- **Primitivas del Servidor:**
  - `Tools` (Acciones ejecutables).
  - `Resources` (Datos de contexto/URIs).
  - `Prompts` (Plantillas guías).
- **Especificación:** MCP v2025-06-18.

---

## Diapositiva 5: Demostración en Vivo & Límites de Seguridad
- **Servidor FS:** `@modelcontextprotocol/server-filesystem` en `mcp-sandbox/`.
- **Operaciones:** Listar, Leer, Crear, Modificar y Buscar.
- **Prueba de Seguridad:** Intento de acceso a `/etc/passwd`.
  - *Resultado:* Intercepción por la lista blanca de directorios (*Access Denied*).

---

## Diapositiva 6: Puntos Extra - Servidor MCP Propio
- Implementado en **Node.js/TypeScript** usando `@modelcontextprotocol/sdk`.
- Exposición de 2 herramientas custom:
  1. `obtener_info_sistema`
  2. `calcular_hash_texto`

---

## Diapositiva 7: Conclusiones
- MCP estandariza la interacción de las IAs agénticas eliminando integraciones propietarias punto a punto.
- La seguridad debe ser multicapa (*Human-in-the-loop* + Sandbox restringido).
