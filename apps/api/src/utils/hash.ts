import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const MAX_BCRYPT_BYTES = 72;

function assertBcryptLength(password: string): void {
  if (Buffer.byteLength(password, 'utf8') > MAX_BCRYPT_BYTES) {
    throw new Error('Password must be 72 bytes or fewer');
  }
}

export async function hashPassword(password: string): Promise<string> {
  assertBcryptLength(password);
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  assertBcryptLength(password);
  return bcrypt.compare(password, hash);
}
