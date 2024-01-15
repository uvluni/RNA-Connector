const axios = require('axios');

const postLocations = async (locations, authToken) => {
  try {
    const apiEndpoint = 'https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/admin/locations';

    const config = {
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    };

    const response = await axios.post(apiEndpoint, locations, config);
    console.log('Locations posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting locations:', error.message);
    throw new Error('Location posting failed');
  }
};

module.exports = { postLocations };
