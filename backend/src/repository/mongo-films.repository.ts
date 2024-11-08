import { Model } from 'mongoose';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film } from './schemes/films.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

interface FilmsRepository {
  findAll(): Promise<GetFilmDto[]>;
  findOne(id: string): Promise<GetFilmDto | null>;
}

@Injectable()
export class MongoFilmsRepository implements FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

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

  async findAll(): Promise<GetFilmDto[]> {
    const films = await this.filmModel.find({});
    return films.map((film) => this.mapFilmToDto(film));
  }

  async findOne(id: string): Promise<GetFilmDto | null> {
    const film = await this.filmModel.findOne({ id: id });
    if (!film || !film.schedule) {
      return null;
    }

    return this.mapFilmToDto(film);
  }

  async findOneAsDocument(id: string) {
    return await this.filmModel.findOne({ id: id });
  }
}
