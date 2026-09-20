const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = app.listen(process.env.PORT || 9000, () => {
    console.log('Server listening on port ' + (process.env.PORT || 9000));
});

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/',
    proxied: true,
    allow_discovery: true
});

// Mount the PeerJS server at /peerjs
app.use('/peerjs', peerServer);

// A simple homepage so we can see it's alive
app.get('/', (req, res) => {
    res.send('PeerJS server is running. Try /peerjs/id');
});

// Log any errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught error:', err);
});
