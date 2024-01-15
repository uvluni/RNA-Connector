const axios = require('axios');

const { authenticate } = require('./authentication');

const getLocations = async (req, res) => {
  const authToken = await authenticate();

  const endPoint = 'https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/admin/locations';
  const config = {
    headers: {
      'Authorization': 'Bearer ' + authToken.token
    }
  };

  const locations = await axios.get(endPoint, config);
  res.status(200).json({ data: locations.data });
};

module.exports = { getLocations };