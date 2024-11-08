import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PostgresFilmsRepository } from '../repository/postgres-films.repository';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | PostgresFilmsRepository
      | MongoFilmsRepository,
  ) {}

  async makeOrder(orderDto: OrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      let filmInDB;

      if (this.filmsRepository instanceof PostgresFilmsRepository) {
        filmInDB = await this.filmsRepository.findOneRaw(film);
      } else if (this.filmsRepository instanceof MongoFilmsRepository) {
        filmInDB = await this.filmsRepository.findOneAsDocument(film);
      }

      if (!filmInDB) throw new BadRequestException('Фильм не найден');

      const selectedSession = filmInDB.schedule?.find((s) => s.id === session);
      if (!selectedSession) throw new BadRequestException('Сеанс не найден');

      const seatIdentifier = `${row}:${seat}`;
      const isSeatTaken = Array.isArray(selectedSession.taken)
        ? selectedSession.taken.includes(seatIdentifier)
        : selectedSession.taken?.split(',').includes(seatIdentifier);

      if (isSeatTaken) throw new BadRequestException('Это место уже занято');

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
    }

    return { items: tickets.map((ticket) => ({ ...ticket })) };
  }
}
