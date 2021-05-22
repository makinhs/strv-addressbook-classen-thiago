import http from 'http';
import express from 'express';
import config from './config/Config';
import SwaggerUi from 'swagger-ui-express';
import { logger } from './config/Logger';
import { SwaggerDocument } from './config/SwaggerDocument';
import { HealthCheck } from './routes/HealthCheck';

const NAMESPACE = 'Server';
const app = express();

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logger.info(`[${NAMESPACE}] [Request] METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logger.info(`[${NAMESPACE}] [Response] METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Pino Logger */

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Swagger Setup */
if (config.env !== 'production') {
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument));
}

/** CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
app.use(HealthCheck);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(`[${NAMESPACE}] Server is running ${config.server.hostname}:${config.server.port}`));

export { httpServer as server };
