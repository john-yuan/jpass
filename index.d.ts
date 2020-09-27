interface JPassSerializeObject {
    n: string;
    e: string;
    d: string;
}
interface JPassPublicObject {
    modulus: string;
    exponent: string;
}
declare type Mode = 'URL_MODE' | 'BYTE_MODE';
export declare const URL_MODE: Mode;
export declare const BYTE_MODE: Mode;
export declare class JPass {
    private instance;
    key: Object;
    constructor();
    /**
     * Generate a new RSAKey. Call this method will reset the key.
     *
     * @param size The key size.
     * @param exponent The public exponent. Default is `65537`.
     */
    generate(size: number, exponent?: number): void;
    /**
     * Serialize the current RSAKey.
     */
    serialize(): JPassSerializeObject;
    /**
     * Parse the object to a RSAKey. Call this method will reset the key.
     *
     * @param object An object containing the key details.
     */
    parse(object: JPassSerializeObject): void;
    /**
     * Get the public information fo the RSAKey.
     */
    getPublic(): JPassPublicObject;
    /**
     * Create a new with the given modulus and public exponent.
     * Call this method will reset the key.
     *
     * @param modulus The base64 encoded RSA modulus.
     * @param exponent The base64 encoded RSA public exponent.
     */
    setPublic(modulus: string, exponent: string): void;
    /**
     * Returns the public information when the RSA instance is passed
     * to `JSON.stringify`
     */
    toJSON(): JPassPublicObject;
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
    encrypt(mode: Mode, text: string): string;
    /**
     * Decrypt the encrypted text. If the text is encrypted in chunks, it will be
     * decrypted in chunks.
     *
     * @param mode The mode to decrypt the text. Can be `URL_MODE` or `BYTE_MODE`.
     * @param text The encrypted data to be decrypted.
     */
    decrypt(mode: Mode, text: string): string;
}
export {};
