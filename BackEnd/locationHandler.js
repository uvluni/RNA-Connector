const { authenticate } = require('./authentication');
const axios = require('axios');

let authToken = {
  token: '',
  date: ''
};

const getLocations = async (req, res) => {
  try {
    if (!authToken.token) {
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

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { getLocations };
