import { Module } from '@nestjs/common';
import { FilmsMongoDbRepository } from './films.repository';
import { FilmSchema } from './films.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  providers: [FilmsMongoDbRepository],
  exports: [FilmsMongoDbRepository],
})
export class RepositoryModule {}
