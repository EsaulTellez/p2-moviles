# 3. Model Context Protocol (MCP) frente a una API Tradicional

## 3.1 Definiciones Fundamentales

### ¿Qué es una API Tradicional?
Una **Interface de Programación de Aplicaciones (API)** es un contrato estático y predeterminado entre componentes de software. Cuando una persona desarrolla una aplicación, lee la documentación técnica, conoce de antemano las rutas (*endpoints*), estructuras de datos, métodos HTTP (GET, POST, PUT, DELETE) o firmas de funciones, y **escribe código explícito** para realizar las peticiones y procesar las respuestas. La decisión de *qué* función llamar y *cuándo* llamarla está completamente codificada antes del tiempo de ejecución.

### ¿Qué es el Model Context Protocol (MCP)?
**MCP (Model Context Protocol)** es un protocolo abierto y estandarizado, basado en **JSON-RPC 2.0**, que permite a las aplicaciones exporner de forma dinámica datos y capacidades a modelos de inteligencia artificial. En lugar de codificar llamadas fijas, un **Servidor MCP** publica un catálogo dinámico de herramientas (*tools*), recursos (*resources*) y plantillas de prompts (*prompts*) con descripciones semánticas y esquemas JSON Schema de sus parámetros. El **Cliente MCP** (Host / LLM) descubre este catálogo **en tiempo de ejecución** y el modelo toma la decisión autónoma de cuál herramienta invocar en función de las instrucciones y necesidades del usuario.

---

## 3.2 Tabla Comparativa Explicativa

| Criterio de Comparación | API Tradicional (REST / gRPC / GraphQL) | Model Context Protocol (MCP) |
| :--- | :--- | :--- |
| **¿Quién decide qué se invoca?** | El programador en tiempo de desarrollo mediante código condicional/flujos explícitos. | El Modelo de Lenguaje (LLM) en tiempo de ejecución analizando la intención del usuario. |
| **Descubrimiento de capacidades** | Manual e implícito: lectura de OpenAPI/Swagger o documentación por humanos. | Dinámico y automatizado: mediante peticiones `tools/list` y `resources/list` al iniciar conexión. |
| **Acoplamiento Cliente-Servidor** | Alto: El cliente debe conocer la URL exacta, estructura de datos y métodos específicos del servicio. | Muy Bajo: El cliente solo necesita conectarse al servidor MCP; las herramientas se exponen de forma estándar. |
| **Formato de Mensajes** | Variable (JSON REST, Protobuf gRPC, XML SOAP, GraphQL queries). | Estandarizado bajo la especificación JSON-RPC 2.0. |
| **Autenticación y Consentimiento** | Tokens fijos (API Keys, OAuth2 Bearer, Basic Auth) manejados por el código cliente. | Control granular en la capa del Cliente/Host con confirmación humana en tiempo real (*Human-in-the-loop*). |
| **Reutilización entre Aplicaciones** | Requiere construir SDKs o conectores a medida para cada nuevo cliente/lenguaje. | Universal: Un único servidor MCP puede conectarse inmediatamente a Claude Desktop, Antigravity, VS Code, Zed, etc. |

---

## 3.3 MCP NO Sustituye a las APIs Tradicionales

Existe un error conceptual común al asumir que la llegada de MCP vuelve obsoletas a las APIs tradicionales. **Esto es completamente falso.**

- **Capa sobre la API:** Un servidor MCP casi siempre actúa como un **envoltorio (*wrapper*)** alrededor de una API o servicio existente. Por ejemplo, un servidor MCP de GitHub llama internamente a la API REST o GraphQL de GitHub.
- **MCP como Traductor para la IA:** La API sigue siendo el mecanismo fundamental para realizar la operación de red o la transacción de datos real; el protocolo MCP simplemente agrega la capa de **descubrimiento semántico** y **esquematización estándar** que permite a un LLM entender qué hace esa API y cómo debe usarla sin intervención directa del desarrollador.
