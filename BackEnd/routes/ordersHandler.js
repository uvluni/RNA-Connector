const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { authenticate } = require('../authentication');
const { Parser } = require('json2csv');
const iconv = require('iconv-lite');
const { getRoutes } = require('../routes/routesHandler');

const writeToCsv = (data) => {
    const folderPath = path.join(__dirname, '..', 'getOrders');

    const fields = [
        'beginDate',
        'identity.identifier',
        'totalDeliveryQuantities.0',
        'totalDeliveryQuantities.1',
        'totalDeliveryQuantities.2',
    ];

    const json2csvParser = new Parser({ fields, header: true });
    const csvContent = json2csvParser.parse(data);
    const utf8CsvContent = iconv.encode(csvContent, 'utf-8', { addBOM: true });
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `getOrders_${timestamp}.csv`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, utf8CsvContent);
    console.log(`CSV file saved to: ${filePath}`);
};

const getOrders = async (req, res) => {
    try {
        const authToken = await authenticate();
        const sessionDate = req.query.sessionDate || '2023-11-21'; // Default to '2023-11-21' if not provided

        const ordersEndPoint = `https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/dailyplan/orders?sessionDate=${sessionDate}`;
        const routesEndPoint = `https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/dailyplan/routes?sessionDate=${sessionDate}`;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + authToken.token
            }
        };

        const ordersResponse = await axios.get(ordersEndPoint, config);
        const orders = ordersResponse.data;

        //res.status(200).json({ data: orders });

        const routesResponse = await axios.get(routesEndPoint, config);
        const routes = routesResponse.data;
        
        res.status(200).json({ ordersData: orders, routesData: routes });

        writeToCsv(orders);
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Operation failed' });
    }
};

module.exports = { getOrders };
