const axios = require('axios');

const getDailyplanRoutesFromAPI = async (authToken) => {
  const apiUrl = 'https://apex-prod-integration.aws.roadnet.com/integration/v1/dailyplan/routes';
  const queryParams = {
    pageIndex: 1,
    pageSize: 10,
    region: 'exampleRegion',
    sessionDate: '2023-11-12',
    expand: 'All'
  };

  const config = {
    headers: {
      Authorization: `tokenAuth ${authToken}`
    },
    params: queryParams
  };

  try {
    const response = await axios.get(apiUrl, config);
    return response.data; // Return the API response data
  } catch (error) {
    console.error('API request error:', error);
    throw error; // Throw the error for handling in the calling function
  }
};

module.exports = getDailyplanRoutesFromAPI;
