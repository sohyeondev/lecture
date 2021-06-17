const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`serer got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = sercer.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
//prints: server listening 0.0.0.0:41234