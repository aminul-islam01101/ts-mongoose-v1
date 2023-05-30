import consola from 'consola';

import mongoose from 'mongoose';
import configs from './envConfigs';

mongoose.set('strictQuery', true);

const mongoDbUrl = configs.databaseUrl;

const connectDataBase = async () => {
  try {
    await mongoose.connect(configs.databaseUrl as string);
    consola.success('🎯 Successfully database connected 🌹😊');
  } catch (err) {
    process.exit(1);
  }
};

export { connectDataBase, mongoDbUrl };
