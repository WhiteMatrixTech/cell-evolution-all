import fs from 'fs';
import crypto from 'crypto';

export * from './autotry';

const LOG_PERSIS_DIR = process.env.LOG_PERSIS_DIR || './logs-persis';

export async function getPersisLogDir(): Promise<string> {
  if (!fs.existsSync(LOG_PERSIS_DIR)) {
    await fs.promises.mkdir(LOG_PERSIS_DIR);
  }
  return LOG_PERSIS_DIR;
}

function next(seed: crypto.BinaryLike | Buffer) {
  return crypto.createHash('sha256').update(seed).digest();
}

export function randSeed(seed: string | Buffer): {
  (n: number): Buffer;
  seed: string | Buffer;
  currentSeed: string | Buffer;
} {
  function randomBytes(n: number) {
    const result = Buffer.allocUnsafe(n);
    let used = 0;

    while (used < result.length) {
      randomBytes.currentSeed = seed = next(seed);
      seed.copy(result, used);
      used += seed.length;
    }

    return result;
  }
  randomBytes.seed = seed = seed || crypto.randomBytes(32);
  randomBytes.currentSeed = seed;

  return randomBytes;
}
