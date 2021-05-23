import * as jwt from 'jsonwebtoken';
import { config } from '../config/Config';
import { logger } from '../config/Logger';
import * as argon2 from 'argon2';
import { User } from '../db/models/user';

class AuthService {
    constructor() {}
    signJWT(id: string) {
        logger.info('signing user jwt.');
        const jwtToken = jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' });

        return jwtToken;
    }
    async validatePassword(user: User, password: string) {
        logger.info('validating password.');
        try {
            if (!(await argon2.verify(user!.password, password))) return false;
        } catch (err) {
            logger.error('error while validating the hash.', err);
            throw Error('error while validating the hash.');
        }

        return true;
    }
}

const authService = new AuthService();

export { authService };
