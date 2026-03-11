import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes';
import usersRouter from './routes/users.routes';
import cartRouter from './routes/cart.routes';
import ordersRouter from './routes/orders.routes';
import paymentsRouter from './routes/payments.routes';
import addressesRouter from './routes/addresses.routes';
import wishlistRouter from './routes/wishlist.routes';
import adminRouter from './routes/admin.routes';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/cart', cartRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/admin', adminRouter);

export default app;
