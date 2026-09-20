const { PeerServer } = require('peer');

const port = process.env.PORT || 9000;

const peerServer = PeerServer({
    port: port,
    path: '/peerjs',
    proxied: true,
    allow_discovery: true,
    debug: true
});

console.log('PeerJS server running on port ' + port + ' at path /peerjs');

peerServer.on('connection', (client) => {
    console.log('Client connected: ' + client.getId());
});

peerServer.on('disconnect', (client) => {
    console.log('Client disconnected: ' + client.getId());
});

peerServer.on('error', (err) => {
    console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught:', err);
});
