import express from 'express';
import controller from '../controllers/HealthCheckController';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export { router as HealthCheck };
