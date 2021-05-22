import pino from 'pino';
import ecsFormat from '@elastic/ecs-pino-format';
import dotenv from 'dotenv';

dotenv.config();

export const logger = pino({
    ...ecsFormat(),
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.NODE_ENV !== 'production' || process.env.LOG_PRETTY_PRINT === 'true'
});
