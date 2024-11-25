import { Controller, Get, Logger, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { DevLogger } from '../logger/dev-logger.service';

@Controller('/films/')
export class FilmsController {
  private readonly logger = new Logger(FilmsController.name);
  
  constructor(
    private readonly filmsService: FilmsService,
  ) {}

  @Get()
  async getFilms() {
    this.logger.log('Запрос на получение всех фильмов');
    const films = await this.filmsService.getAllFilms();
    this.logger.log(`Возвращено фильмов: ${films.length}`);
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    this.logger.log(`Запрос на получение расписания для фильма с ID: ${id}`);
    const film = await this.filmsService.getFilm(id);
    this.logger.log(`Расписание для фильма с ID ${id} найдено`);
    return {
      items: film.schedule,
    };
  }
}
