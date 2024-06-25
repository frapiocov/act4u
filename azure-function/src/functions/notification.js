const { WebPubSubServiceClient } = require('@azure/web-pubsub');

module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        context.log('Document Id: ', documents[0].id);

        const connectionString = process.env.WEB_PUBSUB_CONNECTION_STRING;
        const hubName = 'notification'; // Replace 'your-hub-name' with your actual hub name

        // Ensure the connection string is available
        if (!connectionString) {
            context.log.error('Missing Web PubSub connection string.');
            return;
        }

        try {
            // Create a WebPubSubServiceClient instance
            const serviceClient = new WebPubSubServiceClient(connectionString, hubName);

            // Message to send
            const message = {
                contentType: 'text/plain',
                content: `Document Id: ${documents[0].id}`
            };

            // Send the message
            await serviceClient.sendToAll(message);

            context.log('Message sent to Web PubSub');
        } catch (error) {
            context.log.error('Error sending message to Web PubSub:', error);
        }
    } else {
        context.log.warn('No documents found.');
    }
}
