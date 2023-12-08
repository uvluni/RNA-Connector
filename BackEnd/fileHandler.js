const csv = require('csv-parser');
const fs = require('fs');

const sendFile = (req, res) => {
    // Access the uploaded file through req.file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Read the uploaded CSV file and process line by line
    const filePath = req.file.path;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        Object.keys(data).forEach((header) => {
          console.log(`${header}: ${data[header]}`);
        });
        console.log('-------------'); // Separate lines for clarity
      })
      .on('end', () => {
        res.status(200).send('File uploaded and processed successfully.');
      });
  }

  module.exports = { sendFile };