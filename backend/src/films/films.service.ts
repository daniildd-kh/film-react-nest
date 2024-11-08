import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostgresFilmsRepository } from '../repository/postgres-films.repository';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | PostgresFilmsRepository
      | MongoFilmsRepository,
  ) {}

  async getAllFilms() {
    const films = await this.filmsRepository.findAll();

    if (!films || films.length === 0) {
      throw new NotFoundException('Нет записей');
    }
    return films;
  }

  async getFilm(id: string) {
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      throw new NotFoundException('Нет расписания');
    }
    return film;
  }
}
