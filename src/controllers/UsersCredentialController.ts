import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { logger } from '../config/Logger';
import { User } from '../db/models/user';

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

        res.status(201).json({ id: user.id });
    }
}

export default new UsersCredentialController();
