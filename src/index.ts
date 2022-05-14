import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {

  if (!process.env.API_KEY) {
    throw new Error('API_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://localhost:27017/fintech');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000.');
  });
};

start();
