import { ConfigService } from '@nestjs/config';

export const getConfig = (configService: ConfigService) => {
  const driver = configService.get<string>('DATABASE_DRIVER') || 'mongodb';
  const url =
    configService.get<string>('DATABASE_URL') ||
    'mongodb://127.0.0.1:27017/practicum';

  return { driver, url };
};
