import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsDbRepository) {}

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
