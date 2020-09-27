/**
 * @class
 */
function JPass() {
  this.key = null;
}

/**
 * Generate a new RSAKey. Call this method will reset the key.
 *
 * @param {number} size The key size.
 * @param {number} [exponent=65537] (Optional) The public exponent. Default is `65537`.
 */
JPass.prototype.generate = function (size, exponent) {
  var key = new RSAKey();

  size = parseInt(size, 10);

  if (isNaN(size) || size <= 0) {
    throw new Error('size must be a number and must be greater than zero.');
  }

  if (exponent === null || exponent === undefined) {
    exponent = 65537;
  }

  exponent = parseInt(exponent, 10);

  if (isNaN(exponent) || exponent <= 0) {
    throw new Error('exponent must be a number and must be greater than zero.');
  }

  key.generate(size, exponent.toString(16));

  this.key = key;
};

/**
 * Serialize the current RSAKey.
 *
 * @returns {JPassSerializeObject} Returns an object containing the key details.
 */
JPass.prototype.serialize = function () {
  var key = this.key || {};
  var object = {};

  object.n = ExtNum2b64(key.n); // modulus
  object.e = ExtNum2b64(key.e); // public exponent
  object.d = ExtNum2b64(key.d); // private exponent
  // object.p = ExtNum2b64(key.p);
  // object.q = ExtNum2b64(key.q);
  // object.dmp1 = ExtNum2b64(key.dmp1);
  // object.dmq1 = ExtNum2b64(key.dmq1);
  // object.coeff = ExtNum2b64(key.coeff);

  return object;
};

/**
 * Parse the object to a RSAKey. Call this method will reset the key.
 *
 * @param {JPassSerializeObject} object An object containing the key details.
 */
JPass.prototype.parse = function (object) {
  var key = new RSAKey();

  key.n = object.n ? parseBigInt(b64tohex(object.n), 16) : null;
  key.e = object.e ? parseInt(b64tohex(object.e), 16) : 0;
  key.d = object.d ? parseBigInt(b64tohex(object.d), 16) : null;
  // key.p = object.p ? parseBigInt(b64tohex(object.p), 16) : null;
  // key.q = object.q ? parseBigInt(b64tohex(object.q), 16) : null;
  // key.dmp1 = object.dmp1 ? parseBigInt(b64tohex(object.dmp1), 16) : null;
  // key.dmq1 = object.dmq1 ? parseBigInt(b64tohex(object.dmq1), 16) : null;
  // key.coeff = object.coeff ? parseBigInt(b64tohex(object.coeff), 16) : null;

  this.key = key;
};

/**
 * Get the public information fo the RSAKey.
 *
 * @returns {JPassPublicObject} Returns an object containing the RSA public information.
 */
JPass.prototype.getPublic = function () {
  var object = this.serialize();

  return {
    modulus: object.n,
    exponent: object.e
  };
};

/**
 * Create a new with the given modulus and public exponent. Call this method will reset the key.
 *
 * @param {string} modulus The base64 encoded RSA modulus.
 * @param {string} exponent The base64 encoded RSA public exponent.
 */
JPass.prototype.setPublic = function (modulus, exponent) {
  this.parse({
    n: modulus,
    e: exponent
  });
};

/**
 * Returns the public information when the RSA instance is passed to `JSON.stringify`.
 *
 * @returns {JPassPublicObject} Returns an object containing the RSA public information.
 */
JPass.prototype.toJSON = function () {
  return this.getPublic();
};

/**
 * Use the RSA public information to encrypt the given text. The text can be encrypted in `URL_MODE` or `BYTE_MODE`. If
 * the text is too long, it will be encrypted in chunks.
 *
 * 1. When using `URL_MODE`, the text will be url encoded before being encrypted. So the decrypted data is a string
 * which is url encoded. To get the original text, you must url decode the decrypted data (url encoded string).
 * 2. When using `BYTE_MODE`, the text will be converted to a byte array before being encrypted. So the decrypted data
 * is a byte array. To get the original text, you must convert the decrypted data (byte array) to a string.
 *
 * **You should choose the mode that the back-end knows how to decrypt!**
 *
 * @param {string} mode The mode to encrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
 * @param {string} text The text to be encrypted.
 * @throws {Error} Throws error on failed to encrypt the text.
 * @returns {string} Returns the encrypted data, which is base64 encoded.
 */
JPass.prototype.encrypt = function (mode, text) {
  var str = text;
  var key = this.key;

  if (!key) {
    throw new Error('key is not set.');
  }

  // make sure that str is a string
  if (typeof str !== 'string') {
    if (str === null || str === undefined) {
      str = '';
    } else {
      str = str + '';
    }
  }

  if (mode === 'URL_MODE') {
    return urlModeEncrypt(key, str);
  } else if (mode === 'BYTE_MODE') {
    return byteModeEncrypt(key, str);
  } else {
    throw new Error('Unsupported mode: ' + mode + '. The supported mode is URL_MODE or BYTE_MODE.');
  }
};

/**
 * Decrypt the encrypted text. If the text is encrypted in chunks, it will be decrypted in chunks.
 *
 * @param {string} mode The mode to decrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
 * @param {string} text The encrypted data to be decrypted.
 * @throws {Error} Throws error on failed to decrypt the text.
 * @returns {string} Returns the decrypted text.
 */
JPass.prototype.decrypt = function (mode, text) {
  var str = text;
  var key = this.key;

  if (!key) {
    throw new Error('key is not set.');
  }

  // make sure that str is a string
  if (typeof str !== 'string') {
    if (str === null || str === undefined) {
      str = '';
    } else {
      str = str + '';
    }
  }

  if (mode === 'URL_MODE') {
    return urlModeDecrypt(key, str);
  } else if (mode === 'BYTE_MODE') {
    return byteModeDecrypt(key, str);
  } else {
    throw new Error('Unsupported mode: ' + mode + '. The supported mode is URL_MODE or BYTE_MODE.');
  }
};

/**
 * @typedef {Object.<string, string>} JPassPublicObject
 * @property {string} modulus The base64 encoded RSA modulus.
 * @property {string} exponent The base64 encoded RSA public exponent.
 */

/**
 * @typedef {Object.<string, string>} JPassSerializeObject
 * @property {string} n
 * @property {string} e
 * @property {string} d
 */
