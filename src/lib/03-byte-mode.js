function byteModeEncrypt(rsaKey, text) {
  var bytes = str2bytes(text);
  var byteCount = (rsaKey.n.bitLength() + 7) >> 3;
  var unitSize = byteCount - 11;
  var unitBytes;
  var hexArray = [];
  var hexStr;

  while (bytes.length) {
    if (bytes.length <= unitSize) {
      unitBytes = bytes;
      bytes = [];
    } else {
      unitBytes = bytes.splice(0, unitSize);
    }

    hexStr = rsaKey.ExtEncryptWithBytes(unitBytes);

    if (!hexStr) {
      throw new Error('Failed to encrypt the text');
    } else {
      while ((hexStr.length / 2) < byteCount) {
        hexStr = '00' + hexStr;
      }
    }

    hexArray.push(hexStr);
  }

  return hex2b64(hexArray.join(''));
}

function byteModeDecrypt(rsaKey, text) {
  var byteCount = ((rsaKey.n.bitLength() + 7) >> 3) * 2;
  var hex = b64tohex(text);
  var chunk;
  var bytes = []

  while (hex) {
    if (hex.length > byteCount) {
      chunk = hex.slice(0, byteCount);
      hex = hex.slice(byteCount);
    } else {
      chunk = hex;
      hex = false;
    }

    bytes = bytes.concat(rsaKey.ExtDecryptWithBytes(chunk));
  }

  return bytes2str(bytes);
}