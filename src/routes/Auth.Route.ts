import express from 'express';
import { authController } from '../controllers/AuthController';

const router = express.Router();

router.post('/auth', authController.authenticate);

export { router as AuthRoute };
