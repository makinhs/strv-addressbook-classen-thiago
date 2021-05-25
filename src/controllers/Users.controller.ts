import { Request, Response } from 'express';
import { logger } from '../config/Logger';
import { User } from '../db/models/User';
import { userService } from '../services/User.service';
import { authService } from '../services/Auth.service';

class UsersCredentialController {
    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        let user: User;
        try {
            user = await userService.registerNewUser(email, password);
        } catch (err) {
            return res.status(409).json(err);
        }

        logger.info('signing user jwt');
        const jwtToken = authService.signJWT(user.id);

        res.status(201).json({ token: jwtToken });
    }
}

export default new UsersCredentialController();
