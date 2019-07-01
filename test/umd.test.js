var jpass = require('../dist/jpass.umd');
var RSA = jpass.RSA;
var assert = require('assert');

function test(mode, text) {
    var rsa = new RSA();

    rsa.generate(512);

    var object = rsa.serialize();
    var details = rsa.getPublic();

    rsa = null;

    var rsa1 = new RSA();
    var rsa2 = new RSA();

    rsa1.setPublic(details.modulus, details.exponent);
    rsa2.parse(object);

    var encrypted = rsa1.encrypt(mode, text);
    var decrypted = rsa2.decrypt(mode, encrypted);

    return decrypted;
}

describe('umd: encrypt and decrypt', function () {
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
