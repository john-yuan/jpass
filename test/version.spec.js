var fs = require('fs');
var path = require('path');
var assert = require('assert');
var JPASS_cmd = require('../dist/jpass.cmd');
var JPASS_umd = require('../dist/jpass.umd');

describe('version', function () {
    it('cmd: version is ' + JPASS_cmd.version, function () {
        var addr = path.resolve(__dirname, '../package.json');
        var json = fs.readFileSync(addr).toString();
        var data = JSON.parse(json);

        assert.deepStrictEqual(JPASS_cmd.version, data.version);
    });
});

describe('version', function () {
    it('umd: version is ' + JPASS_umd.version, function () {
        var addr = path.resolve(__dirname, '../package.json');
        var json = fs.readFileSync(addr).toString();
        var data = JSON.parse(json);

        assert.deepStrictEqual(JPASS_umd.version, data.version);
    });
});
