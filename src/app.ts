import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
const cors = require('cors');
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@dstransaction/common';

import { puzzleRouter } from './routes/puzzle';

const corsOptions = {
    origin: 'http://localhost:3000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
const app = express();
app.set('trust proxy', true);
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(
    cookieSession({
        signed: false,
        secure: true,
        name: 'session',
    })
);

app.use(puzzleRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };