import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest
          .fn()
          .mockResolvedValue([{ id: '1', title: 'Film 1' }]),
        getFilm: jest.fn().mockResolvedValue({
          id: '1',
          title: 'Film 1',
          schedule: [{ hall: 0, rows: 5 }],
        }),
      })
      .compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('должен вернуть список всех фильмов', async () => {
    const result = await filmsController.getFilms();
    expect(filmsService.getAllFilms).toHaveBeenCalled();
    expect(result).toEqual({
      total: 1,
      items: [{ id: '1', title: 'Film 1' }],
    });
  });

  it('должен вернуть фильм по id', async () => {
    const result = await filmsController.getFilmSchedule('1');
    expect(filmsService.getFilm).toHaveBeenCalledWith('1');
    expect(result).toEqual({
      items: [{ hall: 0, rows: 5 }],
    });
  });
});
