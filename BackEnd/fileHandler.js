const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const util = require('util');


let authToken = null; // Variable to store the token

const authenticate = async () => {
  try {
    const username = 'apieu@rasner.co.il';
    const password = 'MAGnotes2008!';
    const authEndpoint = 'https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/login';

    const credentials = { username, password };
    const response = await axios.post(authEndpoint, credentials);

    authToken = response.data.token; // Save the token to the variable

    console.log('Token:', authToken); // Log the saved token
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

const sendFile = async (req, res) => {
  try {
    if (!authToken) {
      // Authenticate if token is not available
      await authenticate();
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        console.log('****');
        console.log(data);
        console.log('****');


        const transformedObject = {
          items: [
            {
              identity: {
                entityKey: 1031,
                identifier: data.identifier
              },
              regionVisibility: {
                visibleInAllRegions: false,
                regionIdentities: [
                  {
                    identifier: data.Region
                  }
                ]
              },
              locationType: 'Service',
              standardInstructions: data['Standard Instructions'],
              timeZone: 'Israel',
              address: {
                addressLine1: data['Address Line'],
                city: data.City
              },
              description: data.Description
            }
          ]
        };
        
        
        console.log(util.inspect(transformedObject, { depth: null }));


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
