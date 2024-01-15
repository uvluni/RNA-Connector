function transformAddLocationFormat(csvData) {
    const transformedData = [];

    csvData.forEach((originalObject) => {
        const transformedObject = {
            "identity": {
                "entityKey": 101,
                "identifier": originalObject.Id
            },
            "regionVisibility": {
                "visibleInAllRegions": false,
                "regionIdentities": [
                    {
                        "identifier": originalObject.Region
                    }
                ]
            },
            "locationType": 'Service',
            "standardInstructions": originalObject.Instructions,
            "timeZone": 'Israel',
            "address": {
                "addressLine1": originalObject.Address,
                "city": originalObject.City
            },
            "description": originalObject.Description
        };

        transformedData.push(transformedObject);
    });

    const wrappedTransformedData = {
        "items": transformedData
    };

    return wrappedTransformedData;
}

module.exports = { transformAddLocationFormat };
