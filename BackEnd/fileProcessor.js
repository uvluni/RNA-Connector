const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const util = require('util');
const transformObject = require('./transformObjectImportLocations');
const { authenticate } = require('./authentication');

let authToken = {
  token: '',
  date: ''
};

const sendFile = async (req, res) => {
  try {
    if (!authToken.token) {
      await authenticate();
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const processedData = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        const transformed = transformObject(data);
        processedData.push(transformed); // Collect transformed data
      })
      .on('end', () => {
        // Additional information to send along with success response
        const additionalInfo = {
          totalProcessed: processedData.length, // Total processed records
          timestamp: new Date().toISOString(), // Current timestamp
          fileInfo: {
            originalFileName: req.file.originalname, // Original file name
            fileSize: req.file.size // File size
          }
        };

        // Send data to API
        res.status(200).json({
          message: 'File uploaded and processed successfully.',
          data: processedData, // Send processed data
          additionalInfo: additionalInfo // Send additional information
        });
      });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { sendFile };
