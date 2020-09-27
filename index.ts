// @ts-ignore
import jpass from './dist/jpass.cmd';

interface JPassSerializeObject {
  n: string;
  e: string;
  d: string;
}

interface JPassPublicObject {
  // The base64 encoded RSA modulus.
  modulus: string;
  // The base64 encoded RSA public exponent.
  exponent: string;
}

type Mode = 'URL_MODE' | 'BYTE_MODE';

export const URL_MODE: Mode = 'URL_MODE';
export const BYTE_MODE: Mode = 'BYTE_MODE';

export class JPass {
  private instance: Object;
  public key: Object;

  constructor() {
    this.instance = new jpass.JPass();
    // @ts-ignore
    this.key = this.instance.key;
  }

  /**
   * Generate a new RSAKey. Call this method will reset the key.
   *
   * @param size The key size.
   * @param exponent The public exponent. Default is `65537`.
   */
  generate(size: number, exponent:number = 65537) {
    // @ts-ignore
    this.instance.generate(size, exponent);
    // @ts-ignore
    this.key = this.instance.key;
  }

  /**
   * Serialize the current RSAKey.
   */
  serialize() {
    // @ts-ignore
    return this.instance.serialize() as JPassSerializeObject;
  }

  /**
   * Parse the object to a RSAKey. Call this method will reset the key.
   *
   * @param object An object containing the key details.
   */
  parse(object: JPassSerializeObject) {
    // @ts-ignore
    this.instance.parse(object);
    // @ts-ignore
    this.key = this.instance.key;
  }

  /**
   * Get the public information fo the RSAKey.
   */
  getPublic() {
    // @ts-ignore
    return this.instance.getPublic() as JPassPublicObject;
  }

  /**
   * Create a new with the given modulus and public exponent.
   * Call this method will reset the key.
   *
   * @param modulus The base64 encoded RSA modulus.
   * @param exponent The base64 encoded RSA public exponent.
   */
  setPublic(modulus: string, exponent: string) {
    // @ts-ignore
    this.instance.setPublic(modulus, exponent);
    // @ts-ignore
    this.key = this.instance.key;
  }

  /**
   * Returns the public information when the RSA instance is passed
   * to `JSON.stringify`
   */
  toJSON() {
    return this.getPublic();
  }

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
  encrypt(mode: Mode, text: string) {
    // @ts-ignore
    return this.instance.encrypt(mode, text) as string;
  }

  /**
   * Decrypt the encrypted text. If the text is encrypted in chunks, it will be
   * decrypted in chunks.
   *
   * @param mode The mode to decrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
   * @param text The encrypted data to be decrypted.
   */
  decrypt(mode: Mode, text: string) {
    // @ts-ignore
    return this.instance.decrypt(mode, text) as string;
  }
}
