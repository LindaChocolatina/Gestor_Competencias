// Make sure rapsData exists
if (typeof rapsData === 'undefined') {
    alert("Error: No se pudo cargar la base de datos de RAPs. Revisa que datos.js exista.");
}

const STORAGE_KEY = 'adso_botanic_progress_v2';

const STATES = {
    "1": { id: "1", icon: '🟤', label: 'Suelo esperando semilla: Por evaluar' },
    "2": { id: "2", icon: '🌰', label: 'Suelo con semilla: Pendiente' },
    "3": { id: "3", icon: '🌱', label: 'Semilla plantada: En espera' },
    "4": { id: "4", icon: '🌿', label: 'Plántula: Próximos' },
    "5": { id: "5", icon: '🌻', label: 'Flor: Aprobados' },
    "6": { id: "6", icon: '🍂', label: 'Suelo seco: No aprobados' }
};

class App {
    constructor() {
        this.raps = this.loadRaps();
        this.competencias = this.groupRapsByCompetencia();
        this.expandedGroups = new Set(); // Keep track of open accordions
        
        this.container = document.getElementById('raps-container');
        this.globalProgressText = document.getElementById('global-progress-text');
        this.currentFilter = 'all';
        
        this.init();
    }

    loadRaps() {
        const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        
        return rapsData.map(rap => {
            // Default to state 1 if not saved
            const stateId = savedProgress[rap.id] || "1";
            return { ...rap, stateId };
        });
    }

    groupRapsByCompetencia() {
        const grouped = {};
        this.raps.forEach(rap => {
            if (!grouped[rap.competencia]) {
                grouped[rap.competencia] = {
                    title: rap.competencia,
                    raps: []
                };
            }
            grouped[rap.competencia].raps.push(rap);
        });
        // Convert to array
        return Object.values(grouped);
    }

    saveProgress() {
        const progress = {};
        this.raps.forEach(rap => {
            progress[rap.id] = rap.stateId;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        this.updateStats();
    }

    changeRapState(rapId, newStateId) {
        const rap = this.raps.find(r => r.id === rapId);
        if (rap) {
            rap.stateId = newStateId;
            this.saveProgress();
            
            // Just update the specific select class without re-rendering everything
            const selectEl = document.getElementById(`select-${rapId}`);
            if (selectEl) {
                selectEl.className = `state-select s-${newStateId}`;
            }
            // Update the progress bar of its group
            this.updateGroupProgress(rap.competencia);
        }
    }

    updateGroupProgress(competenciaTitle) {
        const comp = this.competencias.find(c => c.title === competenciaTitle);
        if (!comp) return;
        
        const total = comp.raps.length;
        const approved = comp.raps.filter(r => r.stateId === "5").length;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);
        
        const fillEl = document.getElementById(`fill-${this.hashString(competenciaTitle)}`);
        const textEl = document.getElementById(`pct-${this.hashString(competenciaTitle)}`);
        const countEl = document.getElementById(`count-${this.hashString(competenciaTitle)}`);
        
        if (fillEl && textEl && countEl) {
            fillEl.style.width = `${percentage}%`;
            fillEl.className = `comp-progress-fill ${percentage > 0 && percentage < 100 ? 'partial' : ''}`;
            
            textEl.innerText = `${percentage}%`;
            textEl.className = `comp-percentage ${percentage === 100 ? 'full' : (percentage > 0 ? 'partial' : '')}`;
            
            countEl.innerText = `${approved}/${total} RAPs aprobados`;
        }
    }

    updateStats() {
        const total = this.raps.length;
        const approved = this.raps.filter(r => r.stateId === "5").length;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);
        
        this.globalProgressText.innerText = `${percentage}% GLOBAL`;
        
        document.getElementById('count-all').innerText = total;
        document.getElementById('count-pending').innerText = total - approved;
        document.getElementById('count-approved').innerText = approved;
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    toggleAccordion(hashId) {
        const groupEl = document.getElementById(`group-${hashId}`);
        if (groupEl) {
            groupEl.classList.toggle('expanded');
            if (groupEl.classList.contains('expanded')) {
                this.expandedGroups.add(hashId);
            } else {
                this.expandedGroups.delete(hashId);
            }
        }
    }

    createRapHTML(rap) {
        const options = Object.values(STATES).map(s => {
            const selected = rap.stateId === s.id ? 'selected' : '';
            return `<option value="${s.id}" ${selected}>${s.icon} ${s.label}</option>`;
        }).join('');

        return `
            <div class="rap-item">
                <div class="rap-info">
                    <h4 class="rap-name">${rap.rap}</h4>
                </div>
                <div class="rap-state-selector">
                    <select id="select-${rap.id}" class="state-select s-${rap.stateId}" onchange="app.changeRapState('${rap.id}', this.value)">
                        ${options}
                    </select>
                </div>
            </div>
        `;
    }

    createCompetenciaHTML(comp) {
        const hashId = this.hashString(comp.title);
        const total = comp.raps.length;
        const approved = comp.raps.filter(r => r.stateId === "5").length;
        const percentage = total === 0 ? 0 : Math.round((approved / total) * 100);
        
        const isExpanded = this.expandedGroups.has(hashId) ? 'expanded' : '';
        const pctClass = percentage === 100 ? 'full' : (percentage > 0 ? 'partial' : '');
        const fillClass = percentage > 0 && percentage < 100 ? 'partial' : '';
        
        const rapsHTML = comp.raps.map(r => this.createRapHTML(r)).join('');

        return `
            <div class="competencia-group ${isExpanded}" id="group-${hashId}">
                <div class="competencia-header" onclick="app.toggleAccordion('${hashId}')">
                    <div class="comp-info">
                        <h3 class="comp-title">${comp.title}</h3>
                        <div class="comp-meta">
                            <span class="tag-tecnica">TÉCNICA</span>
                            <span id="count-${hashId}">🪴 ${approved}/${total} RAPs aprobados</span>
                        </div>
                    </div>
                    <div class="comp-progress-wrapper">
                        <div class="comp-progress-bar">
                            <div id="fill-${hashId}" class="comp-progress-fill ${fillClass}" style="width: ${percentage}%"></div>
                        </div>
                        <div id="pct-${hashId}" class="comp-percentage ${pctClass}">${percentage}%</div>
                        <div class="arrow-icon">▼</div>
                    </div>
                </div>
                <div class="raps-list">
                    ${rapsHTML}
                </div>
            </div>
        `;
    }

    render() {
        this.container.innerHTML = this.competencias.map(comp => this.createCompetenciaHTML(comp)).join('');
    }

    init() {
        this.updateStats();
        this.render();
    }
}

// Start app
const app = new App();
