if (typeof rapsData === "undefined") {
    alert("Error: No se pudo cargar la base de datos de RAPs. Revisa que datos.js exista.");
}

const STORAGE_KEY = "adso_botanic_progress_v2";

const STATES = {
    "1": { id: "1", short: "Suelo esperando semilla", hint: "por evaluar" },
    "2": { id: "2", short: "Semilla", hint: "pendientes de germinar" },
    "3": { id: "3", short: "Plántula", hint: "en espera" },
    "4": { id: "4", short: "Brote", hint: "próximo a florecer" },
    "5": { id: "5", short: "Flor", hint: "aprobado" },
    "6": { id: "6", short: "Planta marchita", hint: "no aprobado" }
};

const STATE_ORDER = ["1", "2", "4", "3", "5", "6"];

const ESTADO_MAP = {
    "POR EVALUAR": "1",
    "PENDIENTE": "2",
    "EN ESPERA": "3",
    "PROXIMO": "4",
    "APROBADO": "5",
    "NO ENTREGADO": "6",
    "NO APROBADO": "6"
};

const SMALL_WORDS = new Set([
    "de", "del", "la", "el", "los", "las", "y", "e", "o", "u",
    "en", "con", "para", "por", "a", "al", "un", "una", "the", "of", "and"
]);

class App {
    constructor() {
        this.raps = this.loadRaps();
        this.competencias = this.groupRapsByCompetencia();
        this.expandedGroups = new Set();
        this.currentFilter = "all";
        this.query = "";
        this.openMenu = null;

        this.container = document.getElementById("raps-container");
        this.searchInput = document.getElementById("search");

        this.init();
    }

    loadRaps() {
        const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

        return rapsData.map((rap) => {
            const fromFile = ESTADO_MAP[String(rap.estadoInicial || "").toUpperCase()] || "1";
            const stateId = savedProgress[rap.id] || fromFile;
            return { ...rap, stateId };
        });
    }

    groupRapsByCompetencia() {
        const grouped = {};
        this.raps.forEach((rap) => {
            if (!grouped[rap.competencia]) {
                grouped[rap.competencia] = {
                    title: rap.competencia,
                    raps: []
                };
            }
            grouped[rap.competencia].raps.push(rap);
        });
        return Object.values(grouped);
    }

    saveProgress() {
        const progress = {};
        this.raps.forEach((rap) => {
            progress[rap.id] = rap.stateId;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        this.updateStats();
    }

    escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char]));
    }

    prettyText(str) {
        return String(str)
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .map((word, index) => {
                if (/^(SENA|TIC|RAP|RAPS|ADSO|HTML|CSS|SQL|API|SST)$/i.test(word)) {
                    return word.toUpperCase();
                }
                const lower = word.toLowerCase();
                if (index > 0 && SMALL_WORDS.has(lower)) return lower;
                if (!lower) return word;
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            })
            .join(" ");
    }

    parseCompetencia(title) {
        const match = String(title).match(/^(\d+)\s*-\s*(.+)$/);
        let code = "";
        let name = title;
        if (match) {
            code = match[1];
            name = match[2].replace(/Murtra-/i, "Murtra. ").trim();
        }
        return { code, name: this.prettyText(name) };
    }

    parseRap(rapText) {
        const match = String(rapText).match(/^(\d+)\s*-\s*(?:(\d{1,2})\s+)?(.+)$/);
        if (!match) {
            return { code: "", seq: "", text: this.prettyText(rapText) };
        }
        return {
            code: match[1],
            seq: match[2] ? match[2].padStart(2, "0") : "",
            text: this.prettyText(match[3])
        };
    }

    classify(title) {
        const t = title.toLowerCase();
        if (t.includes("practica") || t.includes("práctica")) {
            return { label: "Etapa práctica", type: "practica", flower: "practica" };
        }
        if (t.includes("ingles") || t.includes("inglesa") || t.includes("lengua")) {
            return { label: "Inglés", type: "ingles", flower: "ingles" };
        }
        if (t.includes("inducción") || t.includes("induccion")) {
            return { label: "Inducción", type: "induccion", flower: "induccion" };
        }
        if (
            t.includes("implementar") ||
            t.includes("diseñar") ||
            t.includes("desarrollar la solución") ||
            t.includes("calidad del servicio") ||
            t.includes("requisitos") ||
            t.includes("propuesta técnica") ||
            t.includes("herramientas informáticas")
        ) {
            return { label: "Técnica", type: "tecnica", flower: "tecnica" };
        }
        if (t.includes("enrique low") || t.includes("étic") || t.includes("etic")) {
            return { label: "Ética", type: "transversal", flower: "transversal" };
        }
        if (t.includes("emprendedora")) {
            return { label: "Emprendimiento", type: "transversal", flower: "transversal" };
        }
        return { label: "Transversal", type: "transversal", flower: "transversal" };
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i += 1) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    matchesFilter(rap) {
        if (this.currentFilter === "pending") return rap.stateId !== "5";
        if (this.currentFilter === "approved") return rap.stateId === "5";
        return true;
    }

    matchesSearch(rap, competenciaTitle) {
        if (!this.query) return true;
        const blob = `${rap.rap} ${competenciaTitle}`.toLowerCase();
        return blob.includes(this.query);
    }

    visibleRaps(comp) {
        return comp.raps.filter((rap) => this.matchesFilter(rap) && this.matchesSearch(rap, comp.title));
    }

    changeRapState(rapId, newStateId) {
        const rap = this.raps.find((item) => item.id === rapId);
        if (!rap) return;

        rap.stateId = newStateId;
        this.saveProgress();
        this.closeMenu();

        if (this.currentFilter !== "all" || this.query) {
            this.render();
            return;
        }

        const chip = document.getElementById(`chip-${rapId}`);
        if (chip) {
            chip.className = `state-chip s-${newStateId}`;
            chip.dataset.state = newStateId;
            chip.querySelector(".chip-label").textContent = STATES[newStateId].short;
        }

        const garden = document.getElementById(`garden-${rapId}`);
        if (garden && typeof GardenArt !== "undefined") {
            const flower = this.classify(rap.competencia).flower;
            garden.innerHTML = GardenArt.draw(newStateId, flower);
            garden.setAttribute("aria-label", `${STATES[newStateId].short}, ${STATES[newStateId].hint}`);
        }
        this.updateGroupProgress(rap.competencia);
    }

    updateGroupProgress(competenciaTitle) {
        const comp = this.competencias.find((item) => item.title === competenciaTitle);
        if (!comp) return;

        const hashId = this.hashString(competenciaTitle);
        const total = comp.raps.length;
        const approved = comp.raps.filter((rap) => rap.stateId === "5").length;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);

        const fillEl = document.getElementById(`fill-${hashId}`);
        const textEl = document.getElementById(`pct-${hashId}`);
        const countEl = document.getElementById(`count-${hashId}`);

        if (fillEl) {
            fillEl.style.width = `${percentage}%`;
            fillEl.className = `comp-progress-fill ${percentage === 100 ? "full" : percentage > 0 ? "partial" : ""}`;
        }
        if (textEl) {
            textEl.textContent = `${percentage}%`;
            textEl.className = `comp-percentage ${percentage === 100 ? "full" : percentage > 0 ? "partial" : ""}`;
        }
        if (countEl) {
            countEl.textContent = `${approved} de ${total} en flor`;
        }
    }

    updateStats() {
        const total = this.raps.length;
        const approved = this.raps.filter((rap) => rap.stateId === "5").length;
        const pending = total - approved;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        setText("count-all", total);
        setText("count-pending", pending);
        setText("count-approved", approved);
        setText("stat-pending", pending);
        setText("stat-total", total);
        setText("stat-comps", this.competencias.length);
        setText("stat-percent", `${percentage}%`);

        const vine = document.getElementById("vine-fill");
        if (vine) vine.style.width = `${percentage}%`;
    }

    toggleAccordion(hashId) {
        const groupEl = document.getElementById(`group-${hashId}`);
        if (!groupEl) return;

        const expanded = groupEl.classList.toggle("expanded");
        const header = groupEl.querySelector(".competencia-header");
        if (header) header.setAttribute("aria-expanded", String(expanded));

        if (expanded) this.expandedGroups.add(hashId);
        else this.expandedGroups.delete(hashId);
    }

    closeMenu() {
        if (this.openMenu) {
            this.openMenu.remove();
            this.openMenu = null;
        }
        document.querySelectorAll(".state-chip[aria-expanded='true']").forEach((chip) => {
            chip.setAttribute("aria-expanded", "false");
        });
    }

    openStateMenu(chip) {
        const alreadyOpen = chip.getAttribute("aria-expanded") === "true";
        this.closeMenu();
        if (alreadyOpen) return;

        const rapId = chip.dataset.rapId;
        const current = chip.dataset.state;
        const menu = document.createElement("div");
        menu.className = "state-menu";
        menu.setAttribute("role", "listbox");

        menu.innerHTML = STATE_ORDER.map((id) => STATES[id]).map((state) => `
            <button type="button" class="state-option" role="option" data-rap-id="${rapId}" data-state="${state.id}" aria-selected="${state.id === current}">
                <span class="dot" style="width:.7rem;height:.7rem;border-radius:50%;background:var(--${
                    { 1: "dried", 2: "berry", 3: "lilac", 4: "sage", 5: "mustard", 6: "soil" }[state.id]
                })"></span>
                <span class="opt-copy">
                    <strong>${state.short}</strong>
                    <small>${state.hint}</small>
                </span>
            </button>
        `).join("");

        document.body.appendChild(menu);
        this.openMenu = menu;
        chip.setAttribute("aria-expanded", "true");

        const rect = chip.getBoundingClientRect();
        const menuHeight = menu.offsetHeight;
        const gap = 8;
        const top = rect.bottom + gap + menuHeight > window.innerHeight
            ? Math.max(12, rect.top - menuHeight - gap)
            : rect.bottom + gap;
        const left = Math.min(rect.left, window.innerWidth - menu.offsetWidth - 12);

        menu.style.top = `${top}px`;
        menu.style.left = `${Math.max(12, left)}px`;
        menu.style.width = `${Math.max(rect.width, 260)}px`;

        const options = [...menu.querySelectorAll(".state-option")];
        const selected = options.find((opt) => opt.getAttribute("aria-selected") === "true") || options[0];
        if (selected) selected.focus();

        menu.addEventListener("keydown", (event) => {
            const current = options.indexOf(document.activeElement);
            if (event.key === "ArrowDown") {
                event.preventDefault();
                options[(current + 1) % options.length].focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                options[(current - 1 + options.length) % options.length].focus();
            } else if (event.key === "Home") {
                event.preventDefault();
                options[0].focus();
            } else if (event.key === "End") {
                event.preventDefault();
                options[options.length - 1].focus();
            }
        });
    }

    createRapHTML(rap) {
        const parsed = this.parseRap(rap.rap);
        const state = STATES[rap.stateId] || STATES["1"];
        const flower = this.classify(rap.competencia).flower;
        const drawing = typeof GardenArt !== "undefined" ? GardenArt.draw(rap.stateId, flower) : "";

        return `
            <div class="rap-item">
                <div class="rap-info">
                    <div class="rap-codes">
                        ${parsed.code ? `<span class="rap-code">${this.escapeHtml(parsed.code)}</span>` : ""}
                        ${parsed.seq ? `<span class="rap-seq">${this.escapeHtml(parsed.seq)}</span>` : ""}
                    </div>
                    <h4 class="rap-name">${this.escapeHtml(parsed.text)}</h4>
                </div>
                <div class="rap-aside">
                    <button
                        type="button"
                        class="state-chip s-${rap.stateId}"
                        id="chip-${rap.id}"
                        data-rap-id="${rap.id}"
                        data-state="${rap.stateId}"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                    >
                        <span class="chip-left">
                            <span class="dot"></span>
                            <span class="chip-label">${state.short}</span>
                        </span>
                        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                    <figure class="garden-stage" id="garden-${rap.id}" aria-label="${state.short}, ${state.hint}">
                        ${drawing}
                    </figure>
                </div>
            </div>
        `;
    }

    createCompetenciaHTML(comp, visibleRaps) {
        const hashId = this.hashString(comp.title);
        const total = comp.raps.length;
        const approved = comp.raps.filter((rap) => rap.stateId === "5").length;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);
        const parsed = this.parseCompetencia(comp.title);
        const kind = this.classify(comp.title);
        const expanded = this.expandedGroups.has(hashId);
        const pctClass = percentage === 100 ? "full" : percentage > 0 ? "partial" : "";
        const fillClass = percentage === 100 ? "full" : percentage > 0 ? "partial" : "";

        return `
            <article class="competencia-group ${expanded ? "expanded" : ""}" id="group-${hashId}">
                <button
                    type="button"
                    class="competencia-header"
                    data-hash="${hashId}"
                    aria-expanded="${expanded}"
                    aria-controls="raps-${hashId}"
                >
                    <div class="comp-info">
                        <div class="comp-kicker">
                            ${parsed.code ? `<span class="comp-code">${this.escapeHtml(parsed.code)}</span>` : ""}
                            <span class="tag ${kind.type}">${kind.label}</span>
                        </div>
                        <h3 class="comp-title">${this.escapeHtml(parsed.name)}</h3>
                        <p class="comp-meta" id="count-${hashId}">${approved} de ${total} en flor</p>
                    </div>
                    <div class="comp-progress-wrapper">
                        <div class="comp-progress-bar">
                            <div id="fill-${hashId}" class="comp-progress-fill ${fillClass}" style="width: ${percentage}%"></div>
                        </div>
                        <div id="pct-${hashId}" class="comp-percentage ${pctClass}">${percentage}%</div>
                        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </div>
                </button>
                <div class="raps-list" id="raps-${hashId}">
                    <div class="raps-list-inner">
                        ${visibleRaps.map((rap) => this.createRapHTML(rap)).join("")}
                    </div>
                </div>
            </article>
        `;
    }

    emptyState() {
        return `
            <div class="empty-garden">
                <svg class="flower" viewBox="0 0 80 80" aria-hidden="true">
                    <g transform="translate(40,40)">
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#E3B84A"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#E8C04A" transform="rotate(45)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#D4A63A" transform="rotate(90)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#E3B84A" transform="rotate(135)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#F0C85A" transform="rotate(180)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#E3B84A" transform="rotate(225)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#D4A63A" transform="rotate(270)"/>
                        <ellipse cx="0" cy="-22" rx="4" ry="20" fill="#E8C04A" transform="rotate(315)"/>
                        <circle r="8" fill="#C4922E"/>
                    </g>
                </svg>
                <h2>Este rincón está en silencio</h2>
                <p>No hay RAPs que coincidan con la búsqueda o el filtro.</p>
            </div>
        `;
    }

    render() {
        this.closeMenu();

        const blocks = this.competencias
            .map((comp) => {
                const visible = this.visibleRaps(comp);
                if (!visible.length) return "";
                return this.createCompetenciaHTML(comp, visible);
            })
            .filter(Boolean);

        this.container.innerHTML = blocks.length ? blocks.join("") : this.emptyState();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.filter === filter);
        });
        this.render();
    }

    bindEvents() {
        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", () => this.setFilter(btn.dataset.filter));
        });

        this.searchInput.addEventListener("input", () => {
            this.query = this.searchInput.value.trim().toLowerCase();
            this.render();
        });

        this.container.addEventListener("click", (event) => {
            const header = event.target.closest(".competencia-header");
            if (header) {
                this.toggleAccordion(header.dataset.hash);
                return;
            }

            const chip = event.target.closest(".state-chip");
            if (chip) {
                this.openStateMenu(chip);
            }
        });

        document.addEventListener("click", (event) => {
            if (event.target.closest(".state-menu") || event.target.closest(".state-chip")) return;
            this.closeMenu();
        });

        document.addEventListener("click", (event) => {
            const option = event.target.closest(".state-option");
            if (!option) return;
            this.changeRapState(option.dataset.rapId, option.dataset.state);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") this.closeMenu();
        });

        window.addEventListener("scroll", () => this.closeMenu(), { passive: true });
        window.addEventListener("resize", () => this.closeMenu());
    }

    init() {
        const floraKey = document.getElementById("flora-key");
        if (floraKey && typeof GardenArt !== "undefined") {
            floraKey.innerHTML = GardenArt.legend();
        }
        this.bindEvents();
        this.updateStats();
        this.render();
    }
}

const app = new App();
