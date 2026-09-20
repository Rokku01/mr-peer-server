const { PeerServer } = require('peer');

const peerServer = PeerServer({
    port: process.env.PORT || 9000,
    path: '/peerjs',
    proxied: true
});

console.log('PeerJS on /peerjs');
