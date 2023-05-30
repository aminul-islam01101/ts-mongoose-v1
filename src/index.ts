import colors from 'colors';
import 'dotenv/config';
import app from './app';
import { connectDataBase as connect } from './utils/configs/db';

const port: number = parseInt(process.env.PORT || '8080');

colors.setTheme({
  info: 'green',
  help: 'cyan',
  warn: 'yellow',
  error: 'red',
});

const startServer = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.yellow.bold);
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
