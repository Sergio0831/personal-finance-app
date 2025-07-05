import { hash, type Options, verify } from '@node-rs/argon2';

const opts: Options = {
  memoryCost: 19_456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash: passwordHash } = data;

  const result = await verify(passwordHash, password, opts);
  return result;
}
