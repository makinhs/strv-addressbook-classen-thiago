import { getRepository } from 'typeorm';
import { User } from '../db/models/user';

class UserService {
    constructor() {}
    async getUserByEmail(email: string) {
        const repository = getRepository(User);
        return await repository.findOne({ where: { email } });
    }
}

const userService = new UserService();

export { userService };
