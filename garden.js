// garden.js — Ilustraciones botánicas SVG inspiradas en las imágenes de referencia
const GardenArt = (() => {

  // ── Paleta de colores por tipo de competencia ──────────────────────────────
  const flowers = {
    tecnica: {
      label: "Técnica",
      petal: "#E3B84A",      // amarillo girasol
      petalDeep: "#C4922E",
      center: "#7A5A1A",
      heart: "#5C3E0E"
    },
    ingles: {
      label: "Inglés",
      petal: "#D2C0DC",      // lila suave
      petalDeep: "#B89BC8",
      center: "#C45C74",
      heart: "#9B4A60"
    },
    transversal: {
      label: "Transversales",
      petal: "#FFFEF6",      // blanco cremoso
      petalDeep: "#F0E6D0",
      center: "#E3B84A",
      heart: "#C4922E"
    },
    induccion: {
      label: "Inducción",
      petal: "#C45C74",      // rosa-rojo
      petalDeep: "#A84A60",
      center: "#E3B84A",
      heart: "#C4922E"
    },
    practica: {
      label: "Etapa práctica",
      petal: "#D4EAB0",      // verde-amarillo
      petalDeep: "#B3C49A",
      center: "#C45C74",
      heart: "#A84A60"
    }
  };

  // ── Colores generales ─────────────────────────────────────────────────────
  const STEM   = "#5C7A40";
  const STEM2  = "#4A6830";
  const LEAF   = "#5C7A40";
  const LEAF2  = "#6B8F4A";
  const LEAF3  = "#8FA374";
  const SOIL1  = "#7A5A3A";
  const SOIL2  = "#9A754C";
  const SOIL3  = "#5C4030";
  const SOIL4  = "#3E2E20";
  const SEED_C = "#C4A882";
  const SEED_D = "#8A6B4A";
  const WILT   = "#8A7055";
  const WILT_L = "#6A5A38";
  const WILT_P = "#A08060";

  // ══════════════════════════════════════════════════════════════════════════
  // ELEMENTOS BASE DEL JARDÍN
  // ══════════════════════════════════════════════════════════════════════════

  // Montículo de tierra con textura
  function soilMound() {
    return `
      <!-- sombra del montículo -->
      <ellipse cx="64" cy="96" rx="48" ry="8" fill="${SOIL4}" opacity=".35"/>
      <!-- cuerpo del montículo -->
      <path d="M14 86 C22 68 44 60 64 62 C86 64 106 72 114 86 C100 98 80 104 64 104 C46 104 26 98 14 86Z"
            fill="${SOIL1}"/>
      <!-- luz superior del montículo -->
      <path d="M20 82 C34 70 52 68 64 70 C80 72 98 78 108 86"
            fill="none" stroke="${SOIL2}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      <!-- grietas de la tierra -->
      <path d="M36 88 Q48 84 58 88" fill="none" stroke="${SOIL3}" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
      <path d="M72 84 Q82 80 90 85" fill="none" stroke="${SOIL3}" stroke-width="1" stroke-linecap="round" opacity=".4"/>
      <!-- pequeñas piedras -->
      <ellipse cx="42" cy="92" rx="3.5" ry="2" fill="${SOIL3}" opacity=".45"/>
      <ellipse cx="86" cy="90" rx="4" ry="2.2" fill="${SOIL2}" opacity=".4"/>
      <ellipse cx="64" cy="96" rx="3" ry="1.6" fill="${SOIL3}" opacity=".35"/>
    `;
  }

  // Semilla enterrada (estado 2)
  function seedInSoil() {
    return `
      <!-- semilla ovalada con brillo -->
      <ellipse cx="64" cy="82" rx="9" ry="6" fill="${SEED_C}" transform="rotate(-15 64 82)"/>
      <ellipse cx="62" cy="80" rx="3.5" ry="2.2" fill="${SEED_D}" transform="rotate(-15 62 80)" opacity=".65"/>
      <!-- línea de la semilla -->
      <path d="M58 83 Q64 79 70 83" fill="none" stroke="${SEED_D}" stroke-width="1" opacity=".5"/>
    `;
  }

  // Tallo principal
  function stem(h1, h2, curve = 0) {
    const cx = 64 + curve;
    return `<path d="M64 ${h1} C${cx} ${Math.round((h1+h2)/2)} 64 ${Math.round((h1+h2)/2 - 10)} 64 ${h2}"
                  fill="none" stroke="${STEM}" stroke-width="3" stroke-linecap="round"/>
            <path d="M65 ${h1} C${cx+1} ${Math.round((h1+h2)/2)} 65 ${Math.round((h1+h2)/2 - 10)} 65 ${h2}"
                  fill="none" stroke="${STEM2}" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>`;
  }

  // Hoja botánica realista con nervadura
  function botanicalLeaf(cx, cy, rx, ry, rot, flip = false) {
    const sc = flip ? -1 : 1;
    return `
      <g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${sc} 1)">
        <!-- cuerpo de la hoja -->
        <path d="M0 0 C-${rx*0.6} -${ry*0.5} -${rx} -${ry*0.8} -${rx*0.3} -${ry}
                 C${rx*0.3} -${ry} ${rx} -${ry*0.6} ${rx*0.5} 0
                 C${rx*0.3} ${ry*0.3} -${rx*0.3} ${ry*0.2} 0 0Z"
              fill="${LEAF}" />
        <!-- variación de tono -->
        <path d="M0 0 C-${rx*0.3} -${ry*0.4} -${rx*0.5} -${ry*0.7} -${rx*0.1} -${ry}
                 C${rx*0.2} -${ry} ${rx*0.5} -${ry*0.5} ${rx*0.2} 0Z"
              fill="${LEAF2}" opacity=".5"/>
        <!-- nervadura central -->
        <path d="M0 0 L-${rx*0.2} -${ry*0.9}" fill="none" stroke="${LEAF3}" stroke-width="0.8" opacity=".7"/>
        <!-- nervaduras laterales -->
        <path d="M-${rx*0.05} -${ry*0.3} L-${rx*0.6} -${ry*0.55}" fill="none" stroke="${LEAF3}" stroke-width="0.5" opacity=".5"/>
        <path d="M-${rx*0.1} -${ry*0.55} L-${rx*0.7} -${ry*0.75}" fill="none" stroke="${LEAF3}" stroke-width="0.5" opacity=".5"/>
      </g>
    `;
  }

  // Brotes pequeños al salir de la tierra
  function sproutLeaves() {
    return `
      ${botanicalLeaf(56, 54, 8, 14, -35)}
      ${botanicalLeaf(72, 54, 8, 14, 35, true)}
    `;
  }

  // Hojas medias en la planta adulta
  function plantLeaves(wilt = false) {
    const lc = wilt ? WILT_L : LEAF;
    const lc2 = wilt ? WILT : LEAF2;
    if (wilt) {
      return `
        <g opacity=".85">
          <!-- hoja izquierda caída -->
          <path d="M60 72 C44 68 34 74 38 82 C44 78 56 76 60 72Z" fill="${lc}"/>
          <path d="M60 72 L44 78" fill="none" stroke="${lc2}" stroke-width="0.8" opacity=".6"/>
          <!-- hoja derecha caída -->
          <path d="M68 70 C84 64 96 68 92 78 C84 72 72 70 68 70Z" fill="${lc2}"/>
          <path d="M68 70 L84 74" fill="none" stroke="${lc}" stroke-width="0.8" opacity=".6"/>
        </g>
      `;
    }
    return `
      <!-- hoja izquierda grande -->
      <path d="M60 65 C42 55 30 60 34 72 C42 66 56 64 60 65Z" fill="${LEAF}"/>
      <path d="M60 65 L38 67" fill="none" stroke="${LEAF3}" stroke-width="0.9" opacity=".55"/>
      <path d="M54 61 L36 59" fill="none" stroke="${LEAF3}" stroke-width="0.6" opacity=".4"/>
      <!-- hoja derecha grande -->
      <path d="M68 62 C88 50 100 56 94 68 C84 62 70 60 68 62Z" fill="${LEAF2}"/>
      <path d="M68 62 L92 64" fill="none" stroke="${LEAF3}" stroke-width="0.9" opacity=".55"/>
      <path d="M74 57 L94 55" fill="none" stroke="${LEAF3}" stroke-width="0.6" opacity=".4"/>
      <!-- hojita central arriba -->
      <path d="M64 48 C56 40 50 42 54 50 C58 46 62 46 64 48Z" fill="${LEAF}" opacity=".75"/>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FLORES POR TIPO — estilo botánico ilustrado
  // ══════════════════════════════════════════════════════════════════════════

  // TÉCNICA → Girasol amarillo (como en la referencia)
  function sunflower(c, x, y, size = 1) {
    const s = size;
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <!-- pétalos externos — girasol -->
        ${[0,22,44,66,88,110,132,154,176,198,220,242,264,286,308,330].map(d => `
          <ellipse cx="0" cy="-18" rx="4.5" ry="9.5" fill="${c.petal}"
                   transform="rotate(${d})" opacity="${d % 44 === 0 ? 1 : 0.88}"/>
        `).join('')}
        <!-- segunda capa de pétalos (intercalada) -->
        ${[11,33,55,77,99,121,143,165,187,209,231,253,275,297,319,341].map(d => `
          <ellipse cx="0" cy="-15" rx="3.5" ry="7.5" fill="${c.petalDeep}"
                   transform="rotate(${d})" opacity=".7"/>
        `).join('')}
        <!-- disco central oscuro del girasol -->
        <circle r="10" fill="${c.center}"/>
        <!-- textura del disco -->
        ${[-4,-2,0,2,4].flatMap(dx => [-4,-2,0,2,4].map(dy =>
          `<circle cx="${dx}" cy="${dy}" r="1.1" fill="${c.heart}" opacity=".7"/>`
        )).join('')}
        <circle r="3.5" fill="${c.heart}" opacity=".8"/>
      </g>
    `;
  }

  // INGLÉS → Flor de 5 pétalos lila/rosa como en referencia
  function fivePetal(c, x, y, size = 1) {
    const s = size;
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <!-- pétalos redondeados en forma de corazón -->
        ${[0,72,144,216,288].map(d => `
          <g transform="rotate(${d})">
            <path d="M0 -6 C-8 -6 -12 -18 -4 -22 C0 -24 4 -24 8 -22 C16 -18 8 -6 0 -6Z"
                  fill="${c.petal}"/>
            <path d="M0 -8 C-4 -8 -7 -16 -2 -20 C0 -21 2 -21 4 -20 C9 -16 4 -8 0 -8Z"
                  fill="${c.petalDeep}" opacity=".5"/>
          </g>
        `).join('')}
        <!-- centro -->
        <circle r="6" fill="${c.center}"/>
        <circle r="3" fill="${c.heart}"/>
        <!-- estambres -->
        ${[0,60,120,180,240,300].map(d => `
          <circle cx="${Math.round(4.5*Math.sin(d*Math.PI/180))}"
                  cy="${Math.round(-4.5*Math.cos(d*Math.PI/180))}"
                  r="0.9" fill="${c.petal}" opacity=".8"/>
        `).join('')}
      </g>
    `;
  }

  // TRANSVERSAL → Flor blanca estrellada (como jasmine/aster de referencia)
  function starFlower(c, x, y, size = 1) {
    const s = size;
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <!-- pétalos estrechos y largos estilo aster -->
        ${[0,30,60,90,120,150,180,210,240,270,300,330].map(d => `
          <ellipse cx="0" cy="-16" rx="3.2" ry="10" fill="${c.petal}"
                   transform="rotate(${d})"
                   opacity="${d % 60 === 0 ? 1 : 0.82}"/>
        `).join('')}
        <!-- capa interna de pétalos -->
        ${[15,45,75,105,135,165,195,225,255,285,315,345].map(d => `
          <ellipse cx="0" cy="-12" rx="2.2" ry="7" fill="${c.petalDeep}"
                   transform="rotate(${d})" opacity=".6"/>
        `).join('')}
        <!-- centro amarillo -->
        <circle r="6.5" fill="${c.center}"/>
        <circle r="3.5" fill="${c.heart}"/>
      </g>
    `;
  }

  // INDUCCIÓN → Campanilla rosada (como en referencia)
  function bellFlower(c, x, y, size = 1) {
    const s = size;
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <!-- cáliz (base verde) -->
        <path d="M0 4 C-4 0 -4 -4 0 -6 C4 -4 4 0 0 4Z" fill="${LEAF2}" opacity=".8"/>
        <!-- campana principal -->
        <path d="M0 4 C-16 4 -20 -8 -16 -18 C-10 -26 10 -26 16 -18 C20 -8 16 4 0 4Z"
              fill="${c.petal}"/>
        <!-- sombra interna de la campana -->
        <path d="M0 4 C-10 2 -14 -6 -10 -16 C-6 -22 6 -22 10 -16 C14 -6 10 2 0 4Z"
              fill="${c.petalDeep}" opacity=".5"/>
        <!-- líneas internas de la campana -->
        <path d="M0 4 L0 -22" fill="none" stroke="${c.center}" stroke-width="0.8" opacity=".35"/>
        <path d="M-8 0 L-14 -16" fill="none" stroke="${c.petalDeep}" stroke-width="0.6" opacity=".4"/>
        <path d="M8 0 L14 -16" fill="none" stroke="${c.petalDeep}" stroke-width="0.6" opacity=".4"/>
        <!-- borde de la campana con ondas -->
        <path d="M-16 4 C-12 8 -6 10 0 10 C6 10 12 8 16 4"
              fill="none" stroke="${c.petal}" stroke-width="1.5" opacity=".6"/>
        <!-- pistilo -->
        <circle cx="0" cy="-4" r="2" fill="${c.center}" opacity=".8"/>
      </g>
    `;
  }

  // PRÁCTICA → Rosa/flor en espiral (elegante)
  function roseFlower(c, x, y, size = 1) {
    const s = size;
    return `
      <g transform="translate(${x} ${y}) scale(${s})">
        <!-- sépalos verdes -->
        ${[0,72,144,216,288].map(d => `
          <path d="M0 0 C-3 6 -4 14 0 18 C4 14 3 6 0 0Z"
                fill="${LEAF2}" transform="rotate(${d})" opacity=".8"/>
        `).join('')}
        <!-- pétalos externos -->
        ${[0,72,144,216,288].map(d => `
          <path d="M0 -4 C-10 -4 -16 -16 -8 -24 C-2 -28 2 -28 8 -24 C16 -16 10 -4 0 -4Z"
                fill="${c.petal}" transform="rotate(${d})"/>
        `).join('')}
        <!-- pétalos medios -->
        ${[36,108,180,252,324].map(d => `
          <path d="M0 -4 C-7 -4 -10 -13 -4 -18 C-1 -21 1 -21 4 -18 C10 -13 7 -4 0 -4Z"
                fill="${c.petalDeep}" transform="rotate(${d})"/>
        `).join('')}
        <!-- pétalos internos -->
        ${[0,120,240].map(d => `
          <path d="M0 -4 C-4 -4 -6 -10 -2 -13 C0 -15 2 -13 6 -10 C8 -7 4 -4 0 -4Z"
                fill="${c.center}" transform="rotate(${d})" opacity=".85"/>
        `).join('')}
        <!-- corazón -->
        <circle r="3.5" fill="${c.heart}" opacity=".9"/>
      </g>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ESTADOS ESPECIALES (brote, capullo, marchita)
  // ══════════════════════════════════════════════════════════════════════════

  // Capullo cerrado (estado 3 - bud)
  function bud(c, x, y) {
    return `
      <g transform="translate(${x} ${y})">
        <!-- sépalos -->
        <path d="M0 8 C-5 4 -6 -4 -2 -10 C0 -12 2 -12 4 -10 C8 -4 5 4 0 8Z"
              fill="${LEAF2}"/>
        <!-- capullo cerrado -->
        <ellipse cx="0" cy="-4" rx="7" ry="12" fill="${c.petal}"/>
        <!-- tono lateral -->
        <ellipse cx="3" cy="-4" rx="3.5" ry="10" fill="${c.petalDeep}" opacity=".5"/>
        <!-- puntita superior -->
        <ellipse cx="0" cy="-14" rx="2.5" ry="3" fill="${c.center}" opacity=".7"/>
      </g>
    `;
  }

  // Flor marchita (estado 6)
  function wiltHead(c, x, y) {
    return `
      <g transform="translate(${x} ${y}) rotate(28)">
        <!-- pétalos caídos y arrugados -->
        <path d="M0 0 C-8 4 -12 14 -8 20" fill="none" stroke="${WILT_P}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M0 0 C4 6 8 16 4 22" fill="none" stroke="${WILT}" stroke-width="3" stroke-linecap="round"/>
        <path d="M0 0 C10 2 16 10 12 18" fill="none" stroke="${WILT_P}" stroke-width="3" stroke-linecap="round"/>
        <path d="M0 0 C-10 -2 -14 8 -10 14" fill="none" stroke="${WILT}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M0 0 C2 -8 10 -12 8 -4" fill="none" stroke="${WILT_P}" stroke-width="2.5" stroke-linecap="round"/>
        <!-- centro seco -->
        <circle r="5.5" fill="${WILT}"/>
        <circle r="2.5" fill="${WILT_L}"/>
      </g>
    `;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DISPATCHER: elige la flor según tipo
  // ══════════════════════════════════════════════════════════════════════════
  function head(type, mode, x, y) {
    const c = flowers[type] || flowers.transversal;
    if (mode === "bud")   return bud(c, x, y);
    if (mode === "wilt")  return wiltHead(c, x, y);

    // bloom completo
    if (type === "tecnica")     return sunflower(c, x, y);
    if (type === "ingles")      return fivePetal(c, x, y);
    if (type === "induccion")   return bellFlower(c, x, y);
    if (type === "practica")    return roseFlower(c, x, y);
    return starFlower(c, x, y); // transversal
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ESTADOS DEL JARDÍN (1 → 6)
  // ══════════════════════════════════════════════════════════════════════════
  function draw(stateId, flowerType) {
    const type = flowers[flowerType] ? flowerType : "transversal";
    const id = String(stateId);

    // Estado 1: Tierra sin sembrar
    if (id === "1") {
      return frame(`
        ${soilMound()}
        <!-- marcas de tierra removida -->
        <path d="M40 80 Q52 76 62 80" fill="none" stroke="${SOIL3}" stroke-width="2" stroke-linecap="round" opacity=".4"/>
        <path d="M66 78 Q76 74 86 79" fill="none" stroke="${SOIL3}" stroke-width="1.8" stroke-linecap="round" opacity=".35"/>
        <!-- pequeñas piedras decorativas -->
        <ellipse cx="34" cy="75" rx="2.5" ry="1.5" fill="${SOIL2}" opacity=".5"/>
        <ellipse cx="94" cy="77" rx="2" ry="1.3" fill="${SOIL3}" opacity=".45"/>
      `);
    }

    // Estado 2: Semilla plantada
    if (id === "2") {
      return frame(`
        ${soilMound()}
        ${seedInSoil()}
        <!-- surco alrededor de la semilla -->
        <path d="M52 84 Q64 88 76 83" fill="none" stroke="${SOIL3}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
      `);
    }

    // Estado 4: Brote recién nacido
    if (id === "4") {
      return frame(`
        ${soilMound()}
        ${stem(86, 60)}
        ${sproutLeaves()}
        <!-- gota de rocío -->
        <ellipse cx="60" cy="56" rx="1.8" ry="2.4" fill="#D4F0FF" opacity=".6"/>
      `);
    }

    // Estado 3: Planta con capullo
    if (id === "3") {
      return frame(`
        ${soilMound()}
        ${stem(86, 36)}
        ${plantLeaves()}
        ${head(type, "bud", 64, 28)}
      `);
    }

    // Estado 5: Flor en bloom completo
    if (id === "5") {
      return frame(`
        ${soilMound()}
        ${stem(86, 38)}
        ${plantLeaves()}
        ${head(type, "bloom", 64, 28)}
      `);
    }

    // Estado 6: Flor marchita
    return frame(`
      ${soilMound()}
      <!-- tallo doblado -->
      <path d="M64 86 C66 72 74 60 70 46 C68 38 72 34 74 28"
            fill="none" stroke="${WILT_L}" stroke-width="2.8" stroke-linecap="round"/>
      ${plantLeaves(true)}
      ${head(type, "wilt", 74, 40)}
    `);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MINIATURAS y LEYENDA
  // ══════════════════════════════════════════════════════════════════════════
  function mini(type) {
    const c = flowers[type] || flowers.transversal;
    let bloom;
    if (type === "tecnica")   bloom = sunflower(c, 28, 28, 0.72);
    else if (type === "ingles")    bloom = fivePetal(c, 28, 28, 0.72);
    else if (type === "induccion") bloom = bellFlower(c, 28, 28, 0.72);
    else if (type === "practica")  bloom = roseFlower(c, 28, 28, 0.72);
    else                           bloom = starFlower(c, 28, 28, 0.72);
    return `<svg viewBox="0 0 56 56" class="flora-mini">${bloom}</svg>`;
  }

  function legend() {
    return Object.keys(flowers).map(type => `
      <span class="flora-key-item">
        ${mini(type)}
        <em>${flowers[type].label}</em>
      </span>
    `).join('');
  }

  function frame(inner) {
    return `<svg class="garden-svg" viewBox="0 0 128 108" aria-hidden="true">${inner}</svg>`;
  }

  return { draw, legend, flowers };
})();
