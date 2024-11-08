import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FilmEntity } from './repository/entities/films.entity';
import { Schedule } from './repository/entities/schedules.entity';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'prac'),
    password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
    database: configService.get<string>('DATABASE_NAME', 'prac'),
    entities: [FilmEntity, Schedule],
    synchronize: true,
  };
};

export const getMongooseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: configService.get<string>(
    'DATABASE_URL',
    'mongodb://127.0.0.1:27017/practicum',
  ),
});
