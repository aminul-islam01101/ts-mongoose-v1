import colors from '@colors/colors';
import 'dotenv/config';
import { Server } from 'http';
import app from './app';
import { connectDataBase as connect } from './utils/configs/db';
import { configs } from './utils/configs/envConfigs';
import { errorLogger, logger } from './utils/shared/logger';

// Handle uncaughtException
process.on('uncaughtException', (error) => {
  console.log('uncaughtException detected'.red);
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

const startServer = async () => {
  try {
    await connect();

    server = app.listen(configs.port, () => {
      console.log(
        colors.yellow(`Server is running on port ${configs.port as string}
      
      `).bold
      );
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }
  // Handle unhandledRejection

  process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection detected. closing server...'.red);
    if (server) {
      server.close();
      console.log('server is closed'.red);
      console.log(error);
      errorLogger.error(error);
      process.exit(1);
    } else {
      console.log('server is closed');
      process.exit(1);
    }
  });
};

startServer().catch((err) => {
  errorLogger.error('Failed to connect database', err);
});
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
