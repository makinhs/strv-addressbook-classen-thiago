import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/Logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logger.info(`[Request] METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logger.info(`[Response] METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
};

export { loggerMiddleware };
