import express from 'express';
import controller from '../controllers/HealthCheck.controller';
import { initPassport } from '../config/Passport';

const router = express.Router(),
    passport = initPassport();

// router.get('/ping', passport.authenticate('jwt', { session: false }), controller.serverHealthCheck);

router.get('/ping', controller.serverHealthCheck);

export { router as HealthCheck };
