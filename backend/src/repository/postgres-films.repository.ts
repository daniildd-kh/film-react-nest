import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { FilmEntity } from './entities/films.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface FilmsRepository {
  findAll(): Promise<GetFilmDto[]>;
  findOne(id: string): Promise<GetFilmDto | null>;
  updateFilm(film: FilmEntity): Promise<void>;
}

@Injectable()
export class PostgresFilmsRepository implements FilmsRepository {
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
    const films = await this.filmRepository.find({
      relations: { schedule: true },
    });
    return films.map((film) => this.mapFilmToDto(film));
  }

  async findOne(id: string): Promise<GetFilmDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
    return this.mapFilmToDto(film);
  }

  async findOneRaw(id: string): Promise<FilmEntity | null> {
    return await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }

  async updateFilm(film: FilmEntity) {
    await this.filmRepository.save(film);
  }
}
