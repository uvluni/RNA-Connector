const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const util = require('util');
const transformObject = require('./transformObjectImportLocations');

let authToken = {
  token: '',
  date: ''
};

const authenticate = async () => {
  try {
    const username = 'apieu@rasner.co.il';
    const password = 'MAGnotes2008!';
    const authEndpoint = 'https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/login';

    const credentials = { username, password };
    const response = await axios.post(authEndpoint, credentials);

    authToken = {
      token: response.data.token,
      date: new Date()
    }; // Save the token to the object

    console.log('Token:', authToken.token, '\nToken creation time:', authToken.date); // Log the saved token

  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

const getLocations = async (req, res) => {

  if (!authToken.token) {
    // Authenticate if token is not available
    await authenticate();
  }
  const endPoint = 'https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/admin/locations';
  const config = {
    headers: {
      'Authorization': 'Bearer ' + authToken.token
    }
  };

  const locations = await axios.get(endPoint, config);
  res.status(200).json({ data: locations.data });
  //console.log(JSON.stringify(locations.data, null, 2));

  return;
}

const sendFile = async (req, res) => {
  try {
    if (!authToken.token) {
      // Authenticate if token is not available
      await authenticate();
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        /*
        console.log('****');
        console.log(data);
        console.log('****');
        console.log(util.inspect(transformedObject, { depth: null }));
        */

        // Call the transformObject function
        const transformed = transformObject(data);

        // Display the transformed object
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

module.exports = { sendFile, getLocations };
