import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/films.entity';
import { FilmsDbRepository } from './films.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsDbRepository],
  exports: [FilmsDbRepository],
})
export class RepositoryModule {}
