'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const os = require( 'os' );

var networkInterfaces = Object.values(os.networkInterfaces())
    .reduce((r,a) => {
        r = r.concat(a)
        return r;
    }, [])
    .filter(({family, address}) => {
        return family.toLowerCase().indexOf('v4') >= 0 &&
            address !== '127.0.0.1'
    })
    .map(({address}) => address);
var ipAddresses = networkInterfaces.join(', ')
var nodeName = os.hostname();

// App
const app = express();
app.get('/', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello World, my host IPv4 is: ';
  const ver = ' version: 1'
  res.send(msg + ipAddresses + ver);
});

app.listen(PORT, HOST);
console.log(`Running on http://${ipAddresses}:${PORT}`);
console.log(`Node: ${nodeName}`);