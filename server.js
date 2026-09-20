const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'PeerJS signaling server is running',
        testUrl: '/peerjs/id'
    });
});

const server = app.listen(process.env.PORT || 9000, () => {
    console.log('Server listening on port ' + (process.env.PORT || 9000));
});

const peerServer = ExpressPeerServer(server, {
    path: '/',
    proxied: true,
    allow_discovery: true
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
    console.log('Peer connected: ' + client.getId());
});

peerServer.on('disconnect', (client) => {
    console.log('Peer disconnected: ' + client.getId());
});

console.log('PeerJS mounted at /peerjs');
