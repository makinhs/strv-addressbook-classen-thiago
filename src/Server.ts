import http from 'http';
import express from 'express';
import SwaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import './db/pg_connect';
import { config } from './config/Config';
import { loggerMiddleware } from './middleware/logger.middleware';
import { SwaggerDocument } from './config/swagger/SwaggerDocument';
import { HealthCheck } from './routes/HealthCheck.route';
import { UsersRoute } from './routes/UsersCredential.route';
import { AuthRoute } from './routes/Auth.route';
import { ContactRoute } from './routes/Contact.route';
import { errorMiddleware } from './middleware/error.middleware';
import { corsMiddleware } from './middleware/cors.middleware';
import { logger } from './config/Logger';

const app = express();

/** Log the request */
app.use(loggerMiddleware);

/** Body parser */
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
app.use(ContactRoute);

/** Error handling */
app.use(errorMiddleware);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(`Server is running ${config.server.hostname}:${config.server.port}`));

export { httpServer as server };
