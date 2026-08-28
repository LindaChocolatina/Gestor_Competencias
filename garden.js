// garden.js — Maneja las ilustraciones botánicas generadas por IA
const GardenArt = (() => {

  const flowers = {
    tecnica:     { label:"Técnica" },
    ingles:      { label:"Inglés" },
    transversal: { label:"Transversales" },
    induccion:   { label:"Inducción" },
    practica:    { label:"Etapa práctica" }
  };

  // ════════════════════════════════════════════════════════════════════════
  // DISPATCHER: devuelve la ruta de la imagen según el estado y tipo
  // ════════════════════════════════════════════════════════════════════════
  function getImagePath(stateId, type) {
    const id = String(stateId);
    
    // Estados generales
    if (id === "1") return "assets/garden/stage_1.png"; // Tierra
    if (id === "2") return "assets/garden/stage_2.png"; // Semilla
    if (id === "4") return "assets/garden/stage_4.png"; // Brote
    if (id === "3") return "assets/garden/stage_3.png"; // Capullo
    if (id === "6") return "assets/garden/stage_6.png"; // Marchita
    
    // Estado 5: Flores adultas por competencia
    if (type === "tecnica")     return "assets/garden/flower_tecnica.png";
    if (type === "ingles")      return "assets/garden/flower_ingles.png";
    if (type === "induccion")   return "assets/garden/flower_induccion.png";
    if (type === "practica")    return "assets/garden/flower_practica.png";
    
    return "assets/garden/flower_transversal.png"; // por defecto
  }

  // ════════════════════════════════════════════════════════════════════════
  // RENDERIZADO DEL ESTADO
  // ════════════════════════════════════════════════════════════════════════
  function draw(stateId, flowerType) {
    const type = flowers[flowerType] ? flowerType : "transversal";
    const src = getImagePath(stateId, type);
    
    return `<img class="garden-art" src="${src}" alt="Estado botánico" draggable="false" />`;
  }

  // ── Miniatura para leyenda ────────────────────────────────────────────────
  function mini(type) {
    const src = getImagePath("5", type);
    return `<img class="flora-mini-img" src="${src}" alt="${type}" draggable="false" />`;
  }

  function legend() {
    return Object.keys(flowers).map(t => `
      <span class="flora-key-item">${mini(t)}<em>${flowers[t].label}</em></span>
    `).join('');
  }

  return { draw, legend, flowers };
})();
