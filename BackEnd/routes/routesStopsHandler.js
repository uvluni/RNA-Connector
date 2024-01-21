const axios = require('axios');
const { authenticate } = require('../authentication');
const { saveStopsRoutesToCsv } = require('./routesStopsToCsv');

const getStopsRoutes = async (req, res) => {
    try {
        const authToken = await authenticate();
        const sessionDate = req.query.sessionDate || '2023-11-21'; // Default to '2023-11-21' if not provided
        const expand = req.query.expand || 'stops'; // Default to 'Stops' if not provided

        const endPoint = `https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/dailyplan/routes?sessionDate=${sessionDate}&expand=${expand}`;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + authToken.token
            }
        };

        const routes = await axios.get(endPoint, config);
        saveStopsRoutesToCsv(routes.data, 'path/to/getRoutes'); // Adjust the folder path as needed
        res.status(200).json({ data: routes.data });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Operation failed' });
    }
};

module.exports = { getStopsRoutes };
