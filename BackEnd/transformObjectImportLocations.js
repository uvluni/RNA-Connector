function transformObject(originalObject) {
    const transformedObject = {
        items: [
            {
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
            }
        ]
    };

    return transformedObject;
}

module.exports = transformObject;