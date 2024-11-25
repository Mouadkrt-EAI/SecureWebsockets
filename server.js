const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Load SSL certificate and key
const serverOptions = {
    key: fs.readFileSync('privatekey.pem', 'utf8'),
    cert: fs.readFileSync('certificate.pem', 'utf8')
};

// Create an HTTPS server
const httpsServer = https.createServer(serverOptions);

// Create a WebSocket server attached to the HTTPS server
const wss = new WebSocket.Server({ server: httpsServer });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`); // Echo the message back to the client
    });

    // Send a welcome message to the client
    ws.send('Welcome to the secure WebSocket server!');
});

// Start the HTTPS server on port 8443
httpsServer.listen(8443, () => {
    console.log('Secure WebSocket server is running on wss://localhost:8443');
});