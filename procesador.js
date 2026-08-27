const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// File paths
const cronogramaPath = path.join(__dirname, '..', 'CRONOGRAMA GENERAL.xlsx');
const rapsPath = path.join(__dirname, '..', 'LINDA CORIN ANALISIS Y DESARROLLO DE SOFTWARE-3235642-LINDA CORIN (1) (1).xls');

try {
    console.log("Leyendo CRONOGRAMA GENERAL.xlsx...");
    const cronogramaWorkbook = xlsx.readFile(cronogramaPath);
    const cronogramaSheetName = cronogramaWorkbook.SheetNames[0];
    const cronogramaData = xlsx.utils.sheet_to_json(cronogramaWorkbook.Sheets[cronogramaSheetName], { header: 1 });
    console.log(`Cronograma tiene ${cronogramaData.length} filas.`);
    
    // Check first few rows to understand structure
    console.log("Muestra del cronograma:", cronogramaData.slice(0, 5));

    console.log("\nLeyendo archivo de RAPs...");
    // Force read as HTML if xls fails or just read normal
    let rapsWorkbook;
    try {
        rapsWorkbook = xlsx.readFile(rapsPath);
    } catch(e) {
        console.log("Leyendo como HTML/Tabla antiguo...");
        const htmlData = fs.readFileSync(rapsPath, 'utf8');
        rapsWorkbook = xlsx.read(htmlData, { type: 'string' });
    }
    
    const rapsSheetName = rapsWorkbook.SheetNames[0];
    const rapsData = xlsx.utils.sheet_to_json(rapsWorkbook.Sheets[rapsSheetName], { header: 1 });
    console.log(`RAPs tiene ${rapsData.length} filas.`);
    console.log("Muestra de RAPs:", rapsData.slice(0, 15));

    // For now, just save raw data to a json file to inspect it
    const output = {
        cronograma: cronogramaData.slice(0, 50), // save some rows to inspect
        raps: rapsData.slice(0, 50)
    };
    
    fs.writeFileSync(path.join(__dirname, 'test_output.json'), JSON.stringify(output, null, 2));
    console.log("Datos guardados en test_output.json para inspeccion.");

} catch (error) {
    console.error("Error leyendo archivos:", error);
}
