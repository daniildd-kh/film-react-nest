import { BadRequestException, Injectable, Inject, Logger } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PostgresFilmsRepository } from '../repository/postgres-films.repository';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | PostgresFilmsRepository
      | MongoFilmsRepository,
  ) {}

  async makeOrder(orderDto: OrderDto) {
    const { tickets } = orderDto;
    this.logger.log(`Получен запрос на заказ билетов: ${tickets.length}`);

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      this.logger.log(
        `Обработка билета: фильм=${film}, сеанс=${session}, место=${row}:${seat}`,
      );

      let filmInDB;
      if (this.filmsRepository instanceof PostgresFilmsRepository) {
        filmInDB = await this.filmsRepository.findOneRaw(film);
      } else if (this.filmsRepository instanceof MongoFilmsRepository) {
        filmInDB = await this.filmsRepository.findOneAsDocument(film);
      }

      if (!filmInDB) {
        this.logger.error(`Фильм с ID ${film} в БД не найден`);
        throw new BadRequestException('Фильм не найден');
      }

      const selectedSession = filmInDB.schedule?.find((s) => s.id === session);
      if (!selectedSession) {
        this.logger.error(`Сеанс с ID ${session} в БД не найден`);
        throw new BadRequestException('Сеанс не найден');
      }

      const seatIdentifier = `${row}:${seat}`;
      const isSeatTaken = Array.isArray(selectedSession.taken)
        ? selectedSession.taken.includes(seatIdentifier)
        : selectedSession.taken?.split(',').includes(seatIdentifier);

      if (isSeatTaken) {
        this.logger.error(`Место ${seatIdentifier} уже занято`);
        throw new BadRequestException('Это место уже занято');
      }

      if (Array.isArray(selectedSession.taken)) {
        selectedSession.taken.push(seatIdentifier);
      } else {
        selectedSession.taken = selectedSession.taken
          ? `${selectedSession.taken},${seatIdentifier}`
          : seatIdentifier;
      }

      if (this.filmsRepository instanceof PostgresFilmsRepository) {
        await this.filmsRepository.updateFilm(filmInDB);
      } else if (this.filmsRepository instanceof MongoFilmsRepository) {
        await filmInDB.save();
      }

      this.logger.log(`Билет успешно забронирован: ${seatIdentifier}`);
    }
    return { items: tickets.map((ticket) => ({ ...ticket })) };
  }
}
