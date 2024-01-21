const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const { Parser } = require('json2csv');

const saveRoutesStopsToCsv = (routesData) => {
    const folderPath = path.join(__dirname, '..', 'getRoutesStops');
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `getRoutesStops_${timestamp}.csv`;
    const filePath = path.join(folderPath, fileName);

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    if (routesData && routesData.items && routesData.items.length > 0) {
        const stopsData = [];

        routesData.items.forEach((route) => {
            const { identity, stops } = route;

            if (stops && stops.length > 0) {
                stops.forEach((stop, index) => {
                    const { stopType, serviceableStopInfo } = stop;

                    // Check if serviceableStopInfo is defined
                    if (serviceableStopInfo) {
                        const { locationInfo, distanceTo, travelDurationTo, totalDeliveryQuantities } = serviceableStopInfo;

                        const stopData = {
                            RouteIdentifier: identity.identifier,
                            StopSequence: index, // Start from 1
                            StopType: stopType,
                            StopDescription: locationInfo ? locationInfo.description : '',
                            ArrivalTimestamp: serviceableStopInfo.arrivalTimestamp,
                            DepartureTimestamp: serviceableStopInfo.departureTimestamp,
                            DistanceTo: distanceTo ? distanceTo.value : '',
                            TravelDurationTo: travelDurationTo || '',
                            // Add columns for totalDeliveryQuantities
                            TotalDeliveryQuantity1: totalDeliveryQuantities ? totalDeliveryQuantities[0] || '' : '',
                            TotalDeliveryQuantity2: totalDeliveryQuantities ? totalDeliveryQuantities[1] || '' : '',
                            TotalDeliveryQuantity3: totalDeliveryQuantities ? totalDeliveryQuantities[2] || '' : '',
                        };

                        stopsData.push(stopData);
                    }
                });
            }
        });

        if (stopsData.length > 0) {
            const fields = Object.keys(stopsData[0]);

            // Move StopSequence to be the second column
            const updatedFields = ['RouteIdentifier', 'StopSequence', ...fields.filter(field => field !== 'RouteIdentifier' && field !== 'StopSequence')];

            const json2csvParser = new Parser({ fields: updatedFields, header: true });
            const csvContent = json2csvParser.parse(stopsData);

            // Convert the CSV content to UTF-8 encoding with BOM
            const utf8CsvContent = iconv.encode(csvContent, 'utf-8', { addBOM: true });

            fs.writeFileSync(filePath, utf8CsvContent);

            console.log(`CSV file saved to: ${filePath}`);
        } else {
            console.log('No stops data to save.');
        }
    } else {
        console.log('No routes data to process.');
    }
};

module.exports = { saveRoutesStopsToCsv };
