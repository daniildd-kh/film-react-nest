import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Film } from './repository/entities/films.entity';
import { Schedule } from './repository/entities/schedules.entity';

export const getConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseDriver = configService.get<string>('DATABASE_DRIVER');

  if (databaseDriver === 'postgres') {
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST', 'localhost'),
      port: configService.get<number>('DATABASE_PORT', 5432),
      username: configService.get<string>('DATABASE_USERNAME', 'prac'),
      password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
      database: configService.get<string>('DATABASE_NAME', 'prac'),
      entities: [Film, Schedule],
      synchronize: true,
    };
  }
};
