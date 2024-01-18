const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const { Parser } = require('json2csv');

const saveRoutesToCsv = (routesData) => {
    const folderPath = path.join(__dirname, '..', 'getRoutes');
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `getRoutes_${timestamp}.csv`;
    const filePath = path.join(folderPath, fileName);

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    if (routesData && routesData.items && routesData.items.length > 0) {
        const fields = Object.keys(routesData.items[0]);

        const json2csvParser = new Parser({ fields, header: true });
        const csvContent = json2csvParser.parse(routesData.items);

        // Convert the CSV content to UTF-8 encoding with BOM
        const utf8CsvContent = iconv.encode(csvContent, 'utf-8', { addBOM: true });

        fs.writeFileSync(filePath, utf8CsvContent);

        console.log(`CSV file saved to: ${filePath}`);
    } else {
        console.log('No routes data to save.');
    }
};

module.exports = { saveRoutesToCsv };
