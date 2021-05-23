import { Passport } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from './Config';
import { User } from '../db/models/user';
import { getRepository } from 'typeorm';
import { logger } from './Logger';

const initPassport = function () {
    const passport = new Passport(),
        jwtStrategy = new Strategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.jwtSecret }, async (jwt, done) => {
            const userRepository = getRepository(User);

            logger.info('checking id from jwt.');
            const user = await userRepository.findOne({ where: { id: jwt.id } });

            if (!user) return done('error');

            return done(null, user);
        });

    passport.use(jwtStrategy);

    return passport;
};

export { initPassport };
