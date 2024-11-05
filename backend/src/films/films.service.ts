import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async getAllFilms() {
    const films = await this.filmsRepository.findAll();
    if (!films || films.length === 0) {
      throw new NotFoundException('Нет записей');
    }

    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string) {
    const schedule = await this.filmsRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException('Нет расписания');
    }

    return {
      items: schedule,
    };
  }
}
