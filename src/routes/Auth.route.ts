import express from 'express';
import { authController } from '../controllers/Auth.controller';

const router = express.Router();

router.post('/auth', authController.authenticate);

export { router as AuthRoute };
