# 🌱 Gestor de Competencias ADSO

Rastreador visual de progreso académico para el programa **Análisis y Desarrollo de Software (ADSO)** del SENA, con temática botánica. Cada competencia "crece" a medida que avanzas en tu proceso de aprendizaje.

---

## ¿Qué hace?

Permite hacer seguimiento personal a cada **RAP (Resultado de Aprendizaje Previsto)** del programa, organizados por competencia. El progreso se guarda automáticamente en el navegador (`localStorage`), por lo que no necesita servidor ni base de datos.

### Estados de progreso (de menor a mayor)

| Ícono | Estado | Significado |
|-------|--------|-------------|
| 🟤 | Suelo esperando semilla | Por evaluar |
| 🌰 | Suelo con semilla | Pendiente |
| 🌱 | Semilla plantada | En espera |
| 🌿 | Plántula | Próximos |
| 🌻 | Flor | Aprobados ✅ |
| 🍂 | Suelo seco | No aprobados ❌ |

---

## Estructura del proyecto

```
Gestor_Competencias/
├── index.html        # Interfaz principal de la app
├── styles.css        # Estilos visuales y animaciones
├── app.js            # Lógica de la aplicación (renderizado, estado)
├── datos.js          # Base de datos de RAPs y competencias
├── procesador.js     # Procesamiento y transformación de datos
├── generar_datos.js  # Script auxiliar para generar datos desde Excel
├── package.json      # Configuración del proyecto y dependencias
└── .gitignore        # Archivos excluidos del repositorio
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
- `localStorage` para persistencia de datos
- Sin frameworks, sin backend — 100% del lado del cliente

---

*Proyecto personal de seguimiento académico — Programa ADSO, SENA* 🌿
