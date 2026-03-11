import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT ?? 4000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/wondermall';

async function bootstrap(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
