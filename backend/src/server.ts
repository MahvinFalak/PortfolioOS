import app from './app';
import { appConfig } from './app/config';
import {
  connectDatabase,
  disconnectDatabase,
} from './app/database';
import { Logger } from './app/utils/logger';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const server = app.listen(appConfig.port, () => {
    Logger.info(
      `${appConfig.appName} API is running on port ${appConfig.port} (${appConfig.environment})`,
    );
  });

  const gracefulShutdown = async (signal: string): Promise<void> => {
    Logger.info(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      await disconnectDatabase();

      Logger.info('HTTP server closed.');

      process.exit(0);
    });
  };

  process.on('SIGINT', () => {
    void gracefulShutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    void gracefulShutdown('SIGTERM');
  });
};

void startServer();