import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film } from './entities/films.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface FilmsRepository {
  findAll(): Promise<GetFilmDto[]>;
  findOne(id: string): Promise<GetFilmDto | null>;
  updateFilm(film: Film): Promise<void>;
}

@Injectable()
export class FilmsDbRepository implements FilmsRepository {
  constructor(@InjectRepository(Film) private filmModel: Repository<Film>) {}

  private mapSchedule(schedule): GetScheduleDto[] {
    return schedule.map((s) => ({
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
      schedule: this.mapSchedule(film.schedules),
    };
  }

  async findAll(): Promise<GetFilmDto[]> {
    const films = await this.filmModel.find({ relations: { schedules: true } });
    return films.map((film) => this.mapFilmToDto(film));
  }

  async findOne(id: string): Promise<GetFilmDto | null> {
    const film = await this.filmModel.findOne({
      where: { id },
      relations: { schedules: true },
    });
    return this.mapFilmToDto(film);
  }

  async findOneRaw(id: string): Promise<Film | null> {
    return await this.filmModel.findOne({
      where: { id },
      relations: { schedules: true },
    });
  }

  async updateFilm(film: Film) {
    await this.filmModel.save(film);
  }
}
