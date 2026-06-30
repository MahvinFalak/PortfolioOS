import mongoose from 'mongoose';

import { appConfig } from '../config';
import { Logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.database.uri);

    Logger.info('MongoDB connected successfully.');
  } catch (error) {
    Logger.error('Failed to connect to MongoDB.', error);

    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.connection.close();

  Logger.info('MongoDB connection closed.');
};
