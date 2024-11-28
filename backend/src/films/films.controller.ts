import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('/films/')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmsService.getAllFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmsService.getFilm(id);
    return {
      items: film.schedule,
    };
  }
}
