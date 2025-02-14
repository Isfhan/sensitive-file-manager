// Import stuff from Node.js
import crypto from 'crypto';
import { promises as fs } from 'fs';
export class SensitiveFileManager {
    // The encryption key in Buffer format.
    key;
    // We're using the AES-256-CBC encryption algorithm.
    algorithm = 'aes-256-cbc';
    // AES block size (also the size of our IV) is 16 bytes.
    ivLength = 16;
    /**
     * Constructs a new instance of SensitiveFileManager.
     * @param secretKeyHex - A 64-character hex string representing the secret key.
     * @throws {Error} If the provided secret key is not a 64-character hex string.
     */
    constructor(secretKeyHex) {
        if (secretKeyHex.length !== 64) {
            throw new Error('Secret key must be a 64-character hex string');
        }
        // Convert the provided hex string into a Buffer.
        this.key = Buffer.from(secretKeyHex, 'hex');
    }
    /**
     * Encrypts a file using the AES-256-CBC algorithm.
     * Reads the file from srcPath, generates a random Initialization Vector (IV), encrypts the data, and writes the encrypted data
     * (prepended with the IV) to destPath.
     * @param srcPath - The file path of the unencrypted file.
     * @param destPath - The file path of the encrypted file.
     * @returns A Promise that resolves if the encryption is successful.
     * @throws {Error} If encryption fails.
     */
    async encryptFile(srcPath, destPath) {
        try {
            // Read the file content.
            const data = await fs.readFile(srcPath);
            // Generate a random IV aka Initialization Vector.
            const iv = crypto.randomBytes(this.ivLength);
            // Create a cipher with our algorithm, key, and IV.
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            // Encrypt the data.
            const encrypted = Buffer.concat([
                cipher.update(data),
                cipher.final(),
            ]);
            // Prepend the IV (needed for decryption).
            const output = Buffer.concat([iv, encrypted]);
            // Write the encrypted data to the destination file.
            await fs.writeFile(destPath, output);
        }
        catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }
    /**
     * Decrypts a file.
     * Reads the file from srcPath, extracts the IV (first 16 bytes), decrypts the remaining data,
     * and returns the decrypted content as a Buffer.
     * @param srcPath - The file path of the encrypted file.
     * @returns A Promise that resolves with the decrypted data.
     * @throws {Error} If decryption fails.
     */
    async decryptFile(srcPath) {
        try {
            // Read the entire encrypted file.
            const fileData = await fs.readFile(srcPath);
            if (fileData.length < this.ivLength) {
                throw new Error('File is too short to contain a valid IV and data.');
            }
            // Extract the IV from the beginning of the file.
            const iv = fileData.subarray(0, this.ivLength);
            // The rest is the actual encrypted content.
            const encrypted = fileData.subarray(this.ivLength);
            // Create a decipher with our algorithm, key, and extracted IV.
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            // Decrypt the data.
            const decrypted = Buffer.concat([
                decipher.update(encrypted),
                decipher.final(),
            ]);
            return decrypted;
        }
        catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }
    /**
     * Generates a secure random secret key.
     * @returns A 64-character hex string representing a 32-byte key.
     */
    static generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}
