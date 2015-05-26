var fs = require('fs');
var sjcl = require('sjcl');

var password = process.env.OAGR_CONFIG_PASSWORD;
if (typeof password === 'undefined') {
    console.log("Required environment variable: OAGR_CONFIG_PASSWORD");
    process.exit(1);
}

module.exports = {
    process: function (encrypt, sourceDir, sourceExt, destDir, destExt) {
        var re = new RegExp("\\." + sourceExt + "$");
        var fileFilter = function (name) { return re.test(name); };

        fs.readdirSync(sourceDir).filter(fileFilter).forEach(function (name) {
            console.log(name);

            var data = fs.readFileSync(sourceDir + '/' + name).toString();
            var outputFile = destDir + '/' + name.split(".")[0] + "." + destExt;

            fs.writeFileSync(outputFile, (encrypt ? sjcl.encrypt : sjcl.decrypt)(password, data));

            if (encrypt) { fs.unlinkSync(sourceDir + '/' + name); }
        });
    }
};
