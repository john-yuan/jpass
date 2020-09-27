var jpass = require('../index');
var JPass = jpass.JPass;
var assert = require('assert');

function test(mode, text) {
    var j = new JPass();

    j.generate(512);

    var object = j.serialize();
    var details = j.getPublic();

    j = null;

    var j1 = new JPass();
    var j2 = new JPass();

    j1.setPublic(details.modulus, details.exponent);
    j2.parse(object);

    var encrypted = j1.encrypt(mode, text);
    var decrypted = j2.decrypt(mode, encrypted);

    return decrypted;
}

describe('ts: encrypt and decrypt', function () {
    it('URL_MODE ascii', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456!';
            var decrypted = test('URL_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('URL_MODE emoji', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456! 😈';
            var decrypted = test('URL_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('URL_MODE multi-byte string', function () {
        var i = 50;
        while (i--) {
            var text = '测试，jpass！😈';
            var decrypted = test('URL_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('URL_MODE mixed', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456!😈 测试，jpass！👌';
            var decrypted = test('URL_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('URL_MODE mixed long', function () {
        this.timeout(60000);

        var i = 50;
        while (i--) {
            var text = '';

            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';

            var decrypted = test('URL_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('BYTE_MODE ascii', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456!';
            var decrypted = test('BYTE_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('BYTE_MODE emoji', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456! 😈';
            var decrypted = test('BYTE_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('BYTE_MODE multi-byte string', function () {
        var i = 50;
        while (i--) {
            var text = '测试，jpass！😈';
            var decrypted = test('BYTE_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('BYTE_MODE mixed', function () {
        var i = 50;
        while (i--) {
            var text = 'Hello, 123456!😈 测试，jpass！👌';
            var decrypted = test('BYTE_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });

    it('BYTE_MODE mixed long', function () {
        this.timeout(60000);

        var i = 50;
        while (i--) {
            var text = '';

            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';
            text += 'Hello, 123456!😈 测试，jpass！👌';

            var decrypted = test('BYTE_MODE', text);
            assert.deepStrictEqual(text, decrypted);
        }
    });
});
