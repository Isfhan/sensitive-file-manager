export declare class SensitiveFileManager {
    private key;
    private readonly algorithm;
    private readonly ivLength;
    /**
     * Constructs a new instance of SensitiveFileManager.
     * @param secretKeyHex - A 64-character hex string representing the secret key.
     * @throws {Error} If the provided secret key is not a 64-character hex string.
     */
    constructor(secretKeyHex: string);
    /**
     * Encrypts a file using the AES-256-CBC algorithm.
     * Reads the file from srcPath, generates a random Initialization Vector (IV), encrypts the data, and writes the encrypted data
     * (prepended with the IV) to destPath.
     * @param srcPath - The file path of the unencrypted file.
     * @param destPath - The file path of the encrypted file.
     * @returns A Promise that resolves if the encryption is successful.
     * @throws {Error} If encryption fails.
     */
    encryptFile(srcPath: string, destPath: string): Promise<void>;
    /**
     * Decrypts a file.
     * Reads the file from srcPath, extracts the IV (first 16 bytes), decrypts the remaining data,
     * and returns the decrypted content as a Buffer.
     * @param srcPath - The file path of the encrypted file.
     * @returns A Promise that resolves with the decrypted data.
     * @throws {Error} If decryption fails.
     */
    decryptFile(srcPath: string): Promise<Buffer>;
    /**
     * Generates a secure random secret key.
     * @returns A 64-character hex string representing a 32-byte key.
     */
    static generateSecretKey(): string;
}
