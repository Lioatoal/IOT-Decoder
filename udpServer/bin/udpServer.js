const dgram = require('dgram');
const fs = require('fs');
const libDecoder = require('../lib/libDecoder');
const libRadis = require('../model/dbRadis');

const config = JSON.parse(fs.readFileSync("./config.json"));

const PORT = config.port;
const HOST = config.host;

var server = dgram.createSocket('udp4');

server.on('listening', function () {
    let address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message',async function (message, remote) {
    const pag = message;
    let data = "";
    if(!libDecoder.crcCheck(pag)){
        await libDecoder.decode(pag, (results)=>{
            if (Object.keys(results).length === 0) {
                console.log("Error : No package can be decoded!" + " - " + new Date().toISOString());
                return;
            }
            data = JSON.stringify(results);
            console.log(data);
            libRadis.client.sadd('api', data);
        });
    }

    // libRadis.client.SMEMBERS('api', (err, res) =>{
    //     if(err){
    //         console.log("Error: " + err + " - " + new Date().toISOString());
    //         return;
    //     }
    //     console.log(res);
    //     for (const i in res) {
    //         console.log(JSON.parse(res[i]));
    //     }
    // });

    console.log(remote.address + ':' + remote.port);
});

server.bind(PORT, HOST);