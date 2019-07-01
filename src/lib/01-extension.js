function ExtNum2b64(num) {
  if (num !== undefined && num !== null) {
    var hex = num.toString(16);

    if (hex.length % 2 !== 0) {
      hex = '0' + hex;
    }

    return hex2b64(hex);
  } else {
    return null;
  }
}

function ExtPkcs1pad2WithBytes(bytes, n) {
  if (n < bytes.length + 11) {
    throw new RangeError("Data must not be longer than " + (n - 11) + " bytes");
  }

  var ba = [];
  var l = n - bytes.length;

  ba[--l] = 0;

  var rng = new SecureRandom();
  var x = [];

  while (l > 2) {
    x[0] = 0;
    while (x[0] === 0) rng.nextBytes(x);
    ba[--l] = x[0];
  }

  ba[--l] = 2;
  ba[--l] = 0;

  ba = ba.concat(bytes);

  return new BigInteger(ba);
}

function ExtPkcs1unpad2WithBytes(d,n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 2)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = [];

  while(++i < b.length) {
    var c = b[i] & 255;
    ret.push(c);
  }
  return ret;
}

function ExtRSAEncryptWithBytes(bytes) {
  var m = ExtPkcs1pad2WithBytes(bytes,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

function ExtDecryptWithBytes(ctext) {
  var c = parseBigInt(ctext, 16);
  var m = this.doPrivate(c);
  if(m == null) return null;
  return ExtPkcs1unpad2WithBytes(m, (this.n.bitLength()+7)>>3);
}

RSAKey.prototype.ExtEncryptWithBytes = ExtRSAEncryptWithBytes;
RSAKey.prototype.ExtDecryptWithBytes = ExtDecryptWithBytes;
