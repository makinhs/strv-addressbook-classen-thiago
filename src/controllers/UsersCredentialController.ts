import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { logger } from '../config/Logger';
import { User } from '../db/models/user';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/Config';

class UsersCredentialController {
    async store(req: Request, res: Response) {
        const repository = getRepository(User),
            { email, password } = req.body;

        logger.info('checking if the user already exists.');
        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            return res.status(409).json({ error: 'User already registered.' });
        }

        logger.info('saving new user data');
        const user = repository.create({ email, password });
        await repository.save(user);

        logger.info('signing user jwt');
        const jwtToken = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1d' });

        res.status(201).json({ token: jwtToken });
    }
}

export default new UsersCredentialController();
