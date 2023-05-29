import consola from 'consola';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

mongoose.set('strictQuery', true);

const mongoDbUrl = `mongodb+srv://${process.env.DB_USER ?? 'username'}:${
  process.env.DB_PASSWORD ?? 'password'
}@cluster0.5ty8ljz.mongodb.net/fullBack?retryWrites=true&w=majority`;

const connectDataBase = async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    consola.success(' database connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDataBase, mongoDbUrl };
