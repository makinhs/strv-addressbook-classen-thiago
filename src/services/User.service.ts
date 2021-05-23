import { getRepository } from 'typeorm';
import { logger } from '../config/Logger';
import { User } from '../db/models/user';

class UserService {
    constructor() {}
    async getUserByEmail(email: string) {
        const repository = getRepository(User);
        return await repository.findOne({ where: { email } });
    }
    async registerNewUser(email: string, password: string) {
        const repository = getRepository(User);

        logger.info('checking if the user already exists.');
        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            throw Error('User already registered.');
        }

        logger.info('saving new user data');
        const user = repository.create({ email, password });
        await repository.save(user);

        return user;
    }
}

const userService = new UserService();

export { userService };
