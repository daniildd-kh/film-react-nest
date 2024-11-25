import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { FilmEntity } from './entities/films.entity';

@Injectable()
export class PostgresFilmsRepository {
  private readonly logger = new Logger(PostgresFilmsRepository.name);

  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  private mapSchedule(schedules): GetScheduleDto[] {
    return schedules.map((s) => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    }));
  }

  private mapFilmToDto(film): GetFilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: this.mapSchedule(film.schedule),
    };
  }

  async findAll(): Promise<GetFilmDto[]> {
    this.logger.log('PostgreSQL: Выполняется запрос всех фильмов...');
    const films = await this.filmRepository.find({
      relations: { schedule: true },
    });
    this.logger.log(`PostgreSQL: Найдено ${films.length} фильмов.`);
    return films.map((film) => this.mapFilmToDto(film));
  }

  async findOne(id: string): Promise<GetFilmDto | null> {
    this.logger.log(`PostgreSQL: Выполняется запрос фильма по id: ${id}`);
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
    if (!film) {
      this.logger.warn(`PostgreSQL: Фильм с id: ${id} не найден.`);
      return null;
    }
    this.logger.log(`PostgreSQL: Фильм с id: ${id} найден.`);
    return this.mapFilmToDto(film);
  }

  async findOneRaw(id: string): Promise<FilmEntity | null> {
    this.logger.log(`PostgreSQL: Выполняется запрос фильма (сырой) по id: ${id}`);
    return await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }

  async updateFilm(film: FilmEntity) {
    this.logger.log(`PostgreSQL: Обновление фильма с id: ${film.id}`);
    await this.filmRepository.save(film);
    this.logger.log(`PostgreSQL: Фильм с id: ${film.id} обновлен.`);
  }
}
