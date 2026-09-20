const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = app.listen(process.env.PORT || 9000, () => {
    console.log('Server listening on port ' + (process.env.PORT || 9000));
});

// Mount PeerJS at /peerjs WITHOUT setting a path option
const peerServer = ExpressPeerServer(server, {
    debug: true,
    proxied: true
});

app.use('/peerjs', peerServer);

// Request logger — shows up in Render logs so we can see what's being hit
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path);
    next();
});

// Homepage
app.get('/', (req, res) => {
    res.send('PeerJS server is running. Try /peerjs/id');
});

// Catch-all for /peerjs/* so we get a clear message instead of generic 404
app.use('/peerjs', (req, res) => {
    res.status(404).send('PeerJS route not found: ' + req.path);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught error:', err);
});
