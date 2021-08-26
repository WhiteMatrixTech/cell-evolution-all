import fs from 'fs';

export * from './autotry';

const LOG_PERSIS_DIR = process.env.LOG_PERSIS_DIR || './deployment-artifacts';

export async function getPersisLogDir(): Promise<string> {
  if (!fs.existsSync(LOG_PERSIS_DIR)) {
    await fs.promises.mkdir(LOG_PERSIS_DIR);
  }
  return LOG_PERSIS_DIR;
}
