import colors from '@colors/colors';
import 'dotenv/config';
import app from './app';
import { connectDataBase as connect } from './utils/configs/db';
import configs from './utils/configs/envConfigs';

const startServer = async () => {
  try {
    await connect();

    app.listen(configs.port, () => {
      console.log(colors.yellow(`Server is running on port ${configs.port as string}`).bold);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer().catch((err) => {
  console.log(err);
  process.exit(1);
});
