import { getRepository } from 'typeorm';
import { logger } from '../config/Logger';
import { User } from '../db/models/User';
import { userRefService } from './UserRef.service';

class UserService {
    constructor() {}

    async getUserByEmail(email: string) {
        const repository = getRepository(User);
        return await repository.findOne({ where: { email } });
    }

    async getUserById(id: string) {
        const repository = getRepository(User);
        return await repository.findOne({ where: { id } });
    }

    async registerNewUser(email: string, password: string) {
        const repository = getRepository(User);

        logger.info('checking if the user already exists.' + email);
        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            throw Error('User already registered.');
        }

        logger.info('saving new user data');
        const user = repository.create({ email, password });
        await repository.save(user);

        await userRefService.addUserRef(user.id);

        return user;
    }
}

const userService = new UserService();

export { userService };
