import express from 'express';
import controller from '../controllers/HealthCheck';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export { router as HealthCheck };
