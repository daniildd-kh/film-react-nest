import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostgresFilmsRepository } from '../repository/postgres-films.repository';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);

  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | PostgresFilmsRepository
      | MongoFilmsRepository,
  ) {}

  async getAllFilms() {
    this.logger.log('Выполнение запроса в БД на получшение фильмов');
    const films = await this.filmsRepository.findAll();

    if (!films || films.length === 0) {
      this.logger.error('Нет записей');
      throw new NotFoundException('Нет записей');
    }
    return films;
  }

  async getFilm(id: string) {
    this.logger.log(`Получение фильма с ID из БД: ${id}`);
    const film = await this.filmsRepository.findOne(id);

    if (!film) {
      this.logger.warn(`Фильм с ID ${id} не найден`);
      throw new NotFoundException('Фильм не найден');
    }
    return film;
  }
}
