import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.use(errorMiddleware);
