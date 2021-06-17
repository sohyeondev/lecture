const dgram = require('dgram');
const buf1 = Buffer.form('I am Alice');
const buf2 = Buffer.from(' Or Bob');
const client = dgram.createSocket('udp4');
client.sen([buf1, buf2], 41234, '172.19.217.202', (err) => {
    if(err){
        console.log(err)
    }
    client.close();
})