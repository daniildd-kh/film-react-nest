import { Module } from '@nestjs/common';
import { DevLogger } from './dev-logger.service';
import { JsonLogger } from './json-logger.service';
import { TskvLogger } from './tskv-logger.service';

@Module({
  providers: [DevLogger, JsonLogger, TskvLogger],
  exports: [DevLogger, JsonLogger, TskvLogger],
})
export class LoggerModule {}
