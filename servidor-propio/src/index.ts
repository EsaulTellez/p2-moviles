import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as os from "os";

// Inicializar Servidor MCP propio
const server = new Server(
  {
    name: "servidor-propio-esaul",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Registrar catálogo de herramientas (Tools)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "obtener_info_sistema",
        description: "Obtiene información básica del sistema operativo (Plataforma, Arquitectura, Memoria)",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "calcular_hash_texto",
        description: "Calcula la longitud y número de palabras de un texto introducido",
        inputSchema: {
          type: "object",
          properties: {
            texto: {
              type: "string",
              description: "El texto a analizar",
            },
          },
          required: ["texto"],
        },
      },
    ],
  };
});

// Manejar ejecuciones de herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "obtener_info_sistema") {
    const info = {
      plataforma: os.platform(),
      arquitectura: os.arch(),
      memoriaTotalBytes: os.totalmem(),
      memoriaLibreBytes: os.freemem(),
      hostname: os.hostname(),
    };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }

  if (name === "calcular_hash_texto") {
    const texto = String(args?.texto || "");
    const resultado = {
      longitudCaracteres: texto.length,
      numeroPalabras: texto.trim().split(/\s+/).filter(Boolean).length,
      timestamp: new Date().toISOString(),
    };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(resultado, null, 2),
        },
      ],
    };
  }

  throw new Error(`Herramienta no encontrada: ${name}`);
});

// Iniciar servidor mediante transporte stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error al iniciar el servidor MCP:", error);
  process.exit(1);
});
