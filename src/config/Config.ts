import dotenv from 'dotenv';
import * as argon2 from 'argon2';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const ENV = process.env.NODE_ENV || 'development';

/** Follwing OWASP guidelines https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html */
const argonConfig = { type: argon2.argon2id, memoryCost: 2 ** 16, hashLength: 50, parallelism: 2 };

const jwtSecret = process.env.JWT_SECRET || 'secret';

const firebaseConfig = {
    apiKey: 'AIzaSyDyX3SkzVsX3sfMNNBZKk99jQLrAGPVKh8',
    authDomain: 'strv-addrsbook-classen-thiago.firebaseapp.com',
    projectId: 'strv-addrsbook-classen-thiago',
    storageBucket: 'strv-addrsbook-classen-thiago.appspot.com',
    messagingSenderId: '653055635048',
    appId: '1:653055635048:web:5e7eed84534ba9035015dd'
};

const config = {
    server: SERVER,
    env: ENV,
    argon: argonConfig,
    jwtSecret,
    firebaseConfig
};

export { config };
