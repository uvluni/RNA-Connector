const fs = require('fs');
const iconv = require('iconv-lite');
const csv = require('csv-parser');
const { transformAddLocationFormat } = require('../transformObjectImportLocations');
const { authenticate } = require('../authentication');
const { postLocations } = require('../locationPoster');

const addLocationsProcess = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const csvData = [];
    fs.createReadStream(req.file.path)
      .pipe(iconv.decodeStream('utf-8'))
      .pipe(csv())
      .on('data', (data) => {
        csvData.push(data);
      }).on('end', async () => {
        try {
          const { token } = await authenticate();
          const locations = transformAddLocationFormat(csvData);

          console.dir(locations, { depth: null });

          await postLocations(locations, token);

          res.status(200).json({ locations });
        } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json({ error: 'Operation failed' });
        }
      });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { addLocationsProcess };
