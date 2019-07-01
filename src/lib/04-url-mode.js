function urlModeEncrypt(rsaKey, text) {
  var byteCount = (rsaKey.n.bitLength() + 7) >> 3;
  var chunkSize = byteCount - 11;
  var chunk = '';
  var hexStr = '';
  var encrypted = [];

  // Escape the multi-byte characters
  text = encodeURIComponent(text);

  // RFC 3986
  // @see https://tools.ietf.org/html/rfc3986
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  text = text.replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });

  while (text) {
    if (text.length <= chunkSize) {
      chunk = text;
      text = false;
    } else {
      chunk = text.substr(0, chunkSize);
      text = text.substr(chunkSize);
    }

    hexStr = rsaKey.encrypt(chunk);

    if (!hexStr) {
      throw new Error('Failed to encrypt the text');
    } else {
      while ((hexStr.length / 2) < byteCount) {
        hexStr = '00' + hexStr;
      }
    }

    encrypted.push(hexStr);
  }

  return hex2b64(encrypted.join(''));
}

function urlModeDecrypt(rsaKey, text) {
  var byteCount = ((rsaKey.n.bitLength() + 7) >> 3) * 2;
  var hex = b64tohex(text);
  var chunk;
  var str = '';

  while (hex) {
    if (hex.length > byteCount) {
      chunk = hex.slice(0, byteCount);
      hex = hex.slice(byteCount);
    } else {
      chunk = hex;
      hex = false;
    }

    str += rsaKey.decrypt(chunk);
  }

  return decodeURIComponent(str);
}
