import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString();
    return `time=${timestamp}\tlevel=${level}\tmessage=${message}\t${optionalParams}`;
  }

  log(message: any, optionalParams: any[]) {
    console.log(...optionalParams);
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }
}
