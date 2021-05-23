import { createConnection } from 'typeorm';
import { logger } from '../config/Logger';

createConnection().then(() => logger.info('conected to SQL db, starting node server.'));
