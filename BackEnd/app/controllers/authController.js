const axios = require('axios');

const username = 'api@metuka.co.il';
const password = 'MAGnotes2008!';
const authEndpoint = 'https://apex-prod-integration.aws.roadnet.com/integration/v1/login'

const authController = {
  authenticate: async (req, res) => {
    try {
      const credentials = { username, password };

      const response = await axios.post(authEndpoint, credentials);

      const authToken = response.data.token;
      
      res.status(200).json({ authToken });
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
};

module.exports = authController;