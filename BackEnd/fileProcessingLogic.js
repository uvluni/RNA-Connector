const csv = require('csv-parser');
const fs = require('fs');
const iconv = require('iconv-lite');
const { transformObject } = require('./transformObjectImportLocations');

const processData = (filePath) => {
  return new Promise((resolve, reject) => {
    const processedData = [];
    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream('utf-8'))
      .pipe(csv())
      .on('data', (data) => {
        const transformed = transformObject(data);
        processedData.push(transformed);
      })
      .on('end', () => {
        resolve(processedData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { processData };