// Import SensitiveFileManager
import { SensitiveFileManager } from '../index.js';
// Option 1: Generate a new secret key (this key should be stored securely)
const secretKey = SensitiveFileManager.generateSecretKey();
console.log('Generated Secret Key:', secretKey);
// Create an instance with the provided secret key.
const manager = new SensitiveFileManager(secretKey);
// Immediately Invoked Async Function Expression for using async/await.
(async () => {
    try {
        // Encrypt a file (e.g., "data.txt") and save the encrypted file as "data.enc".
        await manager.encryptFile('sensitive-data.json', 'data.enc');
        console.log('File encrypted successfully.');
        // Decrypt the file "data.enc" and get the original data.
        const decryptedData = await manager.decryptFile('data.enc');
        // Print out the decrypted content as a string.
        console.log('Decrypted file content:', decryptedData.toString('utf8'));
    }
    catch (error) {
        console.error(error);
    }
})();
