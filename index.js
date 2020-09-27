"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JPass = exports.BYTE_MODE = exports.URL_MODE = void 0;
// @ts-ignore
var jpass_cmd_1 = __importDefault(require("./dist/jpass.cmd"));
exports.URL_MODE = 'URL_MODE';
exports.BYTE_MODE = 'BYTE_MODE';
var JPass = /** @class */ (function () {
    function JPass() {
        this.instance = new jpass_cmd_1.default.JPass();
        // @ts-ignore
        this.key = this.instance.key;
    }
    /**
     * Generate a new RSAKey. Call this method will reset the key.
     *
     * @param size The key size.
     * @param exponent The public exponent. Default is `65537`.
     */
    JPass.prototype.generate = function (size, exponent) {
        if (exponent === void 0) { exponent = 65537; }
        // @ts-ignore
        this.instance.generate(size, exponent);
        // @ts-ignore
        this.key = this.instance.key;
    };
    /**
     * Serialize the current RSAKey.
     */
    JPass.prototype.serialize = function () {
        // @ts-ignore
        return this.instance.serialize();
    };
    /**
     * Parse the object to a RSAKey. Call this method will reset the key.
     *
     * @param object An object containing the key details.
     */
    JPass.prototype.parse = function (object) {
        // @ts-ignore
        this.instance.parse(object);
        // @ts-ignore
        this.key = this.instance.key;
    };
    /**
     * Get the public information fo the RSAKey.
     */
    JPass.prototype.getPublic = function () {
        // @ts-ignore
        return this.instance.getPublic();
    };
    /**
     * Create a new with the given modulus and public exponent.
     * Call this method will reset the key.
     *
     * @param modulus The base64 encoded RSA modulus.
     * @param exponent The base64 encoded RSA public exponent.
     */
    JPass.prototype.setPublic = function (modulus, exponent) {
        // @ts-ignore
        this.instance.setPublic(modulus, exponent);
        // @ts-ignore
        this.key = this.instance.key;
    };
    /**
     * Returns the public information when the RSA instance is passed
     * to `JSON.stringify`
     */
    JPass.prototype.toJSON = function () {
        return this.getPublic();
    };
    /**
     * Use the RSA public information to encrypt the given text. The text can be
     * encrypted in `URL_MODE` or `BYTE_MODE`. If the text is too long, it will
     * be encrypted in chunks.
     *
     * 1. When using `URL_MODE`, the text will be url encoded before being
     * encrypted. So the decrypted data is a string which is url encoded.
     * To get the original text, you must url decode the decrypted data
     * (url encoded string).
     *
     * 2. When using `BYTE_MODE`, the text will be converted to a byte array
     * before being encrypted. So the decrypted data is a byte array. To get
     * the original text, you must convert the decrypted data (byte array)
     * to a string.
     *
     * @param mode The mode to encrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
     * @param text The text to be encrypted.
     * @throws Throws error on failed to encrypt the text.
     */
    JPass.prototype.encrypt = function (mode, text) {
        // @ts-ignore
        return this.instance.encrypt(mode, text);
    };
    /**
     * Decrypt the encrypted text. If the text is encrypted in chunks, it will be
     * decrypted in chunks.
     *
     * @param mode The mode to decrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
     * @param text The encrypted data to be decrypted.
     */
    JPass.prototype.decrypt = function (mode, text) {
        // @ts-ignore
        return this.instance.decrypt(mode, text);
    };
    return JPass;
}());
exports.JPass = JPass;
