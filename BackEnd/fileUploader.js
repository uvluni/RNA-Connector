const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const util = require('util');

const transformObject = require('./transformObjectImportLocations');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const processedData = [];

    const readFile = fs.createReadStream(req.file.path);
    const csvData = readFile.pipe(iconv.decodeStream('utf-8')).pipe(csv());

    csvData.on('data', (data) => {
        const transformed = transformObject(data);
        console.log(JSON.stringify(transformed, null, 2));
        // processedData.push(transformed);
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

module.exports = { uploadFile };
