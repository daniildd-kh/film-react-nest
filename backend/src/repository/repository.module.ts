import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FilmEntity } from './entities/films.entity';
import { PostgresFilmsRepository } from './postgres-films.repository';
import { FilmSchema } from './schemes/films.schema';
import { MongoFilmsRepository } from './mongo-films.repository';

@Global()
@Module({})
export class RepositoryModule {
  static forDatabase(): DynamicModule {
    const databaseDriver = process.env.DATABASE_DRIVER || 'mongodb';
    console.log(databaseDriver);

    const repositoryProvider: Provider = {
      provide: 'FILMS_REPOSITORY',
      useClass:
        databaseDriver === 'postgres'
          ? PostgresFilmsRepository
          : MongoFilmsRepository,
    };

    const databaseModule =
      databaseDriver === 'postgres'
        ? TypeOrmModule.forFeature([FilmEntity])
        : MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }]);

    return {
      module: RepositoryModule,
      imports: [ConfigModule, databaseModule],
      providers: [repositoryProvider],
      exports: [repositoryProvider],
    };
  }
}
