import http from 'http';
import express from 'express';
import SwaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import './db/pg_connect';
import { config } from './config/Config';
import { loggerMiddleware } from './middleware/logger.middleware';
import { SwaggerDocument } from './config/swagger/SwaggerDocument';
import { HealthCheck } from './routes/HealthCheck.Route';
import { UsersRoute } from './routes/UsersCredential.Route';
import { AuthRoute } from './routes/Auth.Route';
import { errorMiddleware } from './middleware/error.middleware';
import { corsMiddleware } from './middleware/cors.middleware';
import { logger } from './config/Logger';
//import { connectDB } from './db/pg_connect';

/** Connecting ORM to PG DB */
//connectDB().then(() => logger.info('conected to SQL db, starting node server.'));

const app = express();

/** Log the request */
app.use(loggerMiddleware);

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Swagger Setup */
if (config.env !== 'production') {
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument));
}

/** CORS */
app.use(corsMiddleware);

/** Api Routes go here */
app.use(HealthCheck);
app.use(UsersRoute);
app.use(AuthRoute);

/** Error handling */
app.use(errorMiddleware);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(`Server is running ${config.server.hostname}:${config.server.port}`));

export { httpServer as server };
