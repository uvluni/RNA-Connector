const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

app.post('/upload', upload.single('csvFile'), (req, res) => {
    // Check if file exists in the request
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const results = [];

    // Process uploaded CSV file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Remove uploaded file after processing
            fs.unlinkSync(req.file.path);

            // Handle results (headers and data)
            const headers = Object.keys(results[0]);
            const data = results[0];

            // Process data or create variables as needed
            // For example: Create variables for each header and assign data values
            headers.forEach((header) => {
                const variableName = header.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'); // Adjust variable naming convention
                const variableValue = data[header];
                global[variableName] = variableValue;
            });

            res.send('CSV file uploaded and processed.');
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
