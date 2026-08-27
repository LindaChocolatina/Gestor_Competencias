const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// File paths
const rapsPath = path.join(__dirname, '..', 'LINDA CORIN ANALISIS Y DESARROLLO DE SOFTWARE-3235642-LINDA CORIN (1) (1).xls');

try {
    let rapsWorkbook;
    try {
        rapsWorkbook = xlsx.readFile(rapsPath);
    } catch(e) {
        const htmlData = fs.readFileSync(rapsPath, 'utf8');
        rapsWorkbook = xlsx.read(htmlData, { type: 'string' });
    }
    
    const rapsSheetName = rapsWorkbook.SheetNames[0];
    const rapsData = xlsx.utils.sheet_to_json(rapsWorkbook.Sheets[rapsSheetName], { header: 1 });
    
    const parsedRaps = [];
    let isDataRow = false;
    
    for (let i = 0; i < rapsData.length; i++) {
        const row = rapsData[i];
        if (!row || row.length === 0) continue;
        
        // Find header row to start parsing data
        if (row.includes('Competencia') && row.includes('Resultado de Aprendizaje')) {
            isDataRow = true;
            continue;
        }
        
        if (isDataRow) {
            // Find index of 'Competencia' and 'Resultado de Aprendizaje' and 'Juicio de Evaluación'
            // Usually they are around index 7, 8, 9 based on our previous test
            // Let's iterate backwards or find the non-empty strings that look like Competencia
            
            let competencia = "";
            let rap = "";
            let estado = "";
            
            // Try to extract using the header indexes from test output
            // 7: Competencia
            // 8: RAP
            // 9: Juicio
            
            // Since there might be empty columns due to merged cells, we'll just pick them manually based on position
            competencia = row[7] || "";
            rap = row[8] || "";
            estado = row[9] || "";
            
            // In case the columns shifted, fallback to finding them by length/content
            if (!competencia && !rap) {
               const strings = row.filter(c => typeof c === 'string' && c.length > 5);
               if (strings.length >= 3) {
                   competencia = strings[strings.length - 3];
                   rap = strings[strings.length - 2];
                   estado = strings[strings.length - 1];
               }
            }

            if (competencia && rap) {
                parsedRaps.push({
                    id: rap.split('-')[0].trim() || Math.random().toString(36).substr(2, 9),
                    competencia: competencia.trim(),
                    rap: rap.trim(),
                    estadoInicial: estado.trim()
                });
            }
        }
    }
    
    const jsContent = `// Archivo generado automáticamente\nconst rapsData = ${JSON.stringify(parsedRaps, null, 4)};\n`;
    fs.writeFileSync(path.join(__dirname, 'datos.js'), jsContent, 'utf8');
    console.log(`¡Éxito! Se generó datos.js con ${parsedRaps.length} RAPs.`);

} catch (error) {
    console.error("Error generando datos:", error);
}
