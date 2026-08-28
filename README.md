# 🌱 Jardín de Competencias · ADSO

Rastreador visual de progreso académico para el programa **Análisis y Desarrollo de Software (ADSO)** del SENA, con temática botánica. Cada competencia "crece" desde una semilla hasta una flor a medida que avanzas en tu proceso de aprendizaje.

---

## ¿Qué hace?

Permite hacer seguimiento personal a cada **RAP (Resultado de Aprendizaje Previsto)** del programa, organizados por competencia. El progreso se guarda automáticamente en el navegador (`localStorage`), por lo que no necesita servidor ni base de datos.

### Estados de progreso

| Estadío | Analogía | Significado |
|---------|----------|-------------|
| 1 | 🪨 Suelo esperando semilla | Por evaluar |
| 2 | 🌰 Semilla | Pendiente de germinar |
| 4 | 🌱 Brote | Próximo a florecer |
| 3 | 🌿 Plántula | En espera |
| 5 | 🌸 Flor | Aprobado |
| 6 | 🥀 Planta marchita | No aprobado |

### Tipos de flor por competencia

Cada categoría de competencia florece con una planta diferente:

| Categoría | Flor |
|-----------|------|
| Técnica | 🌻 Girasol amarillo |
| Inglés | 🌸 Prímula lila/rosa |
| Transversal | ✿ Aster blanco |
| Inducción | 🔔 Foxglove (campanilla rosada) |
| Etapa práctica | 🌹 Rosa |

---

## Ilustraciones botánicas

Las plantas se renderizan como **SVG vectorial puro** (código en `garden.js`), usando curvas Bézier cúbicas para crear formas orgánicas. Cada estadío tiene su propia composición:

- **Montículo de tierra** con grietas, piedras y textura realista.
- **Hojas botánicas** con nervaduras centrales y laterales.
- **Flores detalladas** con múltiples capas de pétalos, estambres y centros texturizados.
- **Filtro SVG de turbulencia** (`feTurbulence` + `feDisplacementMap`) que da un acabado orgánico de trazo a mano alzada.

Las ilustraciones tienen fondo transparente y se integran directamente con el gradiente de la página.

---

## Estructura del proyecto

```
Gestor_Competencias/
├── index.html         # Interfaz principal (portada + workspace)
├── styles.css         # Estilos visuales, paleta botánica y animaciones
├── app.js             # Lógica de la aplicación (renderizado, filtros, estado)
├── garden.js          # Motor de ilustraciones botánicas SVG
├── datos.js           # Base de datos de RAPs y competencias
├── procesador.js      # Procesamiento y transformación de datos
├── generar_datos.js   # Script auxiliar para generar datos desde Excel
├── package.json       # Configuración del proyecto y dependencias
├── referencia 1.png   # Imagen de referencia para el estilo visual
├── referencia 2.png   # Imagen de referencia para la paleta de colores
└── .gitignore         # Archivos excluidos del repositorio
```

---

## Cómo usar

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.
3. Selecciona el estado de cada RAP usando el menú desplegable.
4. ¡Tu progreso se guarda automáticamente! 🎉

> No necesitas instalar nada para usar la aplicación. La carpeta `node_modules` solo es necesaria si quieres modificar o regenerar los datos desde un archivo Excel.

---

## Dependencias (desarrollo)

- [`xlsx`](https://www.npmjs.com/package/xlsx) — Para leer archivos Excel y extraer los datos de RAPs.

Para instalarlas:
```bash
npm install
```

---

## Tecnologías

- HTML5 · CSS3 · JavaScript Vanilla
- SVG vectorial con filtros nativos para ilustraciones orgánicas
- `localStorage` para persistencia de datos
- Sin frameworks, sin backend — 100% del lado del cliente

---

## Paleta de colores

| Color | Uso | Hex |
|-------|-----|-----|
| Oliva | Fondo principal | `#4B5D43` |
| Mostaza | Acentos, progreso completo | `#E3B84A` |
| Berry | Progreso parcial, inducción | `#C45C74` |
| Lila | Inglés | `#D2C0DC` |
| Salvia | Técnica, hojas | `#B3C49A` |
| Crema | Texto principal | `#F7F2E8` |

---

*Proyecto personal de seguimiento académico — Ficha 3336242 · Programa ADSO, SENA* 🌿
