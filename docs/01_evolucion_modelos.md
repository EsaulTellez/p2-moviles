# 1. Evolución de los Modelos de Lenguaje

## 1.1 De LM a LLM (Language Model a Large Language Model)

Un **Modelo de Lenguaje (LM)** es un modelo probabilístico diseñado para calcular la distribución de probabilidad de secuencias de palabras o tokens. En sus inicios (modelos n-gramas, redes recurrentes RNN y LSTM), su capacidad estaba restringida a predecir la siguiente palabra en ventanas de contexto muy acotadas, presentando serias dificultades para mantener coherencia a largo plazo.

La evolución hacia un **Gran Modelo de Lenguaje (LLM)** ocurrió a partir de 2017 con la introducción de la arquitectura *Transformer* (Vaswani et al.) y el escalamiento masivo en tres dimensiones clave:
1. **Parámetros:** Paso de millones a cientos de miles de millones (o billones) de parámetros interconectados.
2. **Volumen de Datos:** Entrenamiento con corpora masivos a escala web (trillones de tokens).
3. **Cómputo:** Uso intensivo de clusters de GPUs/TPUs para optimización paralela.

Esta escala dio origen a las llamadas **propiedades emergentes** (capabilities that are not present in small models but emerge in large models), permitiendo a los LLMs realizar traducción, resumen de texto, generación de código y seguimiento de instrucciones complejas (*instruction tuning* / RLHF) sin haber sido explícitamente programados para cada tarea individual.

---

## 1.2 Modelos con Razonamiento Explícito (Explicit Reasoning Models)

Existe el mito de que el simple aumento de parámetros convierte automáticamente a un LLM en un sistema capaz de razonar de forma profunda. Sin embargo, el **razonamiento explícito** (capacidad de planificar, descomponer problemas abstractos, verificar pasos intermedios y corregir errores) proviene de técnicas de entrenamiento orientadas a procesos y de cómputo adicional en tiempo de inferencia:

### A. Cómputo en Tiempo de Inferencia (Inference-Time Compute)
A diferencia de los LLMs tradicionales que generan una respuesta estándar token por token (System 1 thinking - rápido e intuitivo), los modelos con razonamiento explícito asignan presupuesto de cómputo adicional durante la inferencia para explorar múltiples cadenas de pensamiento (*Chain-of-Thought - CoT*), generar árboles de búsqueda (*Tree of Thoughts*) y autoevaluar soluciones antes de responder al usuario (System 2 thinking - lento y deliberativo).

### B. Reinforcement Learning sobre Cadenas de Razonamiento (RL on CoT)
Los modelos se entrenan mediante Aprendizaje por Refuerzo con recompensas en el proceso (*Process-Supervised Reward Models - PRMs*), donde no solo se evalúa la respuesta final, sino la validez lógica de cada paso intermedio del razonamiento.

### C. Autocorrección y Reflexión
El modelo ejecuta bucles de verificación interna. Si detecta un error de sintaxis o de lógica durante su generación latente, retrocede y reevalúa el camino alternativo antes de finalizar la salida legible.
