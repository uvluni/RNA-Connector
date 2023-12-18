const axios = require('axios');

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
    };

  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

module.exports = { authenticate };
