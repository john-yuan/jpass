/**
 * Convert the given string to byte array
 *
 * @param {string} str the string to be converted to byte array
 * @returns {number[]}
 */
var str2bytes = function (str) {
  var i = 0;
  var ch = null;
  var hex = null;
  var encoded = encodeURIComponent(str);
  var length = encoded.length;
  var bytes = [];

  while (i < length) {
      ch = encoded.charAt(i++);
      if (ch === '%') {
          hex = encoded.charAt(i++)
          hex += encoded.charAt(i++);
          bytes.push(parseInt(hex, 16));
      } else {
          bytes.push(ch.charCodeAt(0));
      }
  }

  return bytes;
};

/**
* Convert the given byte array to string
*
* @param {number[]} bytes The byte array to be converted to string
* @returns {string}
*/
var bytes2str = function (bytes) {
  var i = 0;
  var hex = null;
  var byte = 0;
  var hexArray = [];
  var length = bytes.length;

  while (i < length) {
      byte = bytes[i++];
      hex = byte.toString(16);
      hex = hex.length < 2 ? ('%0' + hex) : ('%' + hex);
      hexArray.push(hex);
  }

  return decodeURIComponent(hexArray.join(''));
};
