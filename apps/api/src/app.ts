import { CoreService } from '@castaminofen/core';
import { ConfigService } from '@castaminofen/config';
import { LoggerService } from '@castaminofen/logger';

export interface AppContract {
  readonly name: string;
  start(): string;
}

export class AppBootstrap implements AppContract {
  constructor(public readonly name: string) {}

  start(): string {
    const core = new CoreService({
      name: '@castaminofen/core',
      version: '0.1.0',
      enabled: true,
    });

    const config = new ConfigService({
      name: '@castaminofen/config',
      version: '0.1.0',
      enabled: true,
    });

    const logger = new LoggerService({
      name: '@castaminofen/logger',
      version: '0.1.0',
      enabled: true,
    });

    const runtimeConfig = config.getRuntimeConfig();
    logger.info(`Starting ${this.name}`, JSON.stringify(runtimeConfig));

    return `${this.name} started via ${core.initialize()} on ${runtimeConfig.port}`;
  }
}
