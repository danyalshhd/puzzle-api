import { app } from "./app";
import mongoose from "mongoose";
const MONGO_URL: string = process.env.MONGO_URL || '';

const start = async () => {

  if (!process.env.API_KEY) {
    throw new Error('API_KEY must be defined');
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3001, () => {
    console.log('Listening on port 3001.');
  });
};

start();
