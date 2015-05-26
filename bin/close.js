#!/usr/bin/env node

var fs = require('fs');
var sjcl = require('sjcl');

function isShell(name) {
    return /.sh$/.test(name);
}

var password = process.env.OAGR_CONFIG_PASSWORD;
if (typeof password === 'undefined') {
    console.log("Required environment variable: OAGR_CONFIG_PASSWORD");
    process.exit(1);
}

var source = 'working';
var destination = 'config';

fs.readdirSync(source).filter(isShell).forEach(function (name) {
    console.log(name);

    var data = fs.readFileSync(source + '/' + name).toString();
    var outputFile = destination + '/' + name.split(".")[0] + ".json";

    fs.writeFileSync(outputFile, sjcl.encrypt(password, data));

    fs.unlinkSync(source + '/' + name);
});
