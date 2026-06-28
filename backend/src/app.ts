import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './app/routes';
import { errorMiddleware } from './app/middlewares/error.middleware';
import { notFoundMiddleware } from './app/middlewares/not-found.middleware';

const app: Application = express();

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * Enable CORS
 */
app.use(cors());

/**
 * Compress Response Bodies
 */
app.use(compression());

/**
 * HTTP Request Logger
 */
app.use(morgan('dev'));

/**
 * Parse JSON Requests
 */
app.use(express.json());

/**
 * Parse URL Encoded Requests
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Register Application Routes
 */
app.use('/', routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;