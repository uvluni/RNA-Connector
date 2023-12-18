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

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        const transformed = transformObject(data);

        console.log("Transformed: ", util.inspect(transformed, { depth: null }));
        console.log("Original: ", util.inspect(data, { depth: null }));

        Object.keys(data).forEach((header) => {
          console.log(`${header}: ${data[header]}`);
        });
        console.log('-------------');
      })
      .on('end', () => {
        res.status(200).send('File uploaded and processed successfully.');
      });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { sendFile };

