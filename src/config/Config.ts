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

const config = {
    server: SERVER,
    env: ENV,
    argon: argonConfig
};

export { config };
