# sensitive-file-manager

**sensitive-file-manager** is a sleek, lightweight, and open-source Node.js
package designed to safeguard your sensitive configuration or data files using
robust AES-256-CBC encryption. Crafted with ES6 modules and async/await, it
offers a modern, intuitive API for seamless file-based encryption and
decryption.

## 🌟 Features

-   **File-Based Encryption:** Encrypt and decrypt files effortlessly by
    specifying source and destination paths. The module reads the file, encrypts
    its contents with a randomly generated Initialization Vector (IV), and
    prepends the IV to the ciphertext for hassle-free decryption.

-   **Secure Key Generation:** Use the static method `generateSecretKey()` to
    generate a secure, random 32-byte key (returned as a 64-character hex
    string) for encrypting/decrypting your files. Store this key safely in an
    environment variable.

-   **Easy Integration:** With a straightforward API, you can integrate file
    encryption into your projects without diving into low-level crypto logic.

-   **Modern & Lightweight:** Written in TypeScript using ES6 modules and
    async/await, it leverages Node's built-in `crypto` and `fs` modules,
    minimizing external dependencies.

## 🛠️ Installation

Install the package via npm:

```bash
npm install sensitive-file-manager
```

## 🚀 Usage

### Basic Example

```typescript
import { SensitiveFileManager } from 'sensitive-file-manager';

// Generate a new secret key and store it in an environment variable for later use
const newKey = SensitiveFileManager.generateSecretKey();
console.log('Generated Secret Key:', newKey);

// Retrieve the secret key from an environment variable
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error(
        'Secret key not provided in environment variable SECRET_KEY'
    );
}

// Create an instance with the secret key
const manager = new SensitiveFileManager(secretKey);

// Encrypt a file from "sensitive-data.json" to "encrypted-data.enc"
await manager.encryptFile('sensitive-data.json', 'encrypted-data.enc');
console.log('File encrypted successfully.');

// Decrypt the file "encrypted-data.enc" and get its content as a Buffer
const decryptedData = await manager.decryptFile('encrypted-data.enc');
console.log('Decrypted file content:', decryptedData.toString('utf8'));
```

### API Overview

-   **Constructor** `new SensitiveFileManager(secretKeyHex: string)` Pass a
    64-character hex string (32 bytes) as your secret key.

-   **encryptFile(srcPath: string, destPath: string): Promise<void>** Reads the
    file at `srcPath`, encrypts its contents, and writes the IV-prepended
    ciphertext to `destPath`.

-   **decryptFile(srcPath: string): Promise<Buffer>** Reads the encrypted file
    at `srcPath`, extracts the IV, decrypts the data, and returns it as a
    Buffer.

-   **static generateSecretKey(): string** Generates a secure random secret key
    (32 bytes) and returns it as a 64-character hex string.

## 🔒 Unique Benefits & Example Scenarios

-   **Enhanced Security for Configuration Files:** Encrypt your accounts data or
    configuration files (e.g., FTP/SFTP settings) to ensure that even if the
    file is exposed, its content remains secure. Decryption requires the secret
    key, which can be stored in an environment variable.

-   **Multi-Account Management:** Manage multiple sensitive accounts with a
    single encrypted file containing all configurations. Your application
    decrypts it at runtime, ensuring sensitive details are never stored in plain
    text.

-   **Seamless Integration:** Unlike other packages that focus solely on
    encrypting strings or buffers, **sensitive-file-manager** provides a
    file-centric API that fits naturally into applications working with
    file-based configurations.

## 📜 License

MIT

## 🤝 Open Source

**sensitive-file-manager** is proudly open source! We welcome contributions from
the community to help improve and expand the functionality of this package.