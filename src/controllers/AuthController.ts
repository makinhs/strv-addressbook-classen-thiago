import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../db/models/user';
import * as argon2 from 'argon2';
import { logger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/Config';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User),
            { email, password } = req.body;

        const user = await repository.findOne({ where: { email } });

        logger.info('checking if user exist.');
        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials.' });
        }

        logger.info('validating password.');
        try {
            if (!(await argon2.verify(user.password, password))) return res.status(401).json({ error: 'Invalid Credentials.' });
        } catch (err) {
            logger.info('error while validating the hash.', err);
            return res.sendStatus(500);
        }

        logger.info('signing user jwt.');
        const jwtToken = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token: jwtToken });
    }
}

export default new AuthController();
