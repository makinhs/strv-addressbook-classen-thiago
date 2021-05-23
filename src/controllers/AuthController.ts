import { Request, Response } from 'express';
import { logger } from '../config/Logger';
import { authService } from '../services/Auth.service';
import { userService } from '../services/User.service';

class AuthController {
    constructor() {}

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);

        logger.info('checking if user exist.');
        if (!user) {
            return res.status(401).json({ error: 'Email or Password invalid.' });
        }

        const isValid = await authService.validatePassword(user, password);

        if (!isValid) return res.status(401).json({ error: 'Email or Password invalid.' });

        const jwtToken = authService.signJWT(user.id);

        res.status(200).json({ token: jwtToken });
    }
}

const authController = new AuthController();

export { authController };
