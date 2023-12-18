function transformObject(originalObject) {
    const transformedObject = {
        items: [
            {
                identity: {
                    entityKey: 101,
                    identifier: originalObject.Identifier // Use identifier from original object
                },
                regionVisibility: {
                    visibleInAllRegions: false,
                    regionIdentities: [
                        {
                            identifier: originalObject.Region // Use Region from original object
                        }
                    ]
                },
                locationType: 'Service',
                standardInstructions: originalObject.Instructions, // Use Standard Instructions from original object
                timeZone: 'Israel',
                address: {
                    addressLine1: originalObject.Address, // Use Address Line from original object
                    city: originalObject.City // Use City from original object
                },
                description: originalObject.Description // Use Description from original object
            }
        ]
    };

    return transformedObject;
}

module.exports = transformObject;
