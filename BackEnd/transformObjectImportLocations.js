function transformAddLocationFormat(csvData) {
    const transformedData = [];

    csvData.forEach((originalObject) => {
        const transformedObject = {
            identity: {
                entityKey: 101,
                identifier: originalObject.Id
            },
            regionVisibility: {
                visibleInAllRegions: false,
                regionIdentities: [
                    {
                        identifier: originalObject.Region
                    }
                ]
            },
            locationType: 'Service',
            standardInstructions: originalObject.Instructions,
            timeZone: 'Israel',
            address: {
                addressLine1: originalObject.Address,
                city: originalObject.City
            },
            description: originalObject.Description
        };

        transformedData.push(transformedObject);
    });
    let wrapedTransformedData = {
        items: transformedData
    }
    return wrapedTransformedData;
}

module.exports = { transformAddLocationFormat };
