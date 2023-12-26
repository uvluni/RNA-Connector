const { authenticate } = require('./authentication');
const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const transformObject = require('./transformObjectImportLocations');
const util = require('util');

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
      .pipe(iconv.decodeStream('utf-8'))
      .pipe(csv())
      .on('data', (data) => {
        const transformed = transformObject(data);
        console.log(JSON.stringify(transformed, null, 2));
        processedData.push(transformed);
      })
      .on('end', () => {
        const additionalInfo = {
          totalProcessed: processedData.length,
          timestamp: new Date().toISOString(),
          fileInfo: {
            originalFileName: req.file.originalname,
            fileSize: req.file.size
          }
        };

        res.status(200).json({
          message: 'File uploaded and processed successfully.',
          data: processedData,
          additionalInfo: additionalInfo
        });
      });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { sendFile };
