// garden.js — Ilustraciones botánicas con paths bezier
const GardenArt = (() => {

  const flowers = {
    tecnica:     { label:"Técnica",        p:"#F2C744", pd:"#C89018", pb:"#8A6010", c:"#5A3A08", h:"#3A2206" },
    ingles:      { label:"Inglés",         p:"#EDD5F0", pd:"#C4A0D8", pb:"#9870B8", c:"#D46888", h:"#A84060" },
    transversal: { label:"Transversales",  p:"#FEFDF0", pd:"#E4D8B8", pb:"#C8BC90", c:"#E8C040", h:"#B89020" },
    induccion:   { label:"Inducción",      p:"#F08098", pd:"#D05070", pb:"#A03050", c:"#F8DC60", h:"#C0A010" },
    practica:    { label:"Etapa práctica", p:"#C8E4A0", pd:"#98C068", pb:"#6A9040", c:"#E87090", h:"#B84060" }
  };

  // Constantes de color
  const L="#4A6828", LM="#5E8035", LT="#82A850";
  const ST="#4A6828", SL="#70A040";
  const T1="#7A5A3A", T2="#9A7550", T3="#5A3E28", T4="#3A2818";
  const SK="#C4A878", SD="#8A6848";
  const W="#8A7050",  WL="#6A5838", WP="#A08060";

  // ── Tierra ───────────────────────────────────────────────────────────────
  function soil() {
    return `
      <ellipse cx="64" cy="97" rx="48" ry="7" fill="${T4}" opacity=".4"/>
      <path d="M15 86 C24 66 44 58 64 60 C86 62 106 70 113 86 C100 100 82 106 64 106 C44 106 26 100 15 86Z" fill="${T1}"/>
      <path d="M22 82 C36 70 52 68 64 70 C78 72 96 78 106 86" fill="none" stroke="${T2}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
      <path d="M36 90 C50 84 78 84 92 90" fill="none" stroke="${T3}" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>
      <path d="M38 86 Q50 82 58 86" fill="none" stroke="${T3}" stroke-width="1" stroke-linecap="round" opacity=".3"/>
      <ellipse cx="40" cy="93" rx="3" ry="1.8" fill="${T3}" opacity=".45"/>
      <ellipse cx="90" cy="91" rx="3.5" ry="2" fill="${T2}" opacity=".38"/>`;
  }

  // ── Semilla ──────────────────────────────────────────────────────────────
  function seedEl() {
    return `
      <ellipse cx="64" cy="81" rx="10" ry="6.5" fill="${SK}" transform="rotate(-12 64 81)"/>
      <ellipse cx="62" cy="79" rx="4" ry="2.5" fill="${SD}" transform="rotate(-12 62 79)" opacity=".6"/>
      <path d="M57 83 Q64 78 71 83" fill="none" stroke="${SD}" stroke-width="1.2" opacity=".4"/>`;
  }

  // ── Tallo ────────────────────────────────────────────────────────────────
  function stm(y1, y2, ox=0) {
    const m = Math.round((y1+y2)/2);
    return `
      <path d="M64 ${y1} C${64+ox} ${m} 64 ${m-10} 64 ${y2}" fill="none" stroke="${ST}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M65.5 ${y1} C${65+ox} ${m} 65 ${m-10} 65 ${y2}" fill="none" stroke="${SL}" stroke-width="1" stroke-linecap="round" opacity=".45"/>`;
  }

  // ── Hojas botánicas ──────────────────────────────────────────────────────
  function leafPair(wilt=false) {
    if (wilt) return `
      <path d="M62 72 C46 64 34 70 38 80 C46 74 60 73 62 72Z" fill="${WL}"/>
      <path d="M62 72 L40 76" fill="none" stroke="${W}" stroke-width=".8" opacity=".5"/>
      <path d="M66 70 C82 62 96 66 92 76 C84 70 68 69 66 70Z" fill="${WL}" opacity=".8"/>
      <path d="M66 70 L90 73" fill="none" stroke="${W}" stroke-width=".8" opacity=".5"/>`;
    return `
      <!-- hoja izquierda -->
      <path d="M62 66 C50 58 34 58 34 70 C42 68 58 67 62 66Z" fill="${L}"/>
      <path d="M62 66 C52 62 40 62 38 68Z" fill="${LM}" opacity=".5"/>
      <path d="M62 66 L36 68" fill="none" stroke="${LT}" stroke-width=".9" opacity=".55"/>
      <path d="M54 63 L38 61" fill="none" stroke="${LT}" stroke-width=".5" opacity=".4"/>
      <!-- hoja derecha -->
      <path d="M66 63 C78 55 94 55 94 67 C86 65 70 64 66 63Z" fill="${LM}"/>
      <path d="M66 63 C76 59 88 59 90 65Z" fill="${LT}" opacity=".45"/>
      <path d="M66 63 L92 65" fill="none" stroke="${LT}" stroke-width=".9" opacity=".55"/>
      <path d="M74 60 L90 58" fill="none" stroke="${LT}" stroke-width=".5" opacity=".4"/>
      <!-- hojita alta -->
      <path d="M64 48 C54 42 48 46 52 54 C56 50 62 49 64 48Z" fill="${L}" opacity=".7"/>
      <path d="M64 48 L52 52" fill="none" stroke="${LT}" stroke-width=".7" opacity=".45"/>`;
  }

  function sprout() {
    return `
      <path d="M60 58 C48 48 42 52 46 60 C52 56 58 56 60 58Z" fill="${LM}"/>
      <path d="M60 58 L46 58" fill="none" stroke="${LT}" stroke-width=".7" opacity=".5"/>
      <path d="M68 58 C80 48 86 52 82 60 C76 56 70 56 68 58Z" fill="${L}"/>
      <path d="M68 58 L82 58" fill="none" stroke="${LT}" stroke-width=".7" opacity=".5"/>`;
  }

  // ── Capullo ──────────────────────────────────────────────────────────────
  function bud(c, x, y) {
    return `
      <g transform="translate(${x} ${y})">
        <path d="M0 8 C-5 4 -5 -4 0 -8 C5 -4 5 4 0 8Z" fill="${L}"/>
        <path d="M-3 5 C-7 1 -6 -7 -2 -10 L0 -8Z" fill="${LM}" opacity=".7"/>
        <path d="M3 5 C7 1 6 -7 2 -10 L0 -8Z" fill="${L}" opacity=".6"/>
        <path d="M-7 6 C-11 0 -9 -14 0 -22 C9 -14 11 0 7 6 C4 10 -4 10 -7 6Z" fill="${c.pd}"/>
        <path d="M-3 6 C-7 0 -5 -14 0 -22 C5 -14 7 0 3 6 C1 9 -1 9 -3 6Z" fill="${c.p}"/>
        <path d="M-1 -18 C0 -21 1 -21 1 -18" fill="none" stroke="${c.p}" stroke-width="1.2" opacity=".6"/>
      </g>`;
  }

  // ── Flor marchita ────────────────────────────────────────────────────────
  function wiltBloom(c, x, y) {
    return `
      <g transform="translate(${x} ${y}) rotate(32)">
        <path d="M0 0 C-7 5 -10 18 -6 26" stroke="${WP}" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M0 0 C5 7 6 20 2 28" stroke="${W}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M0 0 C10 3 14 14 10 22" stroke="${WP}" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M0 0 C-10 2 -14 12 -10 20" stroke="${W}" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M0 0 C2 -10 8 -14 5 -6" stroke="${WP}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle r="5.5" fill="${W}"/>
        <circle r="2.5" fill="${WL}"/>
      </g>`;
  }

  // ════════════════════════════════════════════════════════════════════════
  // FLORES BOTÁNICAS — paths bezier por tipo
  // ════════════════════════════════════════════════════════════════════════

  // TÉCNICA: Girasol amarillo con pétalos elongados y centro texturizado
  function sunflower(c, x, y) {
    // Pétalo elongado real: ancho en base, afinado en punta
    const outer = [0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((d,i) => `
      <path d="M0 0 C-4.5 -2 -5.5 -12 -2.5 -22 C-1 -27 1 -27 2.5 -22 C5.5 -12 4.5 -2 0 0Z"
            fill="${i%2===0?c.p:c.pd}" transform="rotate(${d})"
            stroke="${c.pb}" stroke-width=".4" stroke-linejoin="round"/>`).join('');
    const inner = [11.25,33.75,56.25,78.75,101.25,123.75,146.25,168.75].map(d => `
      <path d="M0 0 C-2.5 -1 -3 -8 -1.2 -14 C-.4 -17 .4 -17 1.2 -14 C3 -8 2.5 -1 0 0Z"
            fill="${c.pd}" transform="rotate(${d})" opacity=".8"/>`).join('');
    // Semillas en espiral en el centro
    const seeds = [[0,0,1.5],[3,0,1.2],[0,-3,1.2],[-3,0,1.2],[0,3,1.2],
                   [5.5,2,1],[2,5.5,1],[-5.5,2,1],[-2,-5.5,1],[5.5,-2,1],[-2,5.5,1]]
      .map(([sx,sy,r]) => `<ellipse cx="${sx}" cy="${sy}" rx="${r}" ry="${r*.75}" fill="${c.h}" opacity=".8" transform="rotate(12)"/>`).join('');
    return `
      <g transform="translate(${x} ${y})">
        ${outer}${inner}
        <circle r="10.5" fill="${c.c}"/>
        <circle r="9.5" fill="${c.c}" opacity=".4"/>
        ${seeds}
        <circle r="2.5" fill="${c.h}"/>
      </g>`;
  }

  // INGLÉS: Flor 5 pétalos redondeados estilo prímula (ref top-right)
  function primrose(c, x, y) {
    const petals = [0,72,144,216,288].map(d => `
      <path d="M0 -5
               C-10 -5 -16 -18 -8 -26
               Q0 -30 8 -26
               C16 -18 10 -5 0 -5Z"
            fill="${c.p}" transform="rotate(${d})"
            stroke="${c.pb}" stroke-width=".5"/>
      <path d="M0 -7 C-6 -7 -10 -16 -4 -22 Q0 -25 4 -22 C10 -16 6 -7 0 -7Z"
            fill="${c.pd}" transform="rotate(${d})" opacity=".45"/>`).join('');
    const stamens = [0,60,120,180,240,300].map(d => `
      <line x1="${(4.5*Math.sin(d*Math.PI/180)).toFixed(1)}"
            y1="${(-4.5*Math.cos(d*Math.PI/180)).toFixed(1)}"
            x2="${(7*Math.sin(d*Math.PI/180)).toFixed(1)}"
            y2="${(-7*Math.cos(d*Math.PI/180)).toFixed(1)}"
            stroke="${c.p}" stroke-width=".8" opacity=".7"/>
      <circle cx="${(7.5*Math.sin(d*Math.PI/180)).toFixed(1)}"
              cy="${(-7.5*Math.cos(d*Math.PI/180)).toFixed(1)}"
              r=".9" fill="${c.p}" opacity=".8"/>`).join('');
    return `
      <g transform="translate(${x} ${y})">
        ${petals}
        <circle r="7" fill="${c.c}"/>
        ${stamens}
        <circle r="3.5" fill="${c.h}"/>
      </g>`;
  }

  // TRANSVERSAL: Aster blanco con pétalos finos tipo margarita (ref top-left)
  function aster(c, x, y) {
    const outer = [...Array(16)].map((_,i) => {
      const d = i*22.5, alt = i%2===0;
      return `<path d="M0 0 C-2.5 -2 -3 -13 0 -20 C3 -13 2.5 -2 0 0Z"
                    fill="${alt?c.p:c.pd}" transform="rotate(${d})"
                    stroke="${c.pb}" stroke-width=".3" opacity="${alt?'1':'.8'}"/>`;
    }).join('');
    return `
      <g transform="translate(${x} ${y})">
        ${outer}
        <circle r="7.5" fill="${c.c}"/>
        <circle r="5" fill="${c.c}" opacity=".35"/>
        <circle r="3" fill="${c.h}"/>
      </g>`;
  }

  // INDUCCIÓN: Foxglove / campanula rosada (ref bottom-left)
  function foxglove(c, x, y) {
    // 3 campanas escalonadas
    function bell(bx, by, sc, rot=0) {
      return `<g transform="translate(${bx} ${by}) rotate(${rot}) scale(${sc})">
        <path d="M0 6 C-12 6 -16 -6 -12 -18 C-6 -26 6 -26 12 -18 C16 -6 12 6 0 6Z" fill="${c.pd}"/>
        <path d="M0 6 C-8 6 -10 -4 -6 -14 C-2 -20 2 -20 6 -14 C10 -4 8 6 0 6Z" fill="${c.p}"/>
        <path d="M-4 -10 L0 -20 L4 -10" fill="none" stroke="${c.pd}" stroke-width=".8" opacity=".5"/>
        <path d="M-12 6 C-8 10 8 10 12 6" fill="none" stroke="${c.pd}" stroke-width="1.2" opacity=".5"/>
        <circle cx="-3" cy="-8" r="1.2" fill="${c.pb}" opacity=".6"/>
        <circle cx="2" cy="-12" r="1" fill="${c.pb}" opacity=".5"/>
        <circle cx="-1" cy="-4" r="1.5" fill="${c.pb}" opacity=".5"/>
        <path d="M0 6 L0 14" stroke="${L}" stroke-width="1.5" stroke-linecap="round"/>
      </g>`;
    }
    return `
      <g transform="translate(${x} ${y})">
        ${bell(-10, 18, 0.65, -15)}
        ${bell(10, 12, 0.72, 10)}
        ${bell(0, 2, 0.88, -5)}
      </g>`;
  }

  // PRÁCTICA: Rosa con pétalos en capas superpuestas
  function rose(c, x, y) {
    const sep = [0,72,144,216,288].map(d => `
      <path d="M0 0 C-3 4 -3 12 0 14 C3 12 3 4 0 0Z" fill="${LM}" transform="rotate(${d})"/>`).join('');
    const outer = [0,72,144,216,288].map(d => `
      <path d="M0 -5
               C-11 -5 -18 -18 -10 -26
               Q0 -30 10 -26
               C18 -18 11 -5 0 -5Z"
            fill="${c.pd}" transform="rotate(${d})"/>
      <path d="M0 -6 C-7 -6 -12 -16 -6 -22 Q0 -26 6 -22 C12 -16 7 -6 0 -6Z"
            fill="${c.p}" transform="rotate(${d})" opacity=".7"/>`).join('');
    const mid = [36,108,180,252,324].map(d => `
      <path d="M0 -5 C-8 -5 -12 -14 -6 -20 Q0 -23 6 -20 C12 -14 8 -5 0 -5Z"
            fill="${c.p}" transform="rotate(${d})"/>
      <path d="M0 -6 C-4 -6 -7 -12 -3 -17 Q0 -19 3 -17 C7 -12 4 -6 0 -6Z"
            fill="${c.pd}" transform="rotate(${d})" opacity=".5"/>`).join('');
    return `
      <g transform="translate(${x} ${y})">
        ${sep}${outer}${mid}
        <circle r="6" fill="${c.c}"/>
        <circle r="3.5" fill="${c.h}"/>
        <circle r="1.5" fill="${c.p}" opacity=".5"/>
      </g>`;
  }

  // ─── dispatcher ──────────────────────────────────────────────────────────
  function bloom(type, x, y) {
    const c = flowers[type]||flowers.transversal;
    if (type==="tecnica")   return sunflower(c,x,y);
    if (type==="ingles")    return primrose(c,x,y);
    if (type==="induccion") return foxglove(c,x,y);
    if (type==="practica")  return rose(c,x,y);
    return aster(c,x,y);
  }

  // ════════════════════════════════════════════════════════════════════════
  // ESTADOS 1–6
  // ════════════════════════════════════════════════════════════════════════
  function draw(stateId, flowerType) {
    const type = flowers[flowerType]?flowerType:"transversal";
    const id = String(stateId);

    if (id==="1") return frame(`${soil()}
      <path d="M38 84 Q52 80 60 84" fill="none" stroke="${T3}" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
      <path d="M68 82 Q78 78 86 82" fill="none" stroke="${T3}" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>
      <ellipse cx="35" cy="77" rx="2.5" ry="1.5" fill="${T2}" opacity=".5"/>
      <ellipse cx="94" cy="79" rx="2" ry="1.3" fill="${T3}" opacity=".4"/>`);

    if (id==="2") return frame(`${soil()}${seedEl()}
      <path d="M52 84 Q64 88 76 83" fill="none" stroke="${T3}" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`);

    if (id==="4") return frame(`${soil()}${stm(85,60)}${sprout()}
      <ellipse cx="61" cy="57" rx="1.5" ry="2" fill="#D4EEFF" opacity=".55"/>`);

    if (id==="3") return frame(`${soil()}${stm(85,38)}${leafPair()}${bud(flowers[type]||flowers.transversal,64,30)}`);

    if (id==="5") return frame(`${soil()}${stm(85,40)}${leafPair()}${bloom(type,64,28)}`);

    // marchita
    return frame(`${soil()}
      <path d="M64 86 C67 72 76 58 72 44 C70 36 73 30 75 26"
            fill="none" stroke="${WL}" stroke-width="3" stroke-linecap="round"/>
      <path d="M75.5 26 C74 25 74 24 75 24" fill="none" stroke="${WL}" stroke-width="2" stroke-linecap="round"/>
      ${leafPair(true)}${wiltBloom(flowers[type]||flowers.transversal,74,40)}`);
  }

  // ── Miniatura para leyenda ────────────────────────────────────────────────
  function mini(type) {
    const c = flowers[type]||flowers.transversal;
    let inner;
    if (type==="tecnica")   inner = sunflower(c,28,28);
    else if (type==="ingles")    inner = primrose(c,28,28);
    else if (type==="induccion") inner = foxglove(c,28,28);
    else if (type==="practica")  inner = rose(c,28,28);
    else inner = aster(c,28,28);
    return `<svg viewBox="0 0 56 56" class="flora-mini">
      <defs>
        <filter id="rough-mini" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#rough-mini)">${inner}</g>
    </svg>`;
  }

  function legend() {
    return Object.keys(flowers).map(t=>`
      <span class="flora-key-item">${mini(t)}<em>${flowers[t].label}</em></span>`).join('');
  }

  function frame(inner) {
    return `<svg class="garden-svg" viewBox="0 0 128 108" aria-hidden="true">
      <defs>
        <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#rough)">
        ${inner}
      </g>
    </svg>`;
  }

  return { draw, legend, flowers };
})();
