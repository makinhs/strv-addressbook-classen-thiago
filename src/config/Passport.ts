import { Passport } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from './Config';
import { logger } from './Logger';
import { userService } from '../services/User.service';

const initPassport = function () {
    const passport = new Passport(),
        jwtStrategy = new Strategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.jwtSecret }, async (jwt, done) => {
            logger.info('checking id from jwt.');
            const user = await userService.getUserById(jwt.id);

            if (!user) return done('error');

            return done(null, user);
        });

    passport.use(jwtStrategy);

    return passport;
};

export { initPassport };
