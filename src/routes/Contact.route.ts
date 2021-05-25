import express from 'express';
import { contactController } from '../controllers/Contact.controller';
import { initPassport } from '../config/Passport';

const router = express.Router(),
    passport = initPassport();

router.post('/contact', passport.authenticate('jwt', { session: false }), contactController.addContact);

//router.get('/contact/:id', contactController.getContactsByUserId);

export { router as ContactRoute };
