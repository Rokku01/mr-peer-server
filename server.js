const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

// Root route — just a health check
app.get('/', (req, res) => {
    res.send('PeerJS signaling server is running. Test: /peerjs/id');
});

// Start the HTTP server
const server = app.listen(process.env.PORT || 9000, () => {
    console.log('Server listening on port', process.env.PORT || 9000);
});

// Attach PeerJS to the HTTP server
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/'
});

// Mount PeerJS at /peerjs
app.use('/peerjs', peerServer);
