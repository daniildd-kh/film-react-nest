import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film } from './schemes/films.schema';

@Injectable()
export class MongoFilmsRepository {
  private readonly logger = new Logger(MongoFilmsRepository.name);

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
    this.logger.log('MongoDB: Выполняется запрос всех фильмов...');
    const films = await this.filmModel.find({});
    this.logger.log(`MongoDB: Найдено ${films.length} фильмов.`);
    return films.map((film) => this.mapFilmToDto(film));
  }

  async findOne(id: string): Promise<GetFilmDto | null> {
    this.logger.log(`MongoDB: Выполняется запрос фильма по id: ${id}`);
    const film = await this.filmModel.findOne({ id: id });
    if (!film || !film.schedule) {
      this.logger.warn(`MongoDB: Фильм с id: ${id} не найден.`);
      return null;
    }
    this.logger.log(`MongoDB: Фильм с id: ${id} найден.`);
    return this.mapFilmToDto(film);
  }

  async findOneAsDocument(id: string) {
    this.logger.log(
      `MongoDB: Выполняется запрос фильма как документ для id: ${id}`,
    );
    return await this.filmModel.findOne({ id: id });
  }
}
