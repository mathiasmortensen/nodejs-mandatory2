import express from 'express';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import session from 'express-session';
import authRouter from './routers/authRouter.js';
import path from 'path';
import './db/createDatabase.js';

const app = express();

app.use(express.static('../frontend/dist'));

app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use('/auth', authLimiter);

app.use(helmet());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 15 * 60 * 1000 },
  })
);

app.use('/auth', authRouter);

const PORT = process.env.PORT ?? 8080;

app.get('/{*splat}', (req, res) => {
  if (req.path.startsWith('/auth')) {
    return res.status(404).json({ errorMessage: 'Du har ikke adgang...' });
  }
  return res.sendFile(path.resolve('../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
