# JPASS

[![npm version](https://img.shields.io/npm/v/jpass.svg)](https://www.npmjs.com/package/jpass)
[![Build Status](https://travis-ci.org/john-yuan/jpass.svg?branch=master)](https://travis-ci.org/john-yuan/jpass)
[![install size](https://packagephobia.now.sh/badge?p=jpass)](https://packagephobia.now.sh/result?p=jpass)
[![npm downloads](https://img.shields.io/npm/dm/jpass.svg)](http://npm-stat.com/charts.html?package=jpass)

一个适用于浏览器端和 Node.js 的 RSA 库，主要基于 Tom Wu 的 [RSA and ECC in JavaScript][jsbn] 代码进行封装。支持的功能有：

* 生成 RSA key；
* 支持长文本分组加密及解密；
* 支持多字节文本加密及解密（中文、emoji 表情等）；

[jsbn]: http://www-cs-students.stanford.edu/~tjw/jsbn/ "RSA and ECC in JavaScript"

## 示例

```js
var JPass = require('jpass').JPass;

// 1. 加密与解密：

var jpass = new JPass();

// 生成秘钥，长度为 1024（长度越长越安全，但是耗时也越长）
jpass.generate(1024);

// 需要加密的文本
var text = 'Secret is 秘密 ㊙️';

// 使用 `BYTE_MODE` 进行加密（加密后的数据是经过 base64 编码的）
var encrypted1 = jpass.encrypt('BYTE_MODE', text);
// 使用 `URL_MODE` 进行加密（加密后的数据是经过 base64 编码的）
var encrypted2 = jpass.encrypt('URL_MODE', text);

// 解密
var decrypted1 = jpass.decrypt('BYTE_MODE', encrypted1);
var decrypted2 = jpass.decrypt('URL_MODE', encrypted2);

console.log(decrypted1 === text); // true
console.log(decrypted2 === text); // true

// 2. 序列化与反序列化

// 序列化：返回一个 Object，可转换为 JSON 字符串进行保存
var object = jpass.serialize();

// 反序列化
var jpass2 = new JPass();
jpass2.parse(object);

// 使用反序列化后的 JPass 进行解密
var decrypted3 = jpass2.decrypt('BYTE_MODE', encrypted1);
var decrypted4 = jpass2.decrypt('URL_MODE', encrypted2);

console.log(decrypted3 === text); // true
console.log(decrypted4 === text); // true

// 3. 获取公钥信息和使用公钥信息加密

// 获取公钥信息
var details = jpass2.getPublic();
var modulus = details.modulus; // base64 编码的 modulus
var exponent = details.exponent; // base64 编码的 private exponent

var jpass3 = new JPass();

// 设置公钥信息
jpass3.setPublic(modulus, exponent);

// 加密
var encrypted3 = jpass3.encrypt('BYTE_MODE', text);
var encrypted4 = jpass3.encrypt('URL_MODE', text);

// 解密公钥加密的数据
var decrypted5 = jpass2.decrypt('BYTE_MODE', encrypted3);
var decrypted6 = jpass2.decrypt('URL_MODE', encrypted4);

console.log(decrypted5 === text); // true
console.log(decrypted6 === text); // true
```

## `BYTE_MODE` 和 `URL_MODE`

由于原始库是不支持多字节字符加密的，为了解决这个问题，我们在进行加密前对原始数据进行了转义处理。`BYTE_MODE` 和 `URL_MODE` 是我们提供的两种处理模式。

* `BYTE_MODE`：在加密前将原始字符串转换为字节数组，然后对字节数组进行加密。后端解密后得到的数据为字节数组（如在 Java 语言中），需要将该字节数组转换为字符串才能得到原始字符串。
* `URL_MODE`：在加密前对原始字符串进行 URL 编码，然后对编码后的字符串进行加密。后端解密后得到的数据为 URL 编码后的原始字符串（如在 PHP 语言中），需要将该字符串进行 URL 解码后才能得到原始字符串。

如果后端支持字节数组操作，应该尽量选择 `BYTE_MODE`，该模式加密后的数据体积要更小。另外，由于前端进行了分组加密处理，后端在解密时需实现分组解密。如果后端使用 Node.js，也可以使用本模块来进行解密，本模块既支持 `BYTE_MODE` 解密，也支持 `URL_MODE` 解密，且两种模式都支持分组解密。

## License

* [MIT](LICENSE "License")
* [http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE](http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE)
