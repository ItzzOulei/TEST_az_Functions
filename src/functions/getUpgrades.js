const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'duckyqlick',
    containerName: 'items',
    connection: 'CosmosDB',
    sqlQuery: "select * from items"
});

app.http('getUpgrades', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'upgrades',
    handler: async (request, context) => {
        const items = context.extraInputs.get(cosmosInput);
        return {
            body: JSON.stringify(items),
            status: 200
        };
    }
});