import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import helmet from 'helmet';
import * as middlewares from './middlewares.js';
import authRouter from './routes/auth.route.js';
import gameRouter from './routes/game.route.js';

const port = parseInt(process.env.PORT || '3000', 10);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(morgan('common'));
app.use(helmet());

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);

// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`> Ready on http://localhost:${port}`);
});
