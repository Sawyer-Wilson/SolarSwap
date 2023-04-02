const crypto = require('crypto'); 

// Encrypt password given by the user 
function encrypt (password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const encryptedPass = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return { salt, encryptedPass };
}

// Check if plaintext password matches encrypted password
function isEqual (plainPass, encryptedPass, salt) {
    const plainEncrypted = crypto.pbkdf2Sync(plainPass, salt, 10000, 64, 'sha512').toString('hex');
    return encryptedPass == plainEncrypted;
}

module.exports = { encrypt, isEqual };