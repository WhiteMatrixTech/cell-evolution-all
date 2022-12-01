import fs from 'fs';
import promiseRetry from 'promise-retry';
import pino from 'pino';
import {BigNumber, PayableOverrides} from 'ethers';

const Logger = pino();
const LOG_DIR = process.env.LOG_DIR || './logs';

export async function getLogDir(): Promise<string> {
  if (!fs.existsSync(LOG_DIR)) {
    await fs.promises.mkdir(LOG_DIR);
  }
  return LOG_DIR;
}

export class AutoTry {
  logFileName: string;
  functionIndex: number;
  RETRY_NUMBER: number;
  functionGas: Array<{
    functionName: string;
    gasUsed: number;
    gasPrice: string;
    fee: string;
  }>;
  totalGas: BigNumber;
  log: any;
  logPath: string;
  logFile = {
    write: async (): Promise<void> => {
      Logger.info(`write:${this.logPath}`);
      await fs.promises.writeFile(this.logPath, JSON.stringify(this.log));
    },
    read: async (): Promise<void> => {
      if (fs.existsSync(this.logPath)) {
        Logger.info(`read:${this.logPath}`);
        this.log = JSON.parse(
          (await fs.promises.readFile(this.logPath)).toString()
        );
      }
    },
    unlink: async (): Promise<void> => {
      if (fs.existsSync(this.logPath)) {
        Logger.info(`unlink:${this.logPath}`);
        await fs.promises.unlink(this.logPath);
      }
    },
  };

  constructor(logFileName: string, RETRY_NUMBER = 3) {
    this.logFileName = logFileName;
    this.functionIndex = 0;
    this.RETRY_NUMBER = RETRY_NUMBER;
    this.functionGas = [];
    this.totalGas = BigNumber.from(0);
    this.logPath = '';
    this.log = {};
  }

  async load(): Promise<void> {
    console.log('load');
    this.logPath = `${await getLogDir()}/${this.logFileName}.lock`;
    await this.logFile.read();
    if (this.log.functionGas) {
      this.functionGas = this.log.functionGas;
      let totalGas = 0;
      for (const i in this.functionGas) {
        totalGas += this.functionGas[i].gasUsed;
      }
      this.totalGas = BigNumber.from(totalGas);
    }
  }

  addFunctionIndex(): void {
    this.functionIndex++;
  }

  async call(
    func: any,
    args: Array<any>,
    functionName: string,
    isLast = false
  ): Promise<any> {
    const functionIndex = this.functionIndex++;
    if (!this.log[functionIndex]) {
      const result = await promiseRetry(async (retry, number) => {
        Logger.info(
          `execute operation call:${functionIndex}, ${functionName}, try ${number}`
        );
        return func(...args).catch((err: Error) => {
          if (number >= this.RETRY_NUMBER) {
            throw err;
          }
          retry(err);
        });
      });
      Logger.info(`success call:${functionIndex},${functionName}`);
      if (isLast) {
        console.table(this.functionGas);
        await this.logFile.unlink();
      } else {
        this.log[functionIndex] = result;
        await this.logFile.write();
      }
      return result;
    } else {
      Logger.info(`skip call:${functionIndex},${functionName}`);
      if (isLast) {
        this.logFile.unlink();
      }
      return this.log[functionIndex];
    }
  }

  async transaction(
    func: any,
    args: Array<any>,
    saves: Array<string>,
    functionName: string,
    config: PayableOverrides,
    waitNum = 0,
    isLast = false
  ): Promise<any> {
    const functionIndex = this.functionIndex++;
    if (!this.log[functionIndex]) {
      const ret = await promiseRetry(async (retry, number) => {
        Logger.info(
          `execute operation transaction:${functionIndex}, ${functionName}, try ${number}`
        );
        return func(...args, config).catch((err: Error) => {
          if (number >= this.RETRY_NUMBER) {
            throw err;
          }
          retry(err);
        });
      });
      const tx = ret.deployTransaction ? ret.deployTransaction : ret;
      const gasPrice = tx.gasPrice;
      const receipt = await tx.wait(waitNum);
      const gasUsed = receipt.gasUsed;
      this.totalGas = this.totalGas.add(gasUsed);
      const json = {
        functionName: functionName,
        gasUsed: gasUsed.toNumber(),
        gasPrice: `${gasPrice.div(10 ** 9)} gwei`,
        fee: `${parseFloat(gasUsed.mul(gasPrice).toString()) / 10 ** 18} ether`,
      };
      this.functionGas.push(json);
      if (!this.log.functionGas) {
        this.log.functionGas = [];
      }
      this.log.functionGas.push(json);
      Logger.info(`success transaction:${functionIndex},${functionName}`);
      const result: any = {};
      saves.forEach((e) => {
        result[e] = receipt[e];
      });
      if (isLast) {
        this.functionGas.push({
          functionName: `totalGas`,
          gasUsed: this.totalGas.toNumber(),
          gasPrice: `${gasPrice.div(10 ** 9)} gwei`,
          fee: `${
            parseFloat(this.totalGas.mul(gasPrice).toString()) / 10 ** 18
          } ether`,
        });
        console.table(this.functionGas);
        await this.logFile.unlink();
      } else {
        this.log[functionIndex] = result;
        await this.logFile.write();
      }
      return result;
    } else {
      Logger.info(`skip transaction:${functionIndex},${functionName}`);
      if (isLast) {
        await this.logFile.unlink();
      }
      return this.log[functionIndex];
    }
  }
}
