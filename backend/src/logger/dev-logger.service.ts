import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    super.log(`[LOG] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(`[ERROR] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(`[WARNING] ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(`[DEBUG] ${message}`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(`[INFO] ${message}`, ...optionalParams);
  }
}
