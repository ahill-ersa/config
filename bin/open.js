#!/usr/bin/env node

var fs = require('fs');
var sjcl = require('sjcl');

function isJSON(name) {
    return /.json$/.test(name);
}

var password = process.env.OAGR_CONFIG_PASSWORD;
if (typeof password === 'undefined') {
    console.log("Required environment variable: OAGR_CONFIG_PASSWORD");
    process.exit(1);
}

var source = 'config';
var destination = 'working';

fs.readdirSync(source).filter(isJSON).forEach(function (name) {
    console.log(name);

    var data = fs.readFileSync(source + '/' + name).toString();
    var outputFile = destination + '/' + name.split(".")[0] + ".sh";

    fs.writeFileSync(outputFile, sjcl.decrypt(password, data));

    fs.unlinkSync(source + '/' + name);
});
